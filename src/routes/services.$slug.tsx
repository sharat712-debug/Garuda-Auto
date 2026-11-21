import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Check } from 'lucide-react';
import { services } from '@/config/business';
import { seo, structuredData } from '@/lib/seo';
import { FinalCta, PageHero, PrimaryLink, PageFAQ, WorkshopPhoto, OfferBand, LocalWorkshop } from '@/components/site/Sections';
export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => { const service = services.find(s => s.slug === params.slug); if (!service) throw notFound(); return {service}; },
  head: ({loaderData, params}) => loaderData ? {
    ...seo(loaderData.service.seoTitle, loaderData.service.seoDescription, `/services/${params.slug}`),
    scripts: [structuredData({ '@type': 'BreadcrumbList', itemListElement: [
      { '@type':'ListItem', position:1, name:'Home', item:'https://garuda-auto.lovable.app/' },
      { '@type':'ListItem', position:2, name:'Services', item:'https://garuda-auto.lovable.app/services' },
      { '@type':'ListItem', position:3, name:loaderData.service.title, item:`https://garuda-auto.lovable.app/services/${params.slug}` },
    ] })],
  } : { ...seo('Service unavailable | Garuda Automotive', 'The requested service page is unavailable. Explore current Jimboomba workshop services.', `/services/${params.slug}`), meta: [...seo('Service unavailable | Garuda Automotive', 'The requested service page is unavailable.', `/services/${params.slug}`).meta, { name:'robots', content:'noindex' }] },
  component: ServicePage,
});
function ServicePage() { const {service} = Route.useLoaderData(); const others = services.filter(s => s.slug !== service.slug); return <>
  <PageHero eyebrow={service.status === 'available' ? 'Jimboomba workshop · current service' : 'Jimboomba workshop · enquiry only'} title={`${service.title} in Jimboomba`}><p>{service.intro}</p></PageHero>
  {service.slug === 'oil-filter-service' && <OfferBand />}
  <section className="py-16"><div className="container-site grid gap-12 lg:grid-cols-[1.4fr_1fr]"><div><h2 className="text-3xl font-bold">{service.status === 'available' ? 'What the agreed service can include' : 'Our current inspection & maintenance scope'}</h2><ul className="mt-6 space-y-4">{service.includes.map(i => <li key={i} className="flex items-start gap-3"><Check className="mt-1 h-5 w-5 shrink-0 text-primary" /><span>{i}</span></li>)}</ul>{service.note && <p className="mt-8 border-l-4 border-primary pl-5 text-muted-foreground">{service.note}</p>}<div className="mt-8"><PrimaryLink to="/book-service">{service.status === 'available' ? 'Request a service appointment' : 'Discuss your vehicle needs'}</PrimaryLink></div></div><WorkshopPhoto name={service.photo} eager className="aspect-[4/5] max-h-[540px]" /></div></section>
  <section className="border-y border-border bg-background py-16"><div className="container-site grid gap-12 lg:grid-cols-[1.6fr_1fr]"><div className="space-y-12">{service.sections.map(section => <div key={section.title}><h2 className="text-3xl font-bold">{section.title}</h2>{section.paragraphs.map(p => <p key={p} className="mt-5 text-lg text-muted-foreground">{p}</p>)}</div>)}</div><aside className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8"><h2 className="text-xl font-bold">Explore other workshop services</h2><ul className="mt-5 space-y-4">{others.map(s => <li key={s.slug}><Link to="/services/$slug" params={{slug:s.slug}} className="text-muted-foreground hover:text-primary">{s.title} →</Link></li>)}</ul><Link to="/services" className="mt-6 inline-block font-semibold text-primary">All services →</Link></aside></div></section>
  <PageFAQ items={service.questions} title={`${service.title}: your questions`} /><LocalWorkshop /><FinalCta />
</>; }
