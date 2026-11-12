/**
 * GARUDA AUTOMOTIVES — CENTRAL BUSINESS CONFIGURATION
 * Edit this file to update business details. Any value left as null is hidden on the site.
 * Never enter unverified details. Switch `mode` to "live" only once address, hours, phone,
 * services and opening date are confirmed.
 */
export type LaunchMode = "prelaunch" | "live";

export const business = {
  mode: "prelaunch" as LaunchMode,
  name: "Garuda Automotives",
  region: "Gold Coast, Queensland",
  // Verified business contact details only — never the mechanic's personal CV details.
  phone: null as string | null, // e.g. "07 5555 0000"
  phoneHref: null as string | null, // e.g. "+61755550000"
  email: null as string | null,
  address: null as null | { street: string; suburb: string; state: "QLD"; postcode: string },
  abn: null as string | null,
  openingDate: null as string | null,
  openingHours: null as null | { days: string; hours: string }[],
  mapEmbedUrl: null as string | null,
  social: { facebook: null as string | null, instagram: null as string | null },
  safetyCertificatesApproved: false, // set true only after AIS + examiner approvals confirmed
  mechanicConsentGiven: false, // set true once Raja approves his name/CV details being shown
  emailNotificationsConfigured: false,
};

export const isLive = () => business.mode === "live";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: "wrench" | "gauge" | "disc" | "zap" | "search" | "circle" | "truck";
  intro: string;
  includes: string[];
  note?: string;
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "logbook-servicing",
    title: "General & Logbook Servicing",
    short: "Routine maintenance, fluids, filters and scheduled servicing tailored to your vehicle's needs.",
    icon: "wrench",
    intro:
      "Regular servicing helps keep your vehicle reliable and can help identify wear before it becomes a bigger problem. We'll follow your vehicle's service schedule where applicable and talk you through anything we find.",
    includes: ["Scheduled and logbook-style servicing", "Oil, filter and fluid changes", "General safety and wear checks", "Clear notes on recommended future work"],
    note: "Tell us your make, model and year so we can confirm the service suits your vehicle.",
    seoTitle: "Car & Logbook Servicing Gold Coast | Garuda Automotives",
    seoDescription: "Enquire about general and logbook-style car servicing on the Gold Coast with Garuda Automotives — clear explanations before work proceeds.",
  },
  {
    slug: "vehicle-diagnostics",
    title: "Engine Diagnostics & Fault Finding",
    short: "Investigating warning lights, performance issues and hard-to-trace faults.",
    icon: "gauge",
    intro:
      "A dashboard warning light or an engine that doesn't feel right can have many causes. Our approach is methodical: gather symptoms, test systematically and explain what we find before recommending repairs.",
    includes: ["Warning light investigation", "Rough running, hesitation and power loss", "Intermittent and hard-to-trace faults", "Plain-English findings and options"],
    note: "Some faults need inspection time before an accurate quote can be given.",
    seoTitle: "Car Diagnostics & Fault Finding Gold Coast | Garuda Automotives",
    seoDescription: "Warning light on? Enquire about engine diagnostics and fault finding at Garuda Automotives, a new Gold Coast workshop.",
  },
  {
    slug: "brakes-suspension",
    title: "Brakes, Steering & Suspension",
    short: "Inspection and repair of key safety and handling components.",
    icon: "disc",
    intro:
      "Brakes, steering and suspension affect how safely your vehicle stops, turns and handles. Noises, vibrations or a change in feel are worth checking early.",
    includes: ["Brake pad, rotor and system inspection", "Steering component checks", "Shock absorbers, bushes and suspension parts", "Noise and vibration investigation"],
    seoTitle: "Brake, Steering & Suspension Repairs Gold Coast | Garuda Automotives",
    seoDescription: "Enquire about brake, steering and suspension inspection and repairs on the Gold Coast with Garuda Automotives.",
  },
  {
    slug: "automotive-electrical",
    title: "Automotive Electrical",
    short: "Fault diagnosis and repair of vehicle electrical systems.",
    icon: "zap",
    intro:
      "Modern vehicles rely heavily on electrical systems. From starting and charging problems to lighting and wiring faults, we'll investigate the cause and explain the fix.",
    includes: ["Battery, starting and charging checks", "Lighting and wiring faults", "Electrical fault diagnosis", "Accessory and component issues"],
    seoTitle: "Auto Electrical Repairs Gold Coast | Garuda Automotives",
    seoDescription: "Enquire about automotive electrical fault diagnosis and repair at Garuda Automotives on the Gold Coast.",
  },
  {
    slug: "pre-purchase-inspections",
    title: "Pre-Purchase Inspections",
    short: "A closer look at a used vehicle before you commit to buying.",
    icon: "search",
    intro:
      "Buying a used car is a big decision. A pre-purchase inspection gives you an independent look at the vehicle's mechanical condition so you can decide with more confidence.",
    includes: ["Mechanical condition check", "Visible wear, leaks and damage", "Road-test observations where possible", "A clear summary of findings"],
    note: "A pre-purchase inspection is not a Queensland safety certificate.",
    seoTitle: "Pre-Purchase Car Inspections Gold Coast | Garuda Automotives",
    seoDescription: "Thinking of buying a used car? Enquire about a pre-purchase vehicle inspection with Garuda Automotives on the Gold Coast.",
  },
  {
    slug: "tyres-wheels",
    title: "Tyres & Wheel Services",
    short: "Enquire about tyre, wheel and related maintenance needs.",
    icon: "circle",
    intro:
      "Tell us what you need for your tyres and wheels. We'll confirm what we can offer for your vehicle — including availability of fitting, balancing and alignment — before you book.",
    includes: ["Tyre condition and wear checks", "Tyre and wheel enquiries", "Related maintenance advice"],
    note: "Fitting, balancing and alignment availability will be confirmed directly.",
    seoTitle: "Tyre & Wheel Services Gold Coast | Garuda Automotives",
    seoDescription: "Enquire about tyre and wheel services with Garuda Automotives on the Gold Coast. Availability confirmed before booking.",
  },
  {
    slug: "light-commercial-fleet",
    title: "Light Commercial & Fleet",
    short: "Maintenance and repairs for work vans, utes and eligible light-commercial vehicles.",
    icon: "truck",
    intro:
      "Work vehicles need to stay on the road. We welcome enquiries for servicing and repairs on vans, utes and eligible light-commercial vehicles, as well as small business fleets.",
    includes: ["Van and ute servicing", "Light-commercial repairs", "Enquiry-led fleet maintenance", "Practical scheduling discussions"],
    seoTitle: "Light Commercial & Fleet Servicing Gold Coast | Garuda Automotives",
    seoDescription: "Enquire about servicing and repairs for vans, utes and small business fleets with Garuda Automotives on the Gold Coast.",
  },
];

