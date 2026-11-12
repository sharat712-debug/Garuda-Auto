import { createFileRoute } from "@tanstack/react-router";
import { business } from "@/config/business";
import { seo } from "@/lib/seo";
import { PageHero } from "@/components/site/Sections";

export const Route = createFileRoute("/privacy-policy")({
  head: () => seo("Privacy Policy | Garuda Automotives", "How Garuda Automotives collects, uses and stores personal information submitted through enquiry forms.", "/privacy-policy"),
  component: Privacy,
});

function Privacy() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="py-16">
        <article className="container-site max-w-3xl space-y-6 text-muted-foreground [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground">
          <p className="rounded-lg border border-primary/50 bg-primary/10 p-4 text-sm text-foreground">Draft — requires review by the business owner and a legal adviser before launch.</p>
          <h2>What we collect</h2>
          <p>When you submit an enquiry we collect your name, phone number, email address, vehicle details (make, model, year, registration, type), the service requested, a description of the issue, preferred date and time, your preferred contact method and your consent choices. We also record when and from which page the enquiry was sent, and a one-way hashed network identifier used to prevent spam.</p>
          <h2>Why we collect it</h2>
          <p>To respond to your enquiry, discuss your vehicle's needs, arrange services and keep a record of our communication. If you opt in, we may also send occasional updates about our opening and services. You can opt out at any time.</p>
          <h2>Storage and security</h2>
          <p>Enquiries are stored with a secure cloud hosting provider and are accessible only to authorised Garuda staff.</p>
          <h2>Retention</h2>
          <p>We keep enquiry records only as long as reasonably needed for the purposes above or as required by law, after which they are deleted.</p>
          <h2>Sharing</h2>
          <p>We do not sell your information. We share it only with service providers who help us operate the website, store data or send emails, and only as needed for those services.</p>
          <h2>Access and correction</h2>
          <p>You can ask to access, correct or delete the personal information we hold about you by contacting us{business.email ? ` at ${business.email}` : " through our contact page"}.</p>
          <h2>Contact</h2>
          <p>{business.name}, {business.region}.</p>
        </article>
      </section>
    </>
  );
}
