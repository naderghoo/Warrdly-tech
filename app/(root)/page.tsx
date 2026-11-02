import { redirect } from "next/navigation";

// "/" → Arabic homepage (works in every host, including previews that ignore next.config redirects)
export default function RootPage() {
  redirect("/ar");
}
