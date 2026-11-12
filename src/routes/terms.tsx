import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/config/business";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Sections";

export const Route = createFileRoute("/terms")({
  head: () => seo("Website Terms | Garuda Automotives", "Terms of use for the Garuda Automotives website and enquiry forms.", "/terms"),
  component: Terms,
});

function Terms() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Website Terms" />
      <section className="py-16">
        <article className="container-site max-w-3xl space-y-6 text-muted-foreground [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
          <p className="rounded-lg border border-primary/50 bg-primary/10 p-4 text-sm text-foreground">Generic placeholder — must be reviewed by the business owner and a legal adviser before launch.</p>
          <h2>Enquiries are not bookings</h2>
          <p>Submitting a form on this website is a request only. A booking is confirmed only when {business.name} contacts you to confirm it.</p>
          <h2>Information on this site</h2>
          <p>Service descriptions are general information. The scope, price and availability of any work will be confirmed directly. Images are illustrative unless stated otherwise.</p>
          <h2>Quotes</h2>
          <p>Some work may require inspection or diagnostics before an accurate quote can be provided.</p>
          <h2>Your rights</h2>
          <p>Nothing in these terms limits your rights under the Australian Consumer Law.</p>
        </article>
      </section>
    </>
  );
}
