import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { services } from "@/config/business";
import { seo } from "@/lib/seo";
import { FinalCta, PageHero, PrimaryLink } from "@/components/site/Sections";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { service };
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo(loaderData.service.seoTitle, loaderData.service.seoDescription, `/services/${params.slug}`)
      : { meta: [{ title: "Service not found | Garuda Automotives" }, { name: "robots", content: "noindex" }] },
  component: ServicePage,
});

function ServicePage() {
  const { service } = Route.useLoaderData();
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);
  return (
    <>
      <PageHero eyebrow="Services" title={service.title}><p>{service.intro}</p></PageHero>
      <section className="py-16">
        <div className="container-site grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold">What this can include</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {service.includes.map((i) => (
                <li key={i} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" /> <span>{i}</span>
                </li>
              ))}
            </ul>
            {service.note && <p className="mt-6 rounded-lg border-l-4 border-primary bg-card p-4 text-sm text-muted-foreground">{service.note}</p>}
            <div className="mt-10"><PrimaryLink to="/book-service">Request a Booking</PrimaryLink></div>
          </div>
          <aside className="rounded-xl border border-border bg-background p-6">
            <h2 className="font-display text-lg font-semibold">Other services</h2>
            <ul className="mt-4 space-y-2">
              {others.map((s) => <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="text-muted-foreground hover:text-primary">{s.title}</Link></li>)}
              <li><Link to="/services" className="font-semibold text-primary">All services →</Link></li>
            </ul>
          </aside>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
