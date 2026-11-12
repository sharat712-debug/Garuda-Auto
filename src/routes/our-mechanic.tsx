import { createFileRoute } from "@tanstack/react-router";
import { UserRound } from "lucide-react";
import { seo } from "@/lib/seo";
import { FinalCta, PageHero } from "@/components/site/Sections";

export const Route = createFileRoute("/our-mechanic")({
  head: () => seo("Our Mechanic — Merugu Raja Subramanyam | Garuda Automotives", "Meet Raja, Light Vehicle Mechanic & Automotive Specialist at Garuda Automotives, with qualifications in automotive technology and mechanical engineering.", "/our-mechanic", "profile"),
  component: Mechanic,
});

const skills = ["Vehicle diagnostics", "Routine servicing", "Brakes", "Suspension components", "Automotive electrical systems", "Technical inspection", "Commercial vehicle mechanical work"];
const quals = [
  { t: "Certificate III, Certificate IV & Diploma in Automotive Technology (Light Vehicle)", s: "Skills Institute Australia" },
  { t: "Bachelor of Mechanical Engineering", s: "Hindustan University" },
];
const roles = [
  { t: "Light Vehicle Mechanic", s: "Speedauto Australia" },
  { t: "Truck and light vehicle-related systems", s: "Volvo Trucks" },
  { t: "Assembly and mechanical work", s: "Penske Commercial Vehicles" },
  { t: "Truck Mechanic", s: "MK Mechanical" },
];

function Mechanic() {
  return (
    <>
      <PageHero eyebrow="Our mechanic" title="Meet Merugu Raja Subramanyam.">
        <p className="font-display text-foreground">Light Vehicle Mechanic & Automotive Specialist.</p>
      </PageHero>
      <section className="py-16">
        <div className="container-site grid gap-12 lg:grid-cols-[320px_1fr]">
          <div>
            <div className="flex aspect-[4/5] items-center justify-center rounded-xl border border-border bg-card text-steel" role="img" aria-label="Portrait coming soon">
              <UserRound className="h-28 w-28" aria-hidden="true" />
            </div>
            <p className="mt-2 text-xs text-steel">Portrait coming soon</p>
          </div>
          <div className="space-y-12">
            <p className="text-lg text-muted-foreground">With experience across light vehicle maintenance and commercial-vehicle mechanical work, Raja's background includes vehicle diagnostics, routine servicing, brake and suspension work, automotive electrical systems and technical inspection. His experience at Australian automotive workshops and vehicle manufacturers informs a systematic approach to mechanical problems. His academic background includes qualifications in automotive technology and mechanical engineering.</p>
            <div>
              <h2 className="text-2xl font-bold">Skills</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {skills.map((s) => <li key={s} className="rounded-full border border-input bg-card px-4 py-2 text-sm">{s}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Qualifications</h2>
              <ol className="mt-5 space-y-4 border-l-2 border-primary/40 pl-6">
                {quals.map((q) => <li key={q.t} className="relative"><span aria-hidden="true" className="absolute -left-[31px] top-1.5 h-3 w-3 -skew-x-12 bg-primary" /><p className="font-semibold">{q.t}</p><p className="text-sm text-muted-foreground">{q.s}</p></li>)}
              </ol>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Previous roles</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {roles.map((r) => <li key={r.s} className="rounded-lg border border-border bg-card p-4"><p className="font-semibold">{r.s}</p><p className="text-sm text-muted-foreground">{r.t}</p></li>)}
              </ul>
              <p className="mt-4 text-xs text-steel">Previous employment only — not brand partnerships or manufacturer authorisations.</p>
            </div>
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
