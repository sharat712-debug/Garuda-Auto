import { useEffect, useRef, useState } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { business, launchOffer, offerAvailable, offerInclusions } from '@/config/business';
import oilServicePhoto from '@/assets/engine-oil-drain.jpeg.asset.json';
import { createOfferSession } from '@/lib/offer-session';

export function OfferPopup() {
  const pathname = useRouterState({ select: state => state.location.pathname });
  const [open, setOpen] = useState(false);
  const session = useRef<ReturnType<typeof createOfferSession> | null>(null);
  useEffect(() => {
    session.current ??= createOfferSession({
      getItem: key => window.sessionStorage.getItem(key),
      setItem: (key, value) => window.sessionStorage.setItem(key, value),
    });
    return session.current.schedule(() => setOpen(true), offerAvailable);
  }, [pathname]);

  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-3xl gap-0 overflow-y-auto rounded-lg border-border p-0">
      <div className="grid sm:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-36 overflow-hidden bg-surface sm:min-h-full">
          <img src={oilServicePhoto.url} alt="Engine oil draining into a workshop oil collector beneath a raised vehicle" className="absolute inset-0 h-full w-full object-cover object-[center_20%] sm:object-center" />
          <div className="absolute inset-0 bg-surface/35" aria-hidden="true" />
          <div className="relative m-5 w-40 rounded-sm bg-plate p-2 sm:m-6 sm:w-44"><img src="/garuda-logo.png" alt={business.name} className="w-full" /></div>
          <div className="absolute inset-x-0 bottom-0 hidden border-t-4 border-primary bg-surface/95 p-6 sm:block">
            <p className="font-display text-xl font-bold">{launchOffer.tagline}</p>
            <p className="mt-2 text-sm text-muted-foreground">Jimboomba · Now open</p>
          </div>
        </div>
        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <p className="text-xs font-semibold uppercase text-primary">Limited-time special offer</p>
          <DialogTitle className="mt-3 font-display text-3xl font-bold leading-tight tracking-normal">{launchOffer.headline}</DialogTitle>
          <div className="my-4 flex items-end gap-3">
            <p className="font-display text-6xl font-bold leading-none text-foreground">${launchOffer.price}</p>
            <span className="pb-1 text-sm text-muted-foreground">{launchOffer.gstIncluded ? 'including GST' : 'plus GST'}</span>
          </div>
          <DialogDescription className="text-sm">{launchOffer.description}</DialogDescription>
          <ul className="mt-4 space-y-2 text-sm">
            {offerInclusions().map(item => <li key={item} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}
          </ul>
          <p className="mt-4 border-l-2 border-primary pl-3 text-sm font-semibold">Need more than {launchOffer.oilLitres} litres? <span className="text-primary">Just ${launchOffer.additionalOilPerLitre} per additional litre</span>, including GST.</p>
          <div className="my-5 border-y border-border py-3 text-sm">
            <p className="font-semibold">First {launchOffer.dailyLimit} customers each day</p>
            <p className="mt-1 text-muted-foreground">Through {launchOffer.endLabel}</p>
          </div>
          <Button asChild className="h-11 w-full"><Link to="/book-service" onClick={() => setOpen(false)}>Request your service today <ArrowRight className="h-4 w-4" /></Link></Button>
          {business.phoneHref && <Button asChild variant="ghost" className="mt-1 h-10 w-full"><a href={`tel:${business.phoneHref}`}><Phone className="h-4 w-4" />Call the workshop</a></Button>}
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Subject to vehicle suitability and confirmed daily availability. Any work beyond the package is quoted before proceeding. An enquiry does not reserve a promotional place.</p>
        </div>
      </div>
    </DialogContent>
  </Dialog>;
}