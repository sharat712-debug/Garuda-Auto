export const OFFER_DELAY_MS = 10_000;
export const OFFER_SESSION_KEY = 'garuda-offer-shown';

/** Tab-scoped browser session, with an in-memory fallback if storage is blocked. */
export function createOfferSession(storage: Pick<Storage, 'getItem' | 'setItem'>) {
  let shown = false;
  const hasShown = () => {
    try { return shown || storage.getItem(OFFER_SESSION_KEY) === '1'; }
    catch { return shown; }
  };
  return {
    schedule(onShow: () => void, eligible: () => boolean) {
      if (hasShown()) return () => {};
      const timer = setTimeout(() => {
        if (hasShown() || !eligible()) return;
        shown = true;
        try { storage.setItem(OFFER_SESSION_KEY, '1'); } catch { /* Keep the in-memory session flag. */ }
        onShow();
      }, OFFER_DELAY_MS);
      return () => clearTimeout(timer);
    },
  };
}