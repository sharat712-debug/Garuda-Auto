import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Download, Trash2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { business, launchChecklist } from "@/config/business";
import type { Database } from "@/integrations/supabase/types";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Enquiries admin | Garuda Automotives" }, { name: "robots", content: "noindex" }] }),
  component: Admin,
});

type Status = Database["public"]["Enums"]["enquiry_status"];
const statuses: Status[] = ["new", "contacted", "quote_required", "booked", "completed", "closed"];
type Booking = Database["public"]["Tables"]["booking_requests"]["Row"];
type Fleet = Database["public"]["Tables"]["fleet_enquiries"]["Row"];

function toCsv(rows: Record<string, unknown>[]) {
  if (!rows.length) return "";
  const keys = Object.keys(rows[0]!).filter((k) => k !== "ip_hash");
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [keys.join(","), ...rows.map((r) => keys.map((k) => esc(r[k])).join(","))].join("\n");
}
function download(name: string, rows: Record<string, unknown>[]) {
  const blob = new Blob([toCsv(rows)], { type: "text/csv" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; a.click();
}

function Admin() {
  const nav = useNavigate();
  const [staff, setStaff] = useState<boolean | null>(null);
  const [tab, setTab] = useState<"bookings" | "fleet">("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [fleet, setFleet] = useState<Fleet[]>([]);

  async function load() {
    const [b, f] = await Promise.all([
      supabase.from("booking_requests").select("*").order("created_at", { ascending: false }),
      supabase.from("fleet_enquiries").select("*").order("created_at", { ascending: false }),
    ]);
    setBookings(b.data ?? []); setFleet(f.data ?? []);
  }

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      const { data } = await supabase.rpc("is_staff", { _user_id: u.user!.id });
      setStaff(!!data);
      if (data) load();
    })();
  }, []);

  async function setStatus(table: "booking_requests" | "fleet_enquiries", id: string, status: Status) {
    const { error } = await supabase.from(table).update({ status }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Status updated"); load(); }
  }
  async function remove(table: "booking_requests" | "fleet_enquiries", id: string) {
    if (!confirm("Delete this enquiry permanently?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); load(); }
  }
  async function signOut() { await supabase.auth.signOut(); nav({ to: "/" }); }

  if (staff === null) return <div className="container-site py-20 text-muted-foreground">Loading…</div>;
  if (!staff) return (
    <div className="container-site max-w-xl py-20">
      <h1 className="text-2xl font-bold">No staff access yet</h1>
      <p className="mt-3 text-muted-foreground">You're signed in, but this account hasn't been granted staff access. Ask the site owner to grant it.</p>
      <button onClick={signOut} className="mt-6 rounded-md border border-input px-4 py-2">Sign out</button>
    </div>
  );

  const rows = tab === "bookings" ? bookings : fleet;
  const table = tab === "bookings" ? "booking_requests" : "fleet_enquiries";
  return (
    <div className="container-site py-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Enquiries</h1>
        <div className="flex gap-2">
          <button onClick={() => download(`${table}.csv`, rows as unknown as Record<string, unknown>[])} className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2 text-sm"><Download className="h-4 w-4" /> Export CSV</button>
          <button onClick={signOut} className="inline-flex items-center gap-2 rounded-md border border-input px-4 py-2 text-sm"><LogOut className="h-4 w-4" /> Sign out</button>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-4 text-sm">
          <p className="font-semibold">Site mode: <span className="text-primary">{business.mode === "live" ? "Live" : "Pre-launch"}</span></p>
          <p className="mt-1 text-muted-foreground">Email notifications: {business.emailNotificationsConfigured ? "configured" : "configuration required — a verified sending domain is needed. Enquiries are still saved here."}</p>
        </div>
        <details className="rounded-lg border border-border bg-card p-4 text-sm">
          <summary className="cursor-pointer font-semibold">Pre-launch checklist ({launchChecklist.length} items to confirm)</summary>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-muted-foreground">{launchChecklist.map((i) => <li key={i}>{i}</li>)}</ul>
        </details>
      </div>

      <div className="mt-8 flex gap-2" role="tablist">
        {(["bookings", "fleet"] as const).map((t) => (
          <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`rounded-md px-4 py-2 text-sm font-semibold ${tab === t ? "bg-primary text-primary-foreground" : "border border-input"}`}>
            {t === "bookings" ? `Booking requests (${bookings.length})` : `Fleet enquiries (${fleet.length})`}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {rows.length === 0 && <p className="rounded-lg border border-dashed border-input p-8 text-center text-muted-foreground">No enquiries yet.</p>}
        {rows.map((r) => (
          <div key={r.id} className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{"full_name" in r ? r.full_name : `${r.business_name} — ${r.contact_person}`}</p>
                <p className="text-sm text-muted-foreground">{r.phone} · {r.email} · {new Date(r.created_at).toLocaleString("en-AU")}</p>
              </div>
              <div className="flex items-center gap-2">
                <select aria-label="Status" value={r.status} onChange={(e) => setStatus(table, r.id, e.target.value as Status)} className="rounded-md border border-input bg-surface px-3 py-2 text-sm">
                  {statuses.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                </select>
                <button aria-label="Delete" onClick={() => remove(table, r.id)} className="rounded-md border border-input p-2 hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            {"full_name" in r ? (
              <div className="mt-3 text-sm">
                <p><span className="text-muted-foreground">Vehicle:</span> {r.vehicle_year} {r.vehicle_make} {r.vehicle_model} ({r.vehicle_type}){r.rego ? ` · ${r.rego}` : ""}</p>
                <p><span className="text-muted-foreground">Service:</span> {r.service_type} · prefers {r.contact_method}{r.preferred_date ? ` · ${r.preferred_date}` : ""}{r.preferred_time ? ` ${r.preferred_time}` : ""}{r.marketing_opt_in ? " · marketing opt-in" : ""}</p>
                <p className="mt-2 whitespace-pre-wrap">{r.details}</p>
              </div>
            ) : (
              <div className="mt-3 text-sm">
                <p><span className="text-muted-foreground">Fleet:</span> {r.vehicle_count} vehicles · {r.vehicle_types}{r.preferred_contact_time ? ` · ${r.preferred_contact_time}` : ""}</p>
                <p className="mt-2 whitespace-pre-wrap">{r.message}</p>
              </div>
            )}
            <p className="mt-2 text-xs text-steel">From {r.source_page ?? "unknown page"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
