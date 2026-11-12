import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Sections";
import { FleetForm } from "@/components/site/Forms";

export const Route = createFileRoute("/fleet-services")({
  head: () => seo("Fleet Servicing Gold Coast | Garuda Automotives", "Small business and light-commercial fleet servicing enquiries on the Gold Coast. Tell Garuda Automotives about your vehicles and needs.", "/fleet-services"),
  component: Fleet,
});

function Fleet() {
  return (
    <>
      <PageHero eyebrow="Fleet services" title="Keep your business moving.">
        <p>Your vehicles help your business run. Share your fleet size, makes and models, typical mileage and servicing needs. We can discuss practical maintenance and repair support for eligible light-commercial vehicles.</p>
      </PageHero>
      <section className="py-16">
        <div className="container-site max-w-4xl">
          <h2 className="mb-6 text-2xl font-bold">Request a Fleet Consultation</h2>
          <FleetForm />
        </div>
      </section>
    </>
  );
}
