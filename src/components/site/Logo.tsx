import { Link } from "@tanstack/react-router";

export function Logo({ className = "h-10" }: { className?: string }) {
  return (
    <Link to="/" aria-label="Garuda Automotive home" className="inline-flex shrink-0 items-center">
      <img src="/garuda-logo.png" alt="Garuda Automotive" className={`${className} w-auto object-contain`} width={1980} height={672} />
    </Link>
  );
}
