const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3528.5614592104403!2d153.0306905!3d-27.823266599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b913bde8854bdf7%3A0xc005b7b85c30d0ab!2sGaruda%20Automotive!5e0!3m2!1sen!2sin!4v1795263862567!5m2!1sen!2sin";

export function GoogleMapEmbed({ className = "h-72" }: { className?: string }) {
  return (
    <iframe
      src={MAP_EMBED_URL}
      title="Garuda Automotive workshop location on Google Maps"
      className={`w-full rounded-lg border border-border ${className}`}
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="strict-origin-when-cross-origin"
    />
  );
}
