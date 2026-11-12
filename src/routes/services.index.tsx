import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { business, services } from "@/config/business";
import { seo } from "@/lib/seo";
import { FinalCta, PageHero } from "@/components/site/Sections";
import { ServiceIcon } from "@/components/site/ServiceIcon";

export const Route = createFileRoute("/services/")({
  head: () => seo("Car Services Gold Coast | Garuda Automotives", "Servicing, diagnostics, brakes, suspension, auto electrical, pre-purchase inspections, tyres and light-commercial work — enquire with Garuda Automotives.", "/services"),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Vehicle servicing and repairs, explained clearly.">
        <p>Tell us your vehicle and what you need. We'll confirm whether we can help and what the next step is before any work proceeds.</p>
      </PageHero>
      <section className="py-16">
        <div className="container-site grid gap-4 md:grid-cols-2">
          {services.map((s) => (
            <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group flex gap-5 rounded-xl border border-border bg-card p-6 transition hover:border-primary/60">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary"><ServiceIcon name={s.icon} /></span>
              <div>
                <h2 className="text-xl font-semibold">{s.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">View service <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
          {!business.safetyCertificatesApproved && (
            <div className="rounded-xl border border-dashed border-input p-6 md:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Upcoming · subject to approval</span>
              <h2 className="mt-2 text-xl font-semibold">Queensland Safety Certificate Enquiries</h2>
              <p className="mt-2 text-sm text-muted-foreground">We're reviewing this service as part of workshop setup. Safety certificates can only be issued by a Queensland Approved Inspection Station with appropriately approved examiners. This service cannot be booked yet.</p>
            </div>
          )}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
