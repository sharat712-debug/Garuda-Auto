import { useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { bookingSchema, fleetSchema, submitBooking, submitFleet } from "@/lib/enquiries.functions";
import { business, serviceTypeOptions } from "@/config/business";
import { Button } from "@/components/ui/button";

const inputCls = "mt-1.5 block w-full rounded-md border border-input bg-surface px-3.5 py-3 text-base text-foreground placeholder:text-steel focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/40 aria-[invalid=true]:border-destructive";

function Field({ id, label, required, error, children, className = "" }: { id: string; label: string; required?: boolean; error?: string | undefined; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required ? <span className="text-primary" aria-hidden="true">*</span> : <span className="text-muted-foreground">(optional)</span>}
      </label>
      {children}
      {error && <p id={`${id}-err`} role="alert" className="mt-1.5 text-sm text-destructive">{error}</p>}
    </div>
  );
}

type ErrKey = "fullName"|"phone"|"email"|"make"|"model"|"year"|"rego"|"vehicleType"|"serviceType"|"details"|"preferredDate"|"preferredTime"|"contactMethod"|"consent"|"businessName"|"contactPerson"|"vehicleCount"|"vehicleTypes"|"preferredContactTime"|"message";
type Errors = Partial<Record<ErrKey, string>>;
const a = (errors: Errors, k: ErrKey) => ({ "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

function Success({ children }: { children: ReactNode }) {
  return (
    <div role="status" className="rounded-xl border border-border bg-card p-8 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-primary" aria-hidden="true" />
      <p className="mt-4 text-lg font-semibold">{children}</p>
    </div>
  );
}

function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
    </div>
  );
}

function ConsentBox({ errors }: { errors: Errors }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-sm">
        <input type="checkbox" name="consent" className="mt-1 h-5 w-5 accent-[var(--color-primary)]" {...a(errors, "consent")} />
        <span>I agree to {business.name} contacting me about this enquiry and handling my details as described in the <Link to="/privacy-policy" className="text-primary underline underline-offset-2">Privacy Policy</Link>. <span className="text-primary">*</span></span>
      </label>
      {errors.consent && <p id="consent-err" role="alert" className="mt-1.5 text-sm text-destructive">{errors.consent}</p>}
    </div>
  );
}

function SubmitButton({ pending, children }: { pending: boolean; children: ReactNode }) {
  return (
    <Button type="submit" disabled={pending} className="h-auto w-full whitespace-normal px-6 py-4 font-semibold sm:w-auto">
      {pending && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />} {pending ? "Sending…" : children}
    </Button>
  );
}

function toErrors(issues: { path: (string | number)[]; message: string }[]): Errors {
  const e: Errors = {};
  for (const i of issues) { const k = String(i.path[0]) as ErrKey; if (!e[k]) e[k] = i.message; }
  return e;
}

