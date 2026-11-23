import { notFound } from "next/navigation";

// Any unknown path under /ar or /en (e.g. /ar/old-page) renders the bilingual
// [locale]/not-found.tsx inside the site layout, instead of the bare default 404.
export default function CatchAll() {
  notFound();
}
