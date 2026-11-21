import { Link } from "@tanstack/react-router";
import { business, isLive, services } from "@/config/business";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background pb-24 pt-14 lg:pb-10">
      <div className="container-site grid gap-10 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-xl font-bold">GARUDA <span className="text-primary">//</span></p>
          <p className="mt-3 text-sm text-muted-foreground">
            {isLive() ? "Automotive servicing & repairs" : "Opening soon"} — {business.region}.
          </p>
          {business.abn && <p className="mt-2 text-xs text-muted-foreground">ABN {business.abn}</p>}
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Services</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {services.map((s) => <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="hover:text-primary">{s.title}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Garuda</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-primary">About</Link></li>
            <li><Link to="/our-mechanic" className="hover:text-primary">Our Mechanic</Link></li>
            <li><Link to="/fleet-services" className="hover:text-primary">Fleet Services</Link></li>
            <li><Link to="/book-service" className="hover:text-primary">Book a Service</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Contact</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>{isLive() && business.address ? `${business.address.street}, ${business.address.suburb} QLD ${business.address.postcode}` : business.region}</li>
            {business.phone && business.phoneHref && <li><a href={`tel:${business.phoneHref}`} className="hover:text-primary">{business.phone}</a></li>}
            {business.email && <li><a href={`mailto:${business.email}`} className="hover:text-primary">{business.email}</a></li>}
            <li><Link to="/contact" className="hover:text-primary">Send an enquiry</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-site mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} {business.name}. Original workshop photos.</p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
          <Link to="/terms" className="hover:text-primary">Terms</Link>
          <Link to="/admin" className="hover:text-primary">Staff</Link>
        </div>
      </div>
    </footer>
  );
}
