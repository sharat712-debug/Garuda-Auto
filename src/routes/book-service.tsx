import { createFileRoute } from "@tanstack/react-router";
import { isLive } from "@/config/business";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Sections";
import { BookingForm } from "@/components/site/Forms";

export const Route = createFileRoute("/book-service")({
  head: () => seo("Request a Service Booking | Garuda Automotives Gold Coast", "Send Garuda Automotives your vehicle details and the work you need. We'll contact you to discuss availability and next steps.", "/book-service"),
  component: Book,
});

function Book() {
  return (
    <>
      <PageHero eyebrow={isLive() ? "Book a service" : "Early service enquiries"} title="Tell us about your vehicle. We'll take it from there.">
        <p>Complete the short form and our team will get in touch to discuss the issue, availability and next steps. Your request is not a confirmed booking until Garuda contacts you.</p>
      </PageHero>
      <section className="py-16">
        <div className="container-site max-w-4xl"><BookingForm /></div>
      </section>
    </>
  );
}
