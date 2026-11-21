import { afterEach, describe, expect, it, vi } from 'vitest';
import { createOfferSession, OFFER_SESSION_KEY } from '@/lib/offer-session';

afterEach(() => { vi.useRealTimers(); sessionStorage.clear(); });
describe('Offer pop-up session rules', () => {
  it('waits exactly 10 seconds after a page loads', () => {
    vi.useFakeTimers();
    const show = vi.fn();
    createOfferSession(sessionStorage).schedule(show, () => true);
    vi.advanceTimersByTime(9999);
    expect(show).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(show).toHaveBeenCalledTimes(1);
  });
  it('only shows once per session, including after reload', () => {
    vi.useFakeTimers();
    const show = vi.fn();
    createOfferSession(sessionStorage).schedule(show, () => true);
    vi.advanceTimersByTime(10000);
    expect(sessionStorage.getItem(OFFER_SESSION_KEY)).toBe('1');
    createOfferSession(sessionStorage).schedule(show, () => true);
    vi.advanceTimersByTime(10000);
    expect(show).toHaveBeenCalledTimes(1);
  });
  it('restarts the delay when the visitor changes pages before display', () => {
    vi.useFakeTimers();
    const show = vi.fn();
    const session = createOfferSession(sessionStorage);
    const cancel = session.schedule(show, () => true);
    vi.advanceTimersByTime(5000);
    cancel();
    session.schedule(show, () => true);
    vi.advanceTimersByTime(9999);
    expect(show).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(show).toHaveBeenCalledTimes(1);
  });
  it('does not show an expired offer or mark the session as shown', () => {
    vi.useFakeTimers();
    const show = vi.fn();
    createOfferSession(sessionStorage).schedule(show, () => false);
    vi.advanceTimersByTime(10000);
    expect(show).not.toHaveBeenCalled();
    expect(sessionStorage.getItem(OFFER_SESSION_KEY)).toBeNull();
  });
  it('still shows once if session storage is unavailable', () => {
    vi.useFakeTimers();
    const show = vi.fn();
    const session = createOfferSession({ getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } });
    session.schedule(show, () => true);
    vi.advanceTimersByTime(10000);
    session.schedule(show, () => true);
    vi.advanceTimersByTime(10000);
    expect(show).toHaveBeenCalledTimes(1);
  });
});