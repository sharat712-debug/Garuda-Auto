import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageSquareText, Clock3, ShieldCheck, UserRound } from "lucide-react";
import hero from "@/assets/hero-workshop.jpg";
import heroVideo from "@/assets/hero-garage.mp4.asset.json";

import { business, isLive, services } from "@/config/business";
import { seo, structuredData } from "@/lib/seo";
import { FAQ, FinalCta, PrimaryLink, SecondaryLink, SectionHeading, WorkshopPhoto, OfferBand, LocalWorkshop } from "@/components/site/Sections";
import { ServiceIcon } from "@/components/site/ServiceIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo(
      "Garuda Automotive | Car Servicing & Brake Repairs Jimboomba",
      "Now open in Jimboomba: oil and filter changes, brake maintenance, basic vehicle checks and fault detection. Request an appointment at Garuda Automotive.",
      "/",
    ),
    scripts: [structuredData({
      "@type": "AutoRepair", "@id": "https://garuda-auto.lovable.app/#business",
      name: business.name, url: "https://garuda-auto.lovable.app/",
      areaServed: business.serviceAreas.map(name => ({ "@type": "Place", name })),
      ...(business.address ? { address: { "@type": "PostalAddress", streetAddress: business.address.street, addressLocality: business.address.suburb, addressRegion: business.address.state, postalCode: business.address.postcode, addressCountry: "AU" } } : {}),
      ...(business.phone ? { telephone: business.phone } : {}),
      ...(business.abn ? { identifier: { "@type": "PropertyValue", propertyID: "ABN", value: business.abn } } : {}),
    })],
  }),
  component: Home,
});

const principles = [
  { icon: MessageSquareText, title: "We explain what we find", text: "Understand the issue and recommended work before you decide." },
  { icon: Clock3, title: "We respect your time", text: "Submit vehicle details upfront to help us prepare a useful response." },
  { icon: ShieldCheck, title: "We focus on dependable outcomes", text: "Maintenance and repairs guided by careful inspection and sound technical practice." },
];

function Home() {
  const live = isLive();
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <video
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={hero}
          aria-label="AI-generated illustrative workshop video; not Garuda premises or staff"
        >
          <source src={heroVideo.url} type="video/mp4" />
        </video>
        <div aria-hidden="true" className="hero-fade absolute inset-0 -z-10" />
        <div className="container-site flex min-h-[min(68vh,640px)] flex-col justify-center py-20">
          <p className="eyebrow">{live ? "Now open | Jimboomba, Queensland" : "Opening soon in Jimboomba"}</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.02] md:text-7xl">
            Garuda <span className="text-primary">Automotive.</span>
          </h1>
          <p className="mt-5 max-w-xl text-xl font-semibold">{business.tagline}</p>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {live
              ? "Affordable oil and filter servicing, brake maintenance and basic vehicle checks at 9 Euphemia Street, Jimboomba. Vehicle-specific quotes, clear advice and your approval before additional repairs."
              : "Garuda Automotive is preparing for routine maintenance, brake work and basic vehicle checks in Jimboomba."}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryLink to="/book-service">{live ? "Request a Booking" : "Register a Service Enquiry"}</PrimaryLink>
            {live && business.phoneHref ? (
              <a href={`tel:${business.phoneHref}`} className="inline-flex items-center gap-2 rounded-md border border-input px-6 py-3.5 font-semibold hover:bg-accent">Call the Workshop</a>
            ) : (
              <SecondaryLink to="/services">Explore Our Services</SecondaryLink>
            )}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Illustrative AI-generated video · Original workshop photos below</p>
        </div>
      </section>

      <OfferBand />
      <section className="border-y border-border bg-background py-20">
        <div className="container-site grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
          <h2 className="slash-accent text-3xl font-bold md:text-5xl">Vehicle care without the guesswork.</h2>
          <p className="text-lg text-muted-foreground">A strange noise, a dashboard warning light or a service that's due: knowing what to do next shouldn't be complicated. At Garuda Automotive, our approach is to identify the problem, explain the recommended work and help you make an informed decision before repairs proceed.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Services" title="Everyday maintenance. Clear service scope." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/60">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/15 text-primary"><ServiceIcon name={s.icon} /></span>
                <p className="mt-4 text-xs uppercase text-muted-foreground">{s.status === "available" ? "Current service" : "Enquiry only"}</p><h3 className="mt-2 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            ))}
            <Link to="/fleet-services" className="group rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/60">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/15 text-primary"><ServiceIcon name="users" /></span>
              <h3 className="mt-5 text-xl font-semibold">Fleet Servicing</h3>
              <p className="mt-2 text-sm text-muted-foreground">Discuss routine maintenance for eligible business vehicles. Formal fleet agreements are a future opportunity.</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </Link>

          </div>
        </div>
      </section>

      <section className="border-y border-border bg-background py-20">
        <div className="container-site grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Why Garuda" title="Practical expertise. Clear explanations. Careful workmanship." />
            <ul className="mt-10 space-y-6">
              {principles.map(({ icon: I, title, text }) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/15 text-primary"><I className="h-5 w-5" aria-hidden="true" /></span>
                  <div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-1 text-muted-foreground">{text}</p></div>
                </li>
              ))}
            </ul>
          </div>
          <WorkshopPhoto name="underbody" className="aspect-[4/3]" />
        </div>
      </section>

      <section className="py-20">
        <div className="container-site grid gap-10 md:grid-cols-[280px_1fr] md:items-center">
          <div className="flex aspect-[4/5] items-center justify-center rounded-xl border border-border bg-card text-steel" role="img" aria-label="Portrait coming soon">
            <UserRound className="h-24 w-24" aria-hidden="true" />
          </div>
          <div>
            <p className="eyebrow">Our mechanic</p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Meet the mechanic behind the work.</h2>
            <p className="mt-2 font-display text-lg text-foreground/90">{business.mechanic.name} <span className="text-steel">|</span> {business.mechanic.title}</p>
            <p className="mt-4 max-w-2xl text-muted-foreground">Raja combines mechanical engineering knowledge and automotive qualifications with Australian industry experience. His background includes vehicle servicing, mechanical maintenance and heavy vehicle assembly, with previous experience at Volvo Group Australia and Penske Commercial.</p>
            <div className="mt-7"><SecondaryLink to="/our-mechanic">Get to Know Raja</SecondaryLink></div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-site">
          <div className="grid gap-8 border-y border-border py-8 md:grid-cols-[1.4fr_1fr] md:items-center md:py-12">
            <div>
              <p className="eyebrow">Fleet</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Work vehicles. Practical maintenance enquiries.</h2>
              <p className="mt-4 text-muted-foreground">Local tradespeople and small businesses can enquire about suitable vehicle maintenance. Fleet pricing and ongoing agreements will be considered as capacity develops; availability is confirmed individually.</p>
            </div>
            <div className="md:justify-self-end"><PrimaryLink to="/fleet-services">Enquire About Fleet Servicing</PrimaryLink></div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading eyebrow="Bookings" title="Tell us about your vehicle. We'll take it from there.">
            <p>Complete the short form and our team will get in touch to discuss the issue, availability and next steps. Your request is not a confirmed booking until Garuda contacts you.</p>
          </SectionHeading>
          <div className="lg:justify-self-end"><PrimaryLink to="/book-service">Request a Booking</PrimaryLink></div>
        </div>
      </section>

      <section className="border-t border-border bg-background py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" title="Common questions" />
          <FAQ />
        </div>
      </section>

      <LocalWorkshop />
      <FinalCta />
    </>
  );
}
