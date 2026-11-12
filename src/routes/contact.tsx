import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { business, isLive } from "@/config/business";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Sections";
import { BookingForm } from "@/components/site/Forms";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact Garuda Automotives | Gold Coast", "Have a question about a repair, a service that's due or an upcoming booking? Send Garuda Automotives an enquiry.", "/contact"),
  component: Contact,
});

function Contact() {
  const live = isLive();
  return (
    <>
      <PageHero eyebrow="Contact" title="Contact Garuda Automotives.">
        <p>Have a question about a repair, a service that's due or an upcoming booking? Send an enquiry and we'll get back to you.</p>
      </PageHero>
      <section className="py-16">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_2fr]">
          <aside className="space-y-5">
            <div className="flex gap-3"><MapPin className="h-5 w-5 text-primary" aria-hidden="true" /><div><p className="font-semibold">Location</p><p className="text-muted-foreground">{live && business.address ? `${business.address.street}, ${business.address.suburb} QLD ${business.address.postcode}` : "Gold Coast, Queensland — workshop address to be announced."}</p></div></div>
            {business.phone && business.phoneHref && <div className="flex gap-3"><Phone className="h-5 w-5 text-primary" aria-hidden="true" /><div><p className="font-semibold">Phone</p><a href={`tel:${business.phoneHref}`} className="text-muted-foreground hover:text-primary">{business.phone}</a></div></div>}
            {business.email && <div className="flex gap-3"><Mail className="h-5 w-5 text-primary" aria-hidden="true" /><div><p className="font-semibold">Email</p><a href={`mailto:${business.email}`} className="text-muted-foreground hover:text-primary">{business.email}</a></div></div>}
            {live && business.openingHours && <div className="flex gap-3"><Clock className="h-5 w-5 text-primary" aria-hidden="true" /><div><p className="font-semibold">Opening hours</p>{business.openingHours.map((h) => <p key={h.days} className="text-muted-foreground">{h.days}: {h.hours}</p>)}</div></div>}
            {live && business.mapEmbedUrl && <iframe title="Workshop map" src={business.mapEmbedUrl} loading="lazy" className="aspect-square w-full rounded-xl border border-border" />}
          </aside>
          <BookingForm />
        </div>
      </section>
    </>
  );
}
