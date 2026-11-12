import { Wrench, Gauge, Disc3, Zap, Search, CircleDot, Truck, ShieldCheck, Users } from "lucide-react";
const map = { wrench: Wrench, gauge: Gauge, disc: Disc3, zap: Zap, search: Search, circle: CircleDot, truck: Truck, shield: ShieldCheck, users: Users };
export type IconName = keyof typeof map;
export function ServiceIcon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  const I = map[name];
  return <I className={className} aria-hidden="true" />;
}
