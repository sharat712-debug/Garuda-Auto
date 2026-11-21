import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { faqs, business, addressText, launchOffer, offerAvailable, offerSummary, type Question } from "@/config/business";
import { Button } from "@/components/ui/button";
import { workshopMedia } from "@/config/workshop-media";

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
    <Button asChild size="lg" className="h-auto whitespace-normal py-3.5 font-semibold"><Link to={to}>
      {children} <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link></Button>
  );
}

export function SecondaryLink({ to, children }: { to: "/book-service" | "/services" | "/fleet-services" | "/our-mechanic" | "/contact"; children: ReactNode }) {
  return (
    <Button asChild variant="outline" size="lg" className="h-auto whitespace-normal py-3.5 font-semibold"><Link to={to}>
      {children}
    </Link></Button>
  );
}

export function FAQ({ items = faqs() }: { items?: Question[] }) {
  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-card">
      {items.map((f) => (
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
        <div className="relative overflow-hidden py-4 md:py-8">
          <div aria-hidden="true" className="absolute -right-10 top-0 h-full w-40 -skew-x-[24deg] bg-primary" />
          <div aria-hidden="true" className="absolute right-36 top-0 h-full w-6 -skew-x-[24deg] bg-primary/60" />
          <div className="relative max-w-xl">
            <h2 className="text-3xl font-bold md:text-4xl">Need help with your vehicle?</h2>
            <p className="mt-4 text-muted-foreground">Oil service due, brake concern or a warning light? Tell us your vehicle and what you need. We’ll confirm the available work, quote and appointment at our Jimboomba workshop.</p>
            <div className="mt-8"><PrimaryLink to="/book-service">Send a Service Enquiry</PrimaryLink></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkshopPhoto({ name, className = "aspect-[4/3]", eager = false }: { name: keyof typeof workshopMedia; className?: string; eager?: boolean }) {
  const photo = workshopMedia[name];
  return <figure><img src={photo.url} alt={photo.alt} loading={eager ? "eager" : "lazy"} className={`w-full rounded-lg object-cover ${className}`} /><figcaption className="mt-3 text-xs text-muted-foreground">{photo.caption} · Original workshop photograph</figcaption></figure>;
}

export function PageFAQ({ items, title = "Your questions, answered" }: { items?: Question[]; title?: string }) {
  return <section className="border-t border-border py-16"><div className="container-site grid gap-8 lg:grid-cols-[1fr_1.6fr]"><SectionHeading eyebrow="Questions" title={title} /><FAQ items={items ?? faqs()} /></div></section>;
}

export function LocalWorkshop() {
  return <section className="border-t border-border bg-background py-16"><div className="container-site grid gap-10 md:grid-cols-2 md:items-center"><div><p className="eyebrow">Your local workshop</p><h2 className="mt-4 text-3xl font-bold">Based in Jimboomba. Welcoming our neighbours.</h2><p className="mt-5 text-muted-foreground">{addressText()}. Customers from {business.serviceAreas.filter((area) => area !== 'Jimboomba').join(', ')} are welcome to enquire about suitable vehicle maintenance.</p><p className="mt-4 text-muted-foreground">Please confirm your appointment before visiting. Operating hours and weekend availability are still being finalised.</p><div className="mt-6"><SecondaryLink to="/contact">Contact & directions</SecondaryLink></div></div><WorkshopPhoto name="exterior" /></div></section>;
}

export function OfferBand() {
  if (!offerAvailable()) return null;
  return <section className="border-y border-primary/40 bg-background py-12"><div className="container-site grid items-center gap-8 md:grid-cols-[1.5fr_1fr]"><div><p className="eyebrow">Limited-time oil-service offer</p><h2 className="mt-3 text-3xl font-bold">{launchOffer.headline} — ${launchOffer.price} <span className="text-lg text-muted-foreground">including GST</span></h2><p className="mt-4 text-muted-foreground">{offerSummary()}</p><p className="mt-2 text-sm text-muted-foreground">Work beyond the package is quoted before proceeding. A request does not reserve a promotional place.</p></div><div className="md:justify-self-end"><PrimaryLink to="/book-service">Request the oil-service offer</PrimaryLink></div></div></section>;
}
