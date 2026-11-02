import { site } from "@/content/site";

export function WhatsAppFloat({ label }: { label: string }) {
  if (!site.whatsapp) return null;
  return (
    <a
      href={`https://wa.me/${site.whatsapp}`}
      aria-label={label}
      className="fixed bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#1F8F4E] text-white shadow-lg transition-transform hover:scale-105 ltr:right-5 rtl:left-5"
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 20l1.3-3.9A8 8 0 1 1 8 19.1L4 20z" />
        <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 1c-1-.5-1.5-1-2-2l1-1-1-2L9 9.5z" />
      </svg>
    </a>
  );
}
