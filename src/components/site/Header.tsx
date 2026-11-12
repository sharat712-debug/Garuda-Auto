import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { business, services } from "@/config/business";

const nav = [
  { to: "/about", label: "About" },
  { to: "/our-mechanic", label: "Our Mechanic" },
  { to: "/fleet-services", label: "Fleet Services" },
  { to: "/contact", label: "Contact" },
] as const;

const linkCls = "rounded-md px-3 py-2 text-sm font-medium text-plate-foreground/80 transition-colors hover:text-primary";
const activeCls = { className: "text-primary" };

export function Header() {
  const [open, setOpen] = useState(false);
  const [svc, setSvc] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-plate-foreground/10 bg-plate text-plate-foreground shadow-sm">
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20">
        <Logo className="h-12 md:h-16" />
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <Link to="/" className={linkCls} activeProps={activeCls} activeOptions={{ exact: true }}>Home</Link>
          <div className="group relative" onMouseLeave={() => setSvc(false)}>
            <button
              type="button"
              className={`${linkCls} inline-flex items-center gap-1`}
              aria-expanded={svc}
              aria-haspopup="true"
              onClick={() => setSvc((v) => !v)}
              onMouseEnter={() => setSvc(true)}
            >
              Services <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            {svc && (
              <div className="absolute left-0 top-full w-72 pt-2">
                <ul className="rounded-lg border border-border bg-popover p-2 text-popover-foreground shadow-xl">
                  <li><Link to="/services" onClick={() => setSvc(false)} className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-accent">All services</Link></li>
                  {services.map((s) => (
                    <li key={s.slug}>
                      <Link to="/services/$slug" params={{ slug: s.slug }} onClick={() => setSvc(false)} className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">{s.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {nav.map((n) => <Link key={n.to} to={n.to} className={linkCls} activeProps={activeCls}>{n.label}</Link>)}
        </nav>
        <div className="flex items-center gap-2">
          {business.phone && business.phoneHref && (
            <a href={`tel:${business.phoneHref}`} className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold md:inline-flex">
              <Phone className="h-4 w-4" aria-hidden="true" /> {business.phone}
            </a>
          )}
          <Link to="/book-service" className="hidden rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-red)] transition hover:brightness-110 sm:inline-flex">Book a Service</Link>
          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-md lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Mobile" className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-surface text-foreground lg:hidden">
          <ul className="container-site space-y-1 py-4" onClick={() => setOpen(false)}>
            <li><Link to="/" className="block rounded-md px-3 py-3 font-medium hover:bg-accent">Home</Link></li>
            <li><Link to="/services" className="block rounded-md px-3 py-3 font-medium hover:bg-accent">Services</Link></li>
            {services.map((s) => (
              <li key={s.slug}><Link to="/services/$slug" params={{ slug: s.slug }} className="block rounded-md px-6 py-2 text-sm text-muted-foreground hover:bg-accent">{s.title}</Link></li>
            ))}
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="block rounded-md px-3 py-3 font-medium hover:bg-accent">{n.label}</Link></li>)}
            <li className="pt-2"><Link to="/book-service" className="block rounded-md bg-primary px-3 py-3 text-center font-semibold text-primary-foreground">Book a Service</Link></li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-border bg-surface/95 p-3 backdrop-blur lg:hidden">
      {business.phone && business.phoneHref && (
        <a href={`tel:${business.phoneHref}`} className="flex flex-1 items-center justify-center gap-2 rounded-md border border-input py-3 font-semibold">
          <Phone className="h-4 w-4" aria-hidden="true" /> Call
        </a>
      )}
      <Link to="/book-service" className="flex flex-1 items-center justify-center rounded-md bg-primary py-3 font-semibold text-primary-foreground">Request Booking</Link>
    </div>
  );
}