export const serviceTypeOptions = [
  ...services.map((s) => s.title),
  "Fleet Servicing",
  "Queensland Safety Certificate (enquiry only)",
  "Other / not sure",
];

export const faqs = () => [
  { q: "Do you work on all car makes and models?", a: "Tell us your make, model and year. We'll confirm whether we can assist with your specific vehicle and service." },
  { q: "Can you service European vehicles?", a: "We welcome enquiries for European and premium vehicles and will confirm compatibility and scope before booking." },
  { q: "Can you give me a quote?", a: "Share the vehicle details and symptoms. Some work may require inspection or diagnostics before an accurate quote can be provided." },
  { q: "Are booking requests confirmed immediately?", a: "No. We'll contact you to confirm availability and the recommended next step." },
  {
    q: "Do you offer Queensland safety certificates?",
    a: business.safetyCertificatesApproved
      ? "Yes — contact us for details of our Approved Inspection Station."
      : "We're reviewing this service as part of workshop setup. Safety certificates can only be issued by a Queensland Approved Inspection Station with appropriately approved examiners. Contact us for current status.",
  },
  {
    q: "Where are you located?",
    a:
      isLive() && business.address
        ? `${business.address.street}, ${business.address.suburb} ${business.address.state} ${business.address.postcode}.`
        : "Our Gold Coast workshop details will be announced as opening approaches.",
  },
  { q: "Do you offer fleet servicing?", a: "Yes, we're welcoming enquiries from small businesses and light-commercial fleet operators. Tell us what vehicles you operate and what support you need." },
];

/** Items that must be confirmed before switching to live mode. */
export const launchChecklist = [
  "Business phone number",
  "Business email address",
  "Workshop street address and suburb",
  "ABN",
  "Opening date and opening hours",
  "Vehicle makes / equipment capability",
  "Tyre fitting, balancing and alignment availability",
  "Insurance and warranty policies",
  "AIS / examiner approvals (safety certificates)",
  "Raja's consent to show his name, qualifications and photo",
  "Real workshop and staff photos",
  "Verified sending domain for email notifications",
  "Legal review of Privacy Policy and Terms",
  "Domain name and Google Business Profile",
];
