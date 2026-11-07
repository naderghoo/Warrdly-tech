import Link from "next/link";
import { Forward } from "./Icon";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`text-[15px] font-semibold ${light ? "text-gold" : "text-plum"}`}>{children}</span>;
}

export function SectionHead({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`flex max-w-[680px] flex-col gap-3 ${center ? "mx-auto items-center text-center" : ""}`}>
      <span className="accent-line" aria-hidden="true" />
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-balance text-3xl font-bold leading-snug text-ink sm:text-[40px]">{title}</h2>
      {subtitle && <p className="text-lg text-muted">{subtitle}</p>}
    </div>
  );
}

export function PrimaryButton({
  href,
  children,
  arrow = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  arrow?: boolean;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-xl bg-plum px-7 text-[17px] font-semibold text-white transition-colors hover:bg-plum-dark ${className}`}
    >
      {children}
      {arrow && <Forward />}
    </Link>
  );
}

export function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-[52px] items-center justify-center rounded-xl border-[1.5px] border-line-2 bg-white/60 backdrop-blur px-7 text-[17px] font-semibold text-ink transition-colors hover:border-plum"
    >
      {children}
    </Link>
  );
}

export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1.5 font-semibold text-plum hover:text-plum-dark">
      {children}
      <Forward size={16} />
    </Link>
  );
}
