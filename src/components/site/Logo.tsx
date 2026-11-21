import logo from "@/assets/garuda-logo.jpeg.asset.json";
import { Link } from "@tanstack/react-router";

export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <Link to="/" aria-label="Garuda Automotive home" className="inline-flex shrink-0 items-center">
      <img src={logo.url} alt="Garuda Automotive" className={`${className} w-auto object-contain mix-blend-multiply`} width={476} height={154} />
    </Link>
  );
}
