import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MessageSquareText, Clock3, ShieldCheck, UserRound } from "lucide-react";
import hero from "@/assets/hero-workshop.jpg";
import brakes from "@/assets/brakes-detail.jpg";
import { business, isLive, services } from "@/config/business";
import { seo } from "@/lib/seo";
import { FAQ, FinalCta, PrimaryLink, SecondaryLink, SectionHeading } from "@/components/site/Sections";
import { ServiceIcon } from "@/components/site/ServiceIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo(
      "Garuda Automotives | Car Servicing & Repairs Gold Coast",
      "Enquire about car servicing, diagnostics, brakes, suspension and vehicle repairs at Garuda Automotives, a new automotive workshop on the Gold Coast.",
      "/",
    ),
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AutoRepair",
        name: business.name,
        areaServed: "Gold Coast, Queensland, Australia",
        ...(isLive() && business.address ? { address: { "@type": "PostalAddress", streetAddress: business.address.street, addressLocality: business.address.suburb, addressRegion: "QLD", postalCode: business.address.postcode, addressCountry: "AU" } } : {}),
        ...(business.phone ? { telephone: business.phone } : {}),
      }),
    }],
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
        <img src={hero} alt="Illustrative image: an SUV raised on a workshop hoist while a technician reviews diagnostic data" width={1920} height={1088} className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]" />
        <div aria-hidden="true" className="hero-fade absolute inset-0 -z-10" />
        <div className="container-site flex min-h-[78vh] flex-col justify-center py-20">
          <p className="eyebrow">{live ? "Automotive servicing & repairs | Gold Coast" : "Coming soon to the Gold Coast"}</p>
          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.02] md:text-7xl">
            Your Car. Our Expertise. <span className="text-primary">Your Peace of Mind.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            {live
              ? "Professional vehicle servicing, diagnostics and repairs for everyday drivers, families and light-commercial fleets. Straightforward advice, careful workmanship and service that puts you in control."
              : "From routine servicing to complex diagnostics and repairs, Garuda Automotives is preparing to bring practical expertise and clear communication to vehicle care on the Gold Coast."}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <PrimaryLink to="/book-service">{live ? "Request a Booking" : "Register a Service Enquiry"}</PrimaryLink>
            {live && business.phoneHref ? (
              <a href={`tel:${business.phoneHref}`} className="inline-flex items-center gap-2 rounded-md border border-input px-6 py-3.5 font-semibold hover:bg-accent">Call the Workshop</a>
            ) : (
              <SecondaryLink to="/services">Explore Our Services</SecondaryLink>
            )}
          </div>
          {!live && <p className="mt-6 text-sm text-steel">Workshop opening and booking availability will be confirmed directly with customers.</p>}
        </div>
      </section>

      <section className="border-y border-border bg-background py-20">
        <div className="container-site grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
          <h2 className="slash-accent text-3xl font-bold md:text-5xl">Vehicle care without the guesswork.</h2>
          <p className="text-lg text-muted-foreground">A strange noise, a dashboard warning light or a service that's due: knowing what to do next shouldn't be complicated. At Garuda Automotives, our approach is to identify the problem, explain the recommended work and help you make an informed decision before repairs proceed.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-site">
          <SectionHeading eyebrow="Services" title="What we're preparing to help with" />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }} className="group rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/60">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/15 text-primary"><ServiceIcon name={s.icon} /></span>
                <h3 className="mt-5 text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" /></span>
              </Link>
            ))}
            <Link to="/fleet-services" className="group rounded-xl border border-border bg-card p-6 transition hover:-translate-y-0.5 hover:border-primary/60">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/15 text-primary"><ServiceIcon name="users" /></span>
              <h3 className="mt-5 text-xl font-semibold">Fleet Servicing</h3>
              <p className="mt-2 text-sm text-muted-foreground">Enquiry-led servicing support for small businesses with multiple vehicles.</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
            </Link>
            {!business.safetyCertificatesApproved && (
              <div className="rounded-xl border border-dashed border-input p-6">
                <span className="rounded-full border border-input px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Upcoming · subject to approval</span>
                <h3 className="mt-5 text-xl font-semibold">Queensland Safety Certificate Enquiries</h3>
                <p className="mt-2 text-sm text-muted-foreground">Not yet available. Safety certificates can only be issued by an Approved Inspection Station with approved examiners. Contact us for current status.</p>
              </div>
            )}
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
          <figure className="relative">
            <img src={brakes} alt="Illustrative image: a gloved hand tightening a brake caliper with a torque wrench" width={1280} height={960} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" />
            <figcaption className="mt-2 text-xs text-steel">Illustrative image</figcaption>
          </figure>
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
            <p className="mt-2 font-display text-lg text-foreground/90">Merugu Raja Subramanyam <span className="text-steel">|</span> Light Vehicle Mechanic & Automotive Specialist</p>
            <p className="mt-4 max-w-2xl text-muted-foreground">Raja brings hands-on automotive experience spanning light vehicle diagnostics and repair, braking systems, suspension components and automotive electrical work. His background also includes truck and commercial vehicle assembly and mechanical work, contributing a practical understanding of how vehicle systems fit together.</p>
            <div className="mt-7"><SecondaryLink to="/our-mechanic">Get to Know Raja</SecondaryLink></div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container-site">
          <div className="grid gap-8 rounded-2xl border border-border bg-card p-8 md:grid-cols-[1.4fr_1fr] md:items-center md:p-12">
            <div>
              <p className="eyebrow">Fleet</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Less vehicle downtime. More time on the job.</h2>
              <p className="mt-4 text-muted-foreground">Running a business means keeping vehicles reliable. Tell us about your fleet, service requirements and preferred schedule, and we'll discuss a practical maintenance approach.</p>
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

      <FinalCta />
    </>
  );
}
