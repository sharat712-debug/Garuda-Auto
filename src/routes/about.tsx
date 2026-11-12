import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { FinalCta, PageHero } from "@/components/site/Sections";

export const Route = createFileRoute("/about")({
  head: () => seo("About Garuda Automotives | Gold Coast Workshop", "Garuda Automotives is a new automotive workshop being established on the Gold Coast, built around practical fault finding and clear communication.", "/about"),
  component: About,
});

function About() {
  return (
    <>
      <PageHero eyebrow="About" title="Automotive care built on expertise and trust." />
      <section className="py-16">
        <div className="container-site max-w-3xl space-y-6 text-lg text-muted-foreground">
          <p>Garuda Automotives is a new automotive workshop being established on Queensland's Gold Coast. We're building a service experience around practical fault finding, thoughtful maintenance and clear communication.</p>
          <p>Our aim is simple: help drivers understand their vehicles, make informed repair decisions and get back on the road with confidence.</p>
          <p className="text-foreground">As we prepare to open, we're inviting local motorists and businesses to get in touch about their upcoming service needs.</p>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
