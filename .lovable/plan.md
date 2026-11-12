# Garuda Automotives website (pre-launch)

Full site built to your brief, in Australian English, using your uploaded GARUDA logo exactly as supplied (also as the browser tab icon). Starts in "Opening Soon" mode; one setting flips it to "Now Open".

## Pages
Home, Services overview + 7 service pages (Logbook Servicing, Diagnostics, Brakes & Suspension, Electrical, Pre-Purchase Inspections, Tyres & Wheels, Light Commercial & Fleet), About, Our Mechanic, Fleet Services, Book a Service, Contact, Privacy Policy, Terms, 404.

All copy from the brief: hero (pre-launch/live versions), intro, 9 service cards (Safety Certificates shown only as "upcoming / subject to approval"), Why Garuda, mechanic preview, fleet teaser, booking section, FAQ, final call to action.

## Look and feel
- Midnight/charcoal backgrounds, off-white text, racing red only for buttons and small accents, steel grey secondary text.
- Space Grotesk headings, Inter body.
- Sticky header with Services dropdown, red "Book a Service" button; mobile menu plus bottom bar (Call / Request Booking).
- Illustrative workshop photos (labelled illustrative), neutral portrait placeholder for Raja — no AI person presented as him.

## Honesty rules built in
- Phone, email, address, hours, map and Call buttons appear only once real details are entered; until then they are hidden, never faked.
- No reviews, ratings, badges, "#1", years-in-business or accreditation claims.
- Mechanic CV: only qualifications and previous employers, no private contact details.

## Forms (real, stored)
- Booking request form with all listed fields, validation, consent box, optional unchecked marketing opt-in, hidden anti-bot field, and the exact "not a confirmed appointment" success message.
- Fleet enquiry form with its listed fields.
- Submissions saved securely in Lovable Cloud; success only shown after the save succeeds.
- Staff-only admin page (sign-in required): view enquiries, change status (new, contacted, quote required, booked, completed, closed), export CSV, delete.
- Email notifications: shown as "configuration required" until you have a verified sending domain; can be switched on later.

## Search
Unique title/description per page, local business details only with confirmed facts (no fake address/hours/ratings), sitemap-ready, robots.

## Handover
A checklist of every unconfirmed item (phone, email, address, ABN, hours, opening date, accreditation, Raja's consent/photo, legal review of policies).

## Technical details
- `src/config/business.ts`: single config (mode `"prelaunch" | "live"`, contact, address, hours, services, FAQ, SEO). Null fields hide UI.
- Logo via lovable-assets pointer; favicon padded square in `public/favicon.png`.
- Lovable Cloud: `booking_requests`, `fleet_enquiries` tables, RLS: no anon reads; inserts via server function with zod validation, honeypot and simple per-IP throttle table. `user_roles` + `has_role` for admin; admin route under `_authenticated`.
- One route file per page, each with its own head().
