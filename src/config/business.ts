/** Owner-confirmed facts only. Null details remain hidden; pending capabilities are not bookable promises. */
export type LaunchMode = 'prelaunch' | 'live';
export type Question = { q: string; a: string };
export const business = {
  mode: 'live' as LaunchMode,
  name: 'Garuda Automotive',
  tagline: 'Your Car. Our Expertise. Your Peace of Mind.',
  region: 'Jimboomba, Queensland',
  phone: '+61 402 576 869' as string | null,
  phoneHref: '+61402576869' as string | null,
  email: null as string | null,
  address: { street: '9 Euphemia Street', suburb: 'Jimboomba', state: 'QLD', postcode: '4280' } as null | { street: string; suburb: string; state: 'QLD'; postcode: string },
  abn: '56702908745' as string | null,
  openingDate: null as string | null,
  openingHours: null as null | { days: string; hours: string }[],
  mapEmbedUrl: null as string | null,
  directionsUrl: 'https://www.google.com/maps/search/?api=1&query=9%20Euphemia%20Street%20Jimboomba%20QLD%204280',
  social: { facebook: null as string | null, instagram: null as string | null },
  safetyCertificatesApproved: false,
  mechanicConsentGiven: true,
  emailNotificationsConfigured: false,
  serviceAreas: ['Jimboomba', 'Yarrabilba', 'Flagstone', 'Logan Village', 'Greenbank', 'New Beith', 'Park Ridge', 'Regents Park', 'Browns Plains', 'North Maclean', 'Mundoolun'],
  mechanic: {
    name: 'M Raja', title: 'Head Mechanic',
    statement: 'My approach to automotive servicing is built around safety, transparency and reliability. With a background in mechanical engineering and practical automotive experience, I believe every vehicle deserves proper inspection and maintenance. At Garuda Automotive, our goal is to provide honest advice; affordable servicing and quality workmanship, helping customers understand their vehicles and make confident maintenance decisions.',
    qualifications: ['Bachelor of Technology in Mechanical Engineering — Hindustan University, India', 'Certificate III in Automotive (Light Vehicle Mechanical Technology)', 'Certificate IV in Automotive', 'Diploma in Automotive'],
    previousEmployers: ['Volvo Group Australia', 'Penske Commercial'],
  },
};
export const isLive = () => business.mode === 'live';
export const addressText = () => business.address ? `${business.address.street}, ${business.address.suburb} ${business.address.state} ${business.address.postcode}, Australia` : business.region;
export const launchOffer = { price: 120, gstIncluded: true, oilLitres: 5, dailyLimit: 5, endDate: '2027-01-31', endLabel: '31 January 2027', approved: true };
/** Calendar dates use the workshop's Queensland timezone; end day is inclusive. */
export function offerAvailable(date = new Date()): boolean {
  const parts = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Brisbane', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(date);
  const part = (key: string) => parts.find((p) => p.type === key)?.value ?? '';
  const localDate = `${part('year')}-${part('month')}-${part('day')}`;
  return launchOffer.approved && localDate <= launchOffer.endDate;
}
export type Service = {
  slug: string; title: string; short: string; icon: 'wrench' | 'gauge' | 'disc' | 'zap' | 'search' | 'circle' | 'truck';
  intro: string; includes: string[]; note?: string; seoTitle: string; seoDescription: string;
  status: 'available' | 'enquiry' | 'future'; photo: 'interior' | 'equipment' | 'underbody' | 'wheel' | 'tools' | 'hoist' | 'oil' | 'wheelCheck' | 'exterior';
  sections: { title: string; paragraphs: string[] }[]; questions: Question[];
};
const approval = 'We explain the proposed work and price before proceeding. Additional repairs need your approval; an enquiry is not a confirmed appointment.';
export const services: Service[] = [
  {
    slug: 'oil-filter-service', title: 'Engine Oil & Filter Changes', short: 'Petrol and eligible diesel oil and filter servicing, with vehicle-specific oil requirements checked first.', icon: 'wrench', status: 'available', photo: 'oil',
    intro: 'Looking for an affordable oil and filter change in Jimboomba? Garuda Automotive provides basic engine oil servicing for suitable petrol and diesel passenger vehicles at 9 Euphemia Street. We check the vehicle requirements before confirming the package and appointment.',
    includes: ['Engine oil replacement', 'Oil filter replacement', 'Up to 5 litres of suitable oil in the launch package', 'Standard oil-change labour'],
    note: 'The $120 including GST Black Friday offer runs through 31 January 2027, for the first five customers each day. Vehicle suitability and daily availability must be confirmed. Extra oil or vehicle-specific requirements are quoted before work.',
    seoTitle: 'Oil & Filter Change Jimboomba | Garuda Automotive', seoDescription: 'Request an oil and filter change in Jimboomba. Garuda Automotive checks oil specifications and vehicle suitability, with clear pricing before work begins.',
    sections: [
      { title: 'An oil change that suits your engine', paragraphs: ['Oil specification matters as much as the amount of oil used. Tell us your make, model, year, engine type and kilometres so we can check the correct oil and filter for your vehicle. Diesel servicing is subject to the engine’s requirements and parts availability.', 'A basic oil change is not the same as a complete manufacturer-scheduled logbook service. If your service schedule calls for additional filters, fluids or other work, we will discuss that separately rather than imply it is included in the introductory price.'] },
      { title: 'Know the price before you book', paragraphs: ['The introductory package covers up to five litres of oil, an oil filter and standard service labour for suitable vehicles. Vehicles needing more oil or a different service scope may cost more. Ask for a vehicle-specific quote and mention the launch offer when enquiring.', approval] },
    ],
    questions: [
      { q: 'What does the $120 oil change in Jimboomba include?', a: 'The approved launch package includes GST, up to five litres of suitable oil, an oil filter and standard oil-change labour. It is limited to the first five customers per day through 31 January 2027. We confirm vehicle eligibility, extra requirements and availability before booking.' },
      { q: 'Can you change the oil in a diesel vehicle?', a: 'We accept basic diesel oil and filter enquiries, subject to the engine’s oil specification, filter requirements and workshop capability. Send your vehicle details first.' },
      { q: 'Does the oil change include a full logbook service?', a: 'No. Manufacturer-scheduled servicing may need additional tasks, parts or fluids. We check the service schedule and quote the appropriate work separately.' },
      { q: 'Can I reserve one of the five daily offer places online?', a: 'The form is a request, not a live availability calendar. Raja will confirm eligibility and whether a promotional place is available for your preferred day.' },
    ],
  },
  {
    slug: 'logbook-servicing', title: 'General & Logbook Servicing', short: 'Basic maintenance and manufacturer-specified servicing where technical information and correct parts are available.', icon: 'wrench', status: 'available', photo: 'interior',
    intro: 'For car servicing in Jimboomba, start with your vehicle’s service schedule rather than a one-size-fits-all package. Our initial focus is routine oil and filter maintenance, basic inspections and manufacturer-specified work where the required information, parts and procedures are available.',
    includes: ['Oil and oil filter maintenance', 'Basic visual vehicle health inspections', 'Tyre condition and pressure checks', 'Battery condition checks where appropriate', 'Visual inspection for fluid leaks', 'Maintenance recommendations'],
    note: 'Logbook service scope and pricing are confirmed for each vehicle. The introductory oil-change package does not automatically cover every scheduled-service requirement.',
    seoTitle: 'Car & Logbook Servicing Jimboomba | Garuda Automotive', seoDescription: 'Enquire about car and logbook servicing in Jimboomba, near Yarrabilba and Flagstone. Vehicle-specific maintenance with quotes and approval before extra repairs.',
    sections: [
      { title: 'Basic servicing or a scheduled logbook service?', paragraphs: ['Basic maintenance focuses on the work agreed for your vehicle, such as replacing engine oil and the oil filter. A logbook service follows the manufacturer’s schedule for the vehicle’s age and distance travelled, which can require additional checks and replacements.', 'Bring your service book or share the scheduled service details. We confirm whether we have the relevant technical information, correct oils and filters, and procedures for the work. We do not promise every model or every scheduled task before checking.'] },
      { title: 'Preventative maintenance with clear next steps', paragraphs: ['Tyre wear, fluid leaks and brake concerns can be discussed during basic inspections. We aim to provide a simple digital inspection report as our service process develops; ask what reporting is available for your appointment.', 'We welcome motorists from Jimboomba, Yarrabilba, Flagstone and the surrounding Logan communities. Petrol and eligible diesel vehicles are our initial focus; hybrid, EV and high-voltage work are future capabilities, not current advertised services.', approval] },
    ],
    questions: [
      { q: 'Do you offer manufacturer-specified logbook servicing in Jimboomba?', a: 'Yes, where the correct technical information, service schedule, oils, filters and procedures are available. Share your make, model, year and upcoming service so we can confirm scope.' },
      { q: 'Can you service BMW, Mercedes-Benz, Audi or Volkswagen vehicles?', a: 'We welcome selected European vehicle enquiries, alongside Japanese, Korean and Australian makes. Acceptance depends on the model, work required, parts and diagnostic capability.' },
      { q: 'How much is a logbook service?', a: 'Logbook pricing is vehicle-specific and has no published flat rate. Send your vehicle details and service requirements for a quote; additional repairs require approval.' },
      { q: 'Do you work on hybrid or electric vehicles?', a: 'Hybrid and EV servicing are planned future expansions. We do not currently advertise high-voltage repairs or battery diagnostics.' },
    ],
  },
  {
    slug: 'vehicle-diagnostics', title: 'Vehicle Diagnostics & Fault Finding', short: 'Basic warning-light and fault investigation using a Launch professional automotive diagnostic scanner.', icon: 'gauge', status: 'available', photo: 'tools',
    intro: 'A warning light does not identify a repair on its own. Garuda Automotive offers basic diagnostic fault detection in Jimboomba using a Launch professional automotive diagnostic scanner, with the scope checked against your vehicle and the symptoms you describe.',
    includes: ['Basic diagnostic scanning where compatible', 'Warning-light and symptom discussion', 'Initial fault detection', 'Recommended next steps and scope confirmation'],
    note: 'Advanced diagnostics and specialist repairs will expand progressively. Diagnostic fees are confirmed before work; no fixed diagnostic rate is currently published.',
    seoTitle: 'Car Diagnostics Jimboomba | Warning Lights & Fault Finding', seoDescription: 'Warning light on? Request basic car diagnostics at Garuda Automotive in Jimboomba. Launch scanner fault detection and agreed charges before investigation.',
    sections: [
      { title: 'Tell us what changed, not just the fault code', paragraphs: ['Useful details include when the warning appeared, whether the engine was cold or warm, and any change in starting, idle or performance. Let us know if the battery was recently disconnected or if another repair has already been attempted.', 'Scanner information is a starting point for investigation, not an automatic instruction to replace a component. We explain what the initial checks can establish and whether more specialist testing is needed.'] },
      { title: 'A realistic diagnostic scope', paragraphs: ['Our current equipment includes a Launch professional scanner. Compatibility depends on the vehicle and systems involved. Advanced electrical testing, manufacturer-specific information and specialist equipment will be introduced as workshop capability develops.', 'If a warning light is accompanied by overheating, loss of braking or another immediate safety concern, do not rely on an online enquiry to decide whether it is safe to drive. Seek appropriate immediate assistance. We do not provide roadside assistance or towing.', approval] },
    ],
    questions: [
      { q: 'Can you check an engine warning light in Jimboomba?', a: 'We offer basic diagnostic fault detection for compatible vehicles. Share your make, model, year and symptoms so we can confirm the available investigation.' },
      { q: 'What diagnostic scanner do you use?', a: 'We currently have a Launch professional automotive diagnostic scanner. Coverage and the available tests depend on the specific vehicle.' },
      { q: 'Is a diagnostic scan the same as a confirmed repair diagnosis?', a: 'No. Recorded fault information can guide investigation, but further checks may be required before the cause and repair scope can be confirmed.' },
      { q: 'How much does a diagnostic inspection cost?', a: 'A fixed diagnostic fee has not been finalised. We communicate and agree the proposed investigation charge before proceeding.' },
    ],
  },
  {
    slug: 'brakes-suspension', title: 'Brake Inspections & Repairs', short: 'Brake pad and rotor replacement, plus brake fluid inspection and replacement for suitable vehicles.', icon: 'disc', status: 'available', photo: 'wheel',
    intro: 'Garuda Automotive’s initial brake services include brake pad replacement, brake rotor replacement and brake fluid inspection or replacement. For brake repairs in Jimboomba, share your vehicle details and the symptoms so we can confirm parts, scope and availability.',
    includes: ['Brake pad replacement', 'Brake rotor replacement', 'Brake fluid inspection', 'Brake fluid replacement', 'Basic visual brake condition checks'],
    note: 'Steering and suspension repairs are not part of the confirmed opening-day scope. This page’s existing address is retained, but only the brake services listed here are advertised.',
    seoTitle: 'Brake Pads & Rotor Replacement Jimboomba | Garuda Automotive', seoDescription: 'Enquire about brake pad, rotor and brake fluid services in Jimboomba. Vehicle-specific quotes and customer approval before additional brake repairs.',
    sections: [
      { title: 'Describe the noise or change in braking', paragraphs: ['Tell us about squealing, grinding, vibration or a change in pedal feel, and when the symptoms occur. An inspection is needed before we can confirm whether pads, rotors, fluid or another issue needs attention.', 'Avoid assuming that every brake noise needs the same repair. We discuss the findings and proposed parts before proceeding, including whether the work is within our current capability.'] },
      { title: 'Brake maintenance without an open-ended repair bill', paragraphs: ['Brake packages depend on the vehicle, components required and parts availability. No universal brake-pad price is published. We provide a clear quote and do not start additional repairs without customer approval.', 'Customers from Logan Village, Flagstone and Yarrabilba can request an appointment at our Jimboomba workshop. Same-day minor work may be possible, but only when workshop time, parts and job requirements allow. If braking feels unsafe, seek immediate assistance rather than driving to a requested appointment.', approval] },
    ],
    questions: [
      { q: 'Do you replace brake pads and rotors in Jimboomba?', a: 'Yes, these are part of our initial service scope for suitable vehicles, subject to parts and appointment availability.' },
      { q: 'Can you inspect and replace brake fluid?', a: 'Brake fluid inspection and replacement are part of our initial services. The required procedure and price are confirmed for your vehicle.' },
      { q: 'How much does brake pad replacement cost?', a: 'It depends on your vehicle, parts and the agreed work. Send the make, model and year for a quote; there is no confirmed flat-rate brake package.' },
      { q: 'Do you also repair suspension and steering?', a: 'Those repairs are not part of the confirmed initial service scope. Contact us to discuss the issue rather than assume they are available.' },
    ],
  },
  {
    slug: 'automotive-electrical', title: 'Basic Electrical Fault Detection', short: 'Initial electrical fault detection and appropriate battery condition checks, with specialist work scoped separately.', icon: 'zap', status: 'available', photo: 'equipment',
    intro: 'Electrical problems can affect starting, warning lights and everyday vehicle operation. Our initial Jimboomba service includes basic electrical fault detection and battery condition checks where appropriate. Advanced automotive electrical repairs will be introduced progressively.',
    includes: ['Basic electrical symptom assessment', 'Compatible scanner fault detection', 'Battery condition checks where appropriate', 'Advice on further investigation requirements'],
    note: 'Battery replacement, specialist electrical repairs and high-voltage hybrid or EV work are not currently confirmed services.',
    seoTitle: 'Electrical Fault Detection Jimboomba | Garuda Automotive', seoDescription: 'Enquire about basic car electrical fault detection and appropriate battery checks in Jimboomba. Specialist repairs and replacement availability confirmed first.',
    sections: [
      { title: 'Useful details for an electrical enquiry', paragraphs: ['Describe whether the vehicle will start, which lights or accessories are affected and whether the issue is intermittent. Tell us about recent battery changes, repairs or accessories so we can discuss a sensible initial check.', 'Battery condition checks may be appropriate during servicing. A basic check does not guarantee that every starting problem is a battery issue, and replacement is not a confirmed initial service.'] },
      { title: 'Know the limits of the initial check', paragraphs: ['We use a Launch professional diagnostic scanner where compatible. Electrical testing equipment and more advanced diagnostic capability are planned investments; not every system or fault can be assessed with a scan alone.', 'If the required work is outside our available equipment or training, we explain that before promising a repair. Hybrid and EV high-voltage servicing remain future expansions. Charges for diagnostic or inspection work are discussed before proceeding.', approval] },
    ],
    questions: [
      { q: 'Can you investigate basic car electrical faults near Yarrabilba?', a: 'You can request an initial fault-detection appointment at our Jimboomba workshop. We confirm vehicle compatibility and the available checks first.' },
      { q: 'Do you offer battery replacement?', a: 'Battery condition checks may be available where appropriate. Battery replacement is a future service and is not currently confirmed.' },
      { q: 'Can you repair a hybrid or EV high-voltage fault?', a: 'No high-voltage repairs or battery diagnostics are currently advertised. That work requires appropriate training, equipment and safety arrangements.' },
      { q: 'Will you explain diagnostic charges first?', a: 'Yes. Inspection or diagnostic charges are discussed before investigation, and additional repairs require your approval.' },
    ],
  },
  {
    slug: 'pre-purchase-inspections', title: 'Vehicle Health & Inspection Enquiries', short: 'Basic visual vehicle health inspections; dedicated pre-purchase inspection availability must be confirmed.', icon: 'search', status: 'enquiry', photo: 'underbody',
    intro: 'Our confirmed initial scope includes basic vehicle health inspections and visual checks for maintenance concerns. A dedicated pre-purchase inspection is not a confirmed opening-day service. If you are considering a used car, contact us to discuss what checks we can currently offer before making arrangements with the seller.',
    includes: ['Basic visual vehicle health checks', 'Visible fluid-leak inspection', 'Tyre condition and pressure checks', 'Maintenance recommendations'],
    note: 'A basic visual inspection is not a comprehensive pre-purchase assessment or a Queensland safety certificate. We do not advertise safety certificate inspections or issue certificates without AIS authorisation.',
    seoTitle: 'Vehicle Health Checks Jimboomba | Inspection Enquiries', seoDescription: 'Request basic vehicle health checks at Garuda Automotive, Jimboomba. Ask about inspection scope before booking; safety certificates are not currently offered.',
    sections: [
      { title: 'Understand exactly what is being checked', paragraphs: ['A visual vehicle health check can highlight visible maintenance concerns within the agreed inspection scope. It does not establish the condition of every component, rule out hidden faults or guarantee a vehicle’s future reliability.', 'For a used-car enquiry, provide the make, model, year, kilometres and any known concerns. We will confirm whether we can assist and explain the inspection limits before you rely on the visit as part of a purchase decision.'] },
      { title: 'Inspection findings and maintenance advice', paragraphs: ['Our aim is to develop a simple digital inspection report that helps customers understand maintenance requirements and potential safety concerns. Ask which reporting format is available for the work being requested; a digital report is not yet guaranteed with every visit.', 'No repair is automatically authorised by an inspection. We discuss recommendations and pricing separately, with approval required before additional work. For Queensland safety certificates, an appropriately authorised inspection station is required; Garuda does not currently offer that service.', approval] },
    ],
    questions: [
      { q: 'Do you offer basic vehicle health checks in Jimboomba?', a: 'Yes. Basic visual inspections, tyre checks, visible fluid-leak checks and maintenance recommendations are included in our initial service scope. Confirm the exact checks when booking.' },
      { q: 'Can I book a full pre-purchase inspection?', a: 'Dedicated pre-purchase inspections are not yet a confirmed service. Contact us with the vehicle details to establish what checks are available before arranging the vehicle.' },
      { q: 'Is a vehicle health check a Queensland safety certificate?', a: 'No. We do not advertise or issue safety certificates unless the required Queensland Approved Inspection Station authorisation is obtained.' },
      { q: 'Will I receive a digital vehicle report?', a: 'A simple digital inspection report is an intended part of our developing service process. Please confirm current reporting availability for your appointment.' },
    ],
  },
  {
    slug: 'tyres-wheels', title: 'Tyre Condition & Pressure Checks', short: 'Basic tyre pressure and condition inspections, without unconfirmed fitting or alignment promises.', icon: 'circle', status: 'available', photo: 'wheelCheck',
    intro: 'Tyre checks are part of Garuda Automotive’s initial preventative maintenance focus in Jimboomba. We inspect tyre condition and pressure as agreed for your vehicle and discuss visible concerns. Tyre sales, fitting, balancing and wheel alignment are not currently confirmed services.',
    includes: ['Tyre condition inspection', 'Tyre pressure checks', 'Visible wear and damage observations', 'Basic maintenance recommendations'],
    note: 'Ask about the available inspection scope. We do not advertise tyre fitting, balancing or wheel alignment as available without confirmation.',
    seoTitle: 'Tyre Pressure & Condition Checks Jimboomba | Garuda Automotive', seoDescription: 'Request tyre condition and pressure checks in Jimboomba near Flagstone and Logan Village. Clear maintenance advice; fitting and alignment are not confirmed.',
    sections: [
      { title: 'Checks for everyday vehicle maintenance', paragraphs: ['Tyre pressures and visible condition deserve attention alongside routine servicing. Tell us if you have noticed a pressure warning, uneven wear, vibration or damage. We can discuss a basic inspection and whether further assessment is needed.', 'A tyre check does not mean that fitting or alignment is included. If your vehicle needs work outside our confirmed services, we explain the boundary rather than promise equipment or capability we do not yet have.'] },
      { title: 'Plan the appointment around your vehicle', paragraphs: ['Provide the make, model and year, plus details of the concern. Let us know if the vehicle has different wheel or tyre sizes from the original specification. The scope and charge for a standalone inspection are confirmed before work.', 'Our workshop welcomes enquiries from Jimboomba and surrounding Logan communities. Do not drive on a visibly damaged tyre or rely on a web enquiry as emergency assistance. Roadside services and towing are not available through Garuda.', approval] },
    ],
    questions: [
      { q: 'Can you check tyre pressures and condition in Jimboomba?', a: 'Yes. Basic tyre condition and pressure inspections are part of our initial maintenance services. Confirm whether they are included in your particular appointment.' },
      { q: 'Do you sell and fit new tyres?', a: 'Tyre sales and fitting are not currently confirmed. Our published service is tyre condition and pressure checking.' },
      { q: 'Do you offer wheel alignment or balancing?', a: 'Alignment and balancing are not advertised as available. Ask about current capability before requesting that work.' },
      { q: 'Can a tyre check be arranged with an oil change?', a: 'You can request both when submitting your vehicle details. We confirm the agreed package, any charges and the appointment before you attend.' },
    ],
  },
  {
    slug: 'light-commercial-fleet', title: 'Light Commercial Maintenance Enquiries', short: 'Vehicle-specific routine maintenance enquiries for work utes, vans and small business vehicles.', icon: 'truck', status: 'enquiry', photo: 'hoist',
    intro: 'Local tradespeople and small businesses can enquire about routine maintenance for eligible work vehicles at our Jimboomba workshop. Our initial focus is suitable oil and filter servicing, brake maintenance and basic inspections. Formal fleet programmes are a future opportunity as capacity increases.',
    includes: ['Eligible petrol and diesel oil-service enquiries', 'Vehicle-specific brake maintenance enquiries', 'Basic vehicle health-check enquiries', 'Discussion of service requirements and availability'],
    note: 'Vehicle acceptance depends on size, model, equipment, parts and the required work. Fleet agreements, priority scheduling and fleet rates are not currently confirmed.',
    seoTitle: 'Work Ute & Van Maintenance Jimboomba | Garuda Automotive', seoDescription: 'Enquire about routine servicing for eligible utes, vans and business vehicles in Jimboomba. Fleet plans and pricing remain subject to workshop capacity.',
    sections: [
      { title: 'Start with the vehicles you operate', paragraphs: ['Share the makes, models, years and number of vehicles, along with typical kilometres and upcoming maintenance needs. A small business fleet can have very different requirements from a single passenger vehicle, so we check each proposed job rather than promise a blanket service agreement.', 'Our initial service scope does not include heavy-vehicle repairs or every commercial model. Vehicle acceptance depends on the work, workshop equipment and parts availability. Diesel enquiries are assessed against engine oil and filter requirements.'] },
      { title: 'A practical conversation about maintenance', paragraphs: ['We welcome enquiries from local tradespeople, delivery operators and small companies in Jimboomba, Logan Village, Yarrabilba and nearby communities. Discuss preferred timing early so we can confirm what appointments are possible.', 'Fleet rates and ongoing agreements will be considered as workshop capacity develops. There is no guaranteed turnaround, priority booking, pickup service or towing arrangement. Additional repair work still requires a clear quote and approval.', approval] },
    ],
    questions: [
      { q: 'Can you service a work ute or van in Jimboomba?', a: 'We welcome routine maintenance enquiries for suitable vehicles. Send the make, model, year and work required so we can confirm equipment, parts and capability.' },
      { q: 'Do you have fixed fleet service rates?', a: 'No. Fleet pricing and ongoing agreements are not yet established. Initial requests are assessed by vehicle and job.' },
      { q: 'Is pickup or drop-off included for business vehicles?', a: 'No. Vehicle pickup, drop-off, towing and roadside assistance are not currently offered.' },
      { q: 'Can several company vehicles be booked together?', a: 'You can request this, but appointments depend on workshop capacity and the work required. There is no automatic multi-vehicle or priority booking guarantee.' },
    ],
  },
];
export const serviceTypeOptions = [...services.filter((s) => s.status === 'available').map((s) => s.title), 'Vehicle health inspection enquiry', 'Light commercial / future fleet enquiry', 'Other / not sure'];
export const faqs = (): Question[] => [
  { q: 'Where is Garuda Automotive located?', a: `Our workshop is at ${addressText()}. We welcome customers from Jimboomba, Yarrabilba, Flagstone, Logan Village and surrounding Logan communities.` },
  { q: 'Is Garuda Automotive now open?', a: isLive() ? 'Yes, the workshop is now open. Contact us to confirm service suitability and an appointment. Operating hours and weekend availability are still being finalised.' : 'Workshop opening and appointment availability are still being finalised. Contact us for current details.' },
  { q: 'What car services are available now?', a: 'Our initial focus is oil and filter changes, brake pad and rotor replacement, brake fluid work, basic vehicle health and tyre checks, and basic diagnostic or electrical fault detection. Vehicle suitability is checked before booking.' },
  { q: 'Can you service European cars and diesel vehicles?', a: 'We welcome Japanese, Korean, Australian and selected European vehicle enquiries, including BMW, Mercedes-Benz, Audi and Volkswagen. Petrol and basic diesel work depend on model, service requirements, parts and capability.' },
  { q: 'Do I receive a quote before additional repairs?', a: 'Yes. Additional repair work is quoted and needs your approval before it begins. Inspection or diagnostic charges are discussed in advance.' },
  { q: 'Are online booking requests confirmed immediately?', a: 'No. Raja checks the vehicle requirements, parts and workshop availability before confirming an appointment by phone, email or SMS.' },
  { q: 'Do you issue Queensland safety certificates?', a: 'No. We do not advertise safety certificate inspections or issue certificates unless the required Queensland Approved Inspection Station authorisation is obtained.' },
];
export const pageQuestions = {
  about: [faqs()[0] as Question, faqs()[2] as Question, { q: 'What is Garuda Automotive’s approach to servicing?', a: 'Our focus is affordable preventative maintenance, clear explanations and customer approval before additional repairs. We confirm the vehicle and job scope rather than promise every type of repair.' }, { q: 'Are there real workshop photos on this site?', a: 'Yes. The workshop and equipment photographs were supplied by the business. The looping home-page video is illustrative AI-generated footage, not a recording of our premises or staff.' }],
  mechanic: [{ q: 'Who is the Head Mechanic at Garuda Automotive?', a: 'M Raja is the Head Mechanic and initially manages booking enquiries and customer communication.' }, { q: 'What qualifications does Raja have?', a: 'His supplied profile includes a Bachelor of Technology in Mechanical Engineering from Hindustan University, India, Certificate III in Automotive (Light Vehicle Mechanical Technology), Certificate IV in Automotive and a Diploma in Automotive.' }, { q: 'Does prior Volvo or Penske experience mean manufacturer authorisation?', a: 'No. Those names describe previous employment experience only; they do not indicate a dealership relationship, partnership or manufacturer authorisation for Garuda Automotive.' }],
  booking: [faqs()[5] as Question, { q: 'What vehicle information should I provide?', a: 'Include make, model, year, registration, kilometres, service history where relevant, the work requested, warning-light details and preferred timing. Enter the odometer reading in the problem description.' }, { q: 'Can I request a same-day car service in Jimboomba?', a: 'You can ask, but same-day minor work depends on workshop availability, parts and job requirements. Call for time-sensitive requests; the form does not guarantee a same-day appointment.' }, { q: 'How do I request the $120 oil and filter offer?', a: 'Select Engine Oil & Filter Changes and mention the offer in your message. It includes GST and up to five litres of oil for suitable vehicles, through 31 January 2027, for the first five customers daily. We confirm eligibility and availability.' }],
  contact: [{ q: 'How do I contact the Jimboomba workshop?', a: 'Call +61 402 576 869 or send the website enquiry form. Our address is 9 Euphemia Street, Jimboomba QLD 4280.' }, { q: 'What are the opening hours and weekend arrangements?', a: 'Operating hours and weekend availability are still being finalised. Please call to confirm a suitable time before visiting; we do not publish proposed hours as confirmed hours.' }, { q: 'Do you offer roadside assistance, towing or vehicle collection?', a: 'No. Roadside assistance, towing and pickup or drop-off are not currently offered.' }, { q: 'Can I contact Garuda by business email?', a: 'A business email address is still being confirmed. Please use the telephone number or website enquiry form meanwhile.' }],
  fleet: [services[7]?.questions[0] as Question, { q: 'Is a fleet maintenance agreement available now?', a: 'Formal fleet programmes are a potential future service. You can enquire about individual eligible vehicles, with scope, prices and appointments confirmed separately.' }, { q: 'What details help with a small business vehicle enquiry?', a: 'Provide your business name, contact details, number of vehicles, makes and models, typical kilometres and maintenance needs. Raja will discuss whether the current workshop scope is suitable.' }],
  terms: [{ q: 'Does submitting the form confirm my appointment?', a: 'No. An appointment is confirmed only after Garuda contacts you to agree the details.' }, { q: 'Can repairs be added without my approval?', a: 'No. Additional repair work needs your approval after the proposed work and price are explained.' }, { q: 'Do these terms remove my consumer rights?', a: 'No. Nothing in these draft terms excludes applicable Australian Consumer Law rights.' }],
  privacy: [{ q: 'Who can see my booking enquiry?', a: 'Authorised Garuda staff can access enquiry records. Lovable Cloud provides the website’s storage and hosting services.' }, { q: 'How can I ask to correct my details?', a: 'Call the workshop or use the contact page to request access, correction or deletion, subject to applicable record-keeping requirements.' }, { q: 'Is marketing consent required to request a service?', a: 'No. The marketing checkbox is optional and unchecked by default. Consent to respond to and handle your service enquiry is separate.' }],
} satisfies Record<string, Question[]>;
export const launchChecklist = ['Confirmed operating hours and weekend availability', 'Business email address and verified sending domain for notifications', 'Final diagnostic, logbook and post-promotion prices', 'Confirmed payment methods and any deposit conditions', 'Workmanship warranty terms and legal review of policies', 'Uniform portrait and permission for any additional mechanic details', 'Digital inspection report process', 'Future service equipment and training before advertising new capabilities', 'Domain registration and genuine Google Business Profile / social links'];
