import { seo } from "@/lib/seo";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/auth")({
  head: () => ({ ...seo("Staff sign in | Garuda Automotive", "Authorised staff access for Garuda Automotive enquiry management.", "/auth"), meta: [...seo("Staff sign in | Garuda Automotive", "Authorised staff access for Garuda Automotive enquiry management.", "/auth").meta, { name: "robots", content: "noindex" }] }),
  component: AuthPage,
});

const inputCls = "mt-1.5 block w-full rounded-md border border-input bg-surface px-3.5 py-3 focus:border-primary focus:outline-none";

function AuthPage() {
  const nav = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    if (mode === "in") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMsg(error.message); else nav({ to: "/admin" });
    } else {
      const { data, error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${window.location.origin}/admin` } });
      if (error) setMsg(error.message);
      else if (!data.session) setMsg("Check your email to confirm your account. An administrator must then grant you staff access.");
      else nav({ to: "/admin" });
    }
    setBusy(false);
  }

  return (
    <section className="container-site flex min-h-[70vh] items-center justify-center py-16">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-5 rounded-xl border border-border bg-card p-8">
        <h1 className="text-2xl font-bold">{mode === "in" ? "Staff sign in" : "Create staff account"}</h1>
        <div><label htmlFor="em" className="text-sm font-medium">Email</label><input id="em" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} /></div>
        <div><label htmlFor="pw" className="text-sm font-medium">Password</label><input id="pw" type="password" required minLength={8} autoComplete={mode === "in" ? "current-password" : "new-password"} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} /></div>
        {msg && <p role="alert" className="text-sm text-muted-foreground">{msg}</p>}
        <button disabled={busy} className="w-full rounded-md bg-primary py-3 font-semibold text-primary-foreground disabled:opacity-60">{busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}</button>
        <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="w-full text-sm text-muted-foreground hover:text-foreground">
          {mode === "in" ? "Need an account? Create one" : "Already have an account? Sign in"}
        </button>
      </form>
    </section>
  );
}