export function BookingForm() {
  const submit = useServerFn(submitBooking);
  const { pathname } = useLocation();
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const raw = {
      fullName: fd.get("fullName"), phone: fd.get("phone"), email: fd.get("email"),
      make: fd.get("make"), model: fd.get("model"), year: fd.get("year"), rego: fd.get("rego"),
      vehicleType: fd.get("vehicleType"), serviceType: fd.get("serviceType"), details: fd.get("details"),
      preferredDate: fd.get("preferredDate"), preferredTime: fd.get("preferredTime"), contactMethod: fd.get("contactMethod"),
      consent: fd.get("consent") === "on", marketing: fd.get("marketing") === "on",
      website: fd.get("website") ?? "", sourcePage: pathname,
    };
    const parsed = bookingSchema.safeParse(raw);
    if (!parsed.success) { setErrors(toErrors(parsed.error.issues)); return; }
    setErrors({});
    setPending(true);
    try {
      const res = await submit({ data: parsed.data });
      if (res.ok) setDone(true); else setFormError(res.error);
    } catch { setFormError("Something went wrong sending your enquiry. Please try again."); }
    finally { setPending(false); }
  }

  if (done) return <Success>Thanks, we've received your enquiry. A member of the Garuda team will contact you to discuss the next steps. This is not a confirmed appointment.</Success>;

  return (
    <form noValidate onSubmit={onSubmit} className="relative space-y-8 rounded-xl border border-border bg-card p-6 md:p-8">
      <Honeypot />
      <fieldset className="grid gap-5 md:grid-cols-2">
        <legend className="mb-4 font-display text-lg font-semibold">Your details</legend>
        <Field id="fullName" label="Full name" required error={errors.fullName}><input id="fullName" name="fullName" autoComplete="name" className={inputCls} {...a(errors, "fullName")} /></Field>
        <Field id="phone" label="Mobile or phone" required error={errors.phone}><input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="04xx xxx xxx" className={inputCls} {...a(errors, "phone")} /></Field>
        <Field id="email" label="Email" required error={errors.email} className="md:col-span-2"><input id="email" name="email" type="email" autoComplete="email" className={inputCls} {...a(errors, "email")} /></Field>
      </fieldset>
      <fieldset className="grid gap-5 md:grid-cols-3">
        <legend className="mb-4 font-display text-lg font-semibold">Your vehicle</legend>
        <Field id="make" label="Make" required error={errors.make}><input id="make" name="make" placeholder="e.g. Toyota" className={inputCls} {...a(errors, "make")} /></Field>
        <Field id="model" label="Model" required error={errors.model}><input id="model" name="model" placeholder="e.g. RAV4" className={inputCls} {...a(errors, "model")} /></Field>
        <Field id="year" label="Year" required error={errors.year}><input id="year" name="year" inputMode="numeric" placeholder="e.g. 2019" className={inputCls} {...a(errors, "year")} /></Field>
        <Field id="rego" label="Rego" error={errors.rego}><input id="rego" name="rego" className={inputCls} /></Field>
        <Field id="vehicleType" label="Vehicle type" required error={errors.vehicleType} className="md:col-span-2">
          <select id="vehicleType" name="vehicleType" defaultValue="Car" className={inputCls}>
            {["Car", "SUV", "Ute", "Van", "Light commercial", "Other"].map((v) => <option key={v}>{v}</option>)}
          </select>
        </Field>
      </fieldset>
      <fieldset className="grid gap-5 md:grid-cols-2">
        <legend className="mb-4 font-display text-lg font-semibold">What do you need?</legend>
        <Field id="serviceType" label="Service type" required error={errors.serviceType} className="md:col-span-2">
          <select id="serviceType" name="serviceType" defaultValue="" className={inputCls} {...a(errors, "serviceType")}>
            <option value="" disabled>Choose a service…</option>
            {serviceTypeOptions.map((s) => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field id="details" label="Symptoms or work requested" required error={errors.details} className="md:col-span-2">
          <textarea id="details" name="details" rows={5} placeholder="Include your odometer reading, work requested, symptoms or warning lights. Mention the oil-service offer if requested." className={inputCls} {...a(errors, "details")} />
        </Field>
        <Field id="preferredDate" label="Preferred date (not a confirmed slot)" error={errors.preferredDate}><input id="preferredDate" name="preferredDate" type="date" className={inputCls} /></Field>
        <Field id="preferredTime" label="Preferred time of day" error={errors.preferredTime}>
          <select id="preferredTime" name="preferredTime" defaultValue="" className={inputCls}>
            <option value="">No preference</option><option>Morning</option><option>Midday</option><option>Afternoon</option>
          </select>
        </Field>
        <div className="md:col-span-2">
          <p className="text-sm font-medium">Best contact method <span className="text-primary">*</span></p>
          <div className="mt-2 flex gap-6">
            {["Phone", "Email"].map((m) => (
              <label key={m} className="flex items-center gap-2"><input type="radio" name="contactMethod" value={m} defaultChecked={m === "Phone"} className="h-5 w-5 accent-[var(--color-primary)]" /> {m}</label>
            ))}
          </div>
        </div>
      </fieldset>
      <div className="space-y-4">
        <ConsentBox errors={errors} />
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input type="checkbox" name="marketing" className="mt-1 h-5 w-5 accent-[var(--color-primary)]" />
          <span>Optional: keep me updated about Garuda's occasional service news and offers.</span>
        </label>
      </div>
      {formError && <p role="alert" className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">{formError}</p>}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground">Your request is not a confirmed booking until Garuda contacts you.</p>
        <SubmitButton pending={pending}>Request a Booking</SubmitButton>
      </div>
    </form>
  );
}

export function FleetForm() {
  const submit = useServerFn(submitFleet);
  const { pathname } = useLocation();
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const raw = {
      businessName: fd.get("businessName"), contactPerson: fd.get("contactPerson"), phone: fd.get("phone"), email: fd.get("email"),
      vehicleCount: fd.get("vehicleCount"), vehicleTypes: fd.get("vehicleTypes"), preferredContactTime: fd.get("preferredContactTime"),
      message: fd.get("message"), consent: fd.get("consent") === "on", website: fd.get("website") ?? "", sourcePage: pathname,
    };
    const parsed = fleetSchema.safeParse(raw);
    if (!parsed.success) { setErrors(toErrors(parsed.error.issues)); return; }
    setErrors({});
    setPending(true);
    try {
      const res = await submit({ data: parsed.data });
      if (res.ok) setDone(true); else setFormError(res.error);
    } catch { setFormError("Something went wrong sending your enquiry. Please try again."); }
    finally { setPending(false); }
  }

  if (done) return <Success>Thanks, we've received your fleet enquiry. A member of the Garuda team will be in touch to discuss your needs.</Success>;

  return (
    <form noValidate onSubmit={onSubmit} className="relative grid gap-5 rounded-xl border border-border bg-card p-6 md:grid-cols-2 md:p-8">
      <Honeypot />
      <Field id="businessName" label="Business name" required error={errors.businessName}><input id="businessName" name="businessName" autoComplete="organization" className={inputCls} {...a(errors, "businessName")} /></Field>
      <Field id="contactPerson" label="Contact person" required error={errors.contactPerson}><input id="contactPerson" name="contactPerson" autoComplete="name" className={inputCls} {...a(errors, "contactPerson")} /></Field>
      <Field id="fphone" label="Phone" required error={errors.phone}><input id="fphone" name="phone" type="tel" autoComplete="tel" className={inputCls} {...a(errors, "phone")} /></Field>
      <Field id="femail" label="Email" required error={errors.email}><input id="femail" name="email" type="email" autoComplete="email" className={inputCls} {...a(errors, "email")} /></Field>
      <Field id="vehicleCount" label="Number of vehicles" required error={errors.vehicleCount}><input id="vehicleCount" name="vehicleCount" inputMode="numeric" className={inputCls} {...a(errors, "vehicleCount")} /></Field>
      <Field id="vehicleTypes" label="Vehicle types" required error={errors.vehicleTypes}><input id="vehicleTypes" name="vehicleTypes" placeholder="e.g. 3 × HiAce vans, 2 × Hilux utes" className={inputCls} {...a(errors, "vehicleTypes")} /></Field>
      <Field id="preferredContactTime" label="Preferred contact time" error={errors.preferredContactTime} className="md:col-span-2"><input id="preferredContactTime" name="preferredContactTime" placeholder="e.g. Weekday mornings" className={inputCls} /></Field>
      <Field id="message" label="Needs / message" required error={errors.message} className="md:col-span-2"><textarea id="message" name="message" rows={5} className={inputCls} {...a(errors, "message")} /></Field>
      <div className="md:col-span-2"><ConsentBox errors={errors} /></div>
      {formError && <p role="alert" className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive md:col-span-2">{formError}</p>}
      <div className="md:col-span-2"><SubmitButton pending={pending}>Request a Fleet Consultation</SubmitButton></div>
    </form>
  );
}
