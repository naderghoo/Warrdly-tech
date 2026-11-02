import Link from "next/link";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// not-found pages don't receive route params, so show both languages
export default function NotFound() {
  return (
    <section className="bg-white">
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-5 px-5 py-28 text-center">
        <span className="text-6xl font-bold text-plum">404</span>
        <h1 className="text-3xl font-bold">{ar.notFound.title}</h1>
        <p className="text-lg text-muted">{ar.notFound.text}</p>
        <p lang="en" dir="ltr" className="text-base text-muted-2">
          {en.notFound.title} — {en.notFound.text}
        </p>
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Link href="/ar" className="inline-flex min-h-[48px] items-center rounded-xl bg-plum px-6 font-semibold text-white hover:bg-plum-dark">
            {ar.notFound.home}
          </Link>
          <Link href="/en" lang="en" className="inline-flex min-h-[48px] items-center rounded-xl border-[1.5px] border-line-2 px-6 font-semibold text-ink hover:border-plum">
            {en.notFound.home}
          </Link>
        </div>
      </div>
    </section>
  );
}
