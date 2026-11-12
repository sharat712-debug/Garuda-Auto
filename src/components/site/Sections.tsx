import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { faqs } from "@/config/business";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div aria-hidden="true" className="absolute -right-24 top-0 h-full w-72 -skew-x-[24deg] bg-primary/10" />
      <div className="container-site relative py-16 md:py-24">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">{title}</h1>
        {children && <div className="mt-6 max-w-2xl text-lg text-muted-foreground">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">{title}</h2>
      {children && <div className="mt-4 text-muted-foreground">{children}</div>}
    </div>
  );
}

export function PrimaryLink({ to, children }: { to: "/book-service" | "/services" | "/fleet-services" | "/our-mechanic" | "/contact"; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition hover:brightness-110">
      {children} <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export function SecondaryLink({ to, children }: { to: "/book-service" | "/services" | "/fleet-services" | "/our-mechanic" | "/contact"; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 rounded-md border border-input px-6 py-3.5 font-semibold transition hover:border-foreground/40 hover:bg-accent">
      {children}
    </Link>
  );
}

export function FAQ() {
  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-card">
      {faqs().map((f) => (
        <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between gap-4 font-display text-lg font-semibold">
            {f.q}
            <ChevronDown className="h-5 w-5 shrink-0 text-primary transition group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="mt-3 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FinalCta() {
  return (
    <section className="bg-surface py-20">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 md:p-14">
          <div aria-hidden="true" className="absolute -right-10 top-0 h-full w-40 -skew-x-[24deg] bg-primary" />
          <div aria-hidden="true" className="absolute right-36 top-0 h-full w-6 -skew-x-[24deg] bg-primary/60" />
          <div className="relative max-w-xl">
            <h2 className="text-3xl font-bold md:text-4xl">Need help with your vehicle?</h2>
            <p className="mt-4 text-muted-foreground">Whether it's a routine service, an unexpected problem or a vehicle you're thinking of buying, start by telling us what you need.</p>
            <div className="mt-8"><PrimaryLink to="/book-service">Send a Service Enquiry</PrimaryLink></div>
          </div>
        </div>
      </div>
    </section>
  );
}
