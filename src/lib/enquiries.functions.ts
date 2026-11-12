import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";

const phoneRe = /^(\+?61|0)[2-478](?:[ -]?\d){8}$/;
const thisYear = new Date().getFullYear();

export const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().regex(phoneRe, "Enter a valid Australian phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  make: z.string().trim().min(1, "Required").max(60),
  model: z.string().trim().min(1, "Required").max(60),
  year: z.coerce.number().int().min(1950, "Enter a year from 1950").max(thisYear + 1, "Enter a valid year"),
  rego: z.string().trim().max(12).optional().or(z.literal("")),
  vehicleType: z.enum(["Car", "SUV", "Ute", "Van", "Light commercial", "Other"]),
  serviceType: z.string().trim().min(1, "Choose a service").max(80),
  details: z.string().trim().min(10, "Please describe the issue or work (10+ characters)").max(2000),
  preferredDate: z.string().optional().or(z.literal("")),
  preferredTime: z.enum(["", "Morning", "Midday", "Afternoon"]).optional(),
  contactMethod: z.enum(["Phone", "Email"]),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm consent to be contacted" }) }),
  marketing: z.boolean().default(false),
  website: z.string().max(0).optional(), // honeypot
  sourcePage: z.string().max(200).optional(),
});

export const fleetSchema = z.object({
  businessName: z.string().trim().min(2, "Required").max(120),
  contactPerson: z.string().trim().min(2, "Required").max(100),
  phone: z.string().trim().regex(phoneRe, "Enter a valid Australian phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  vehicleCount: z.coerce.number().int().min(1, "At least 1").max(10000),
  vehicleTypes: z.string().trim().min(2, "Required").max(300),
  preferredContactTime: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Please tell us a little more (10+ characters)").max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm consent to be contacted" }) }),
  website: z.string().max(0).optional(),
  sourcePage: z.string().max(200).optional(),
});

async function ipHash() {
  const req = getRequest();
  const ip = req.headers.get("cf-connecting-ip") ?? req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`garuda:${ip}`));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("").slice(0, 32);
}

const LIMIT_PER_HOUR = 5;

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => bookingSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const }; // bot: silently drop
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const hash = await ipHash();
    const since = new Date(Date.now() - 3600_000).toISOString();
    const { count } = await supabaseAdmin.from("booking_requests").select("id", { count: "exact", head: true }).eq("ip_hash", hash).gte("created_at", since);
    if ((count ?? 0) >= LIMIT_PER_HOUR) return { ok: false as const, error: "Too many requests. Please try again later." };
    const { error } = await supabaseAdmin.from("booking_requests").insert({
      full_name: data.fullName, phone: data.phone, email: data.email,
      vehicle_make: data.make, vehicle_model: data.model, vehicle_year: data.year,
      rego: data.rego || null, vehicle_type: data.vehicleType, service_type: data.serviceType,
      details: data.details, preferred_date: data.preferredDate || null, preferred_time: data.preferredTime || null,
      contact_method: data.contactMethod, consent: true, marketing_opt_in: data.marketing,
      source_page: data.sourcePage ?? null, ip_hash: hash,
    });
    if (error) { console.error("booking insert failed", error); return { ok: false as const, error: "We couldn't save your enquiry. Please try again." }; }
    return { ok: true as const };
  });

export const submitFleet = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => fleetSchema.parse(d))
  .handler(async ({ data }) => {
    if (data.website) return { ok: true as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const hash = await ipHash();
    const since = new Date(Date.now() - 3600_000).toISOString();
    const { count } = await supabaseAdmin.from("fleet_enquiries").select("id", { count: "exact", head: true }).eq("ip_hash", hash).gte("created_at", since);
    if ((count ?? 0) >= LIMIT_PER_HOUR) return { ok: false as const, error: "Too many requests. Please try again later." };
    const { error } = await supabaseAdmin.from("fleet_enquiries").insert({
      business_name: data.businessName, contact_person: data.contactPerson, phone: data.phone, email: data.email,
      vehicle_count: data.vehicleCount, vehicle_types: data.vehicleTypes,
      preferred_contact_time: data.preferredContactTime || null, message: data.message, consent: true,
      source_page: data.sourcePage ?? null, ip_hash: hash,
    });
    if (error) { console.error("fleet insert failed", error); return { ok: false as const, error: "We couldn't save your enquiry. Please try again." }; }
    return { ok: true as const };
  });
