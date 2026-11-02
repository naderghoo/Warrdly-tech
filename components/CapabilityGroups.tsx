import type { Capabilities } from "@/content/capabilities";
import { Icon } from "./Icon";
import { Container } from "./ui";

type Group = Capabilities["integrations"]["groups"][number];

export function GroupNav({ groups }: { groups: Group[] }) {
  return (
    <nav aria-label="sections" className="flex flex-wrap gap-2.5">
      {groups.map((g) => (
        <a
          key={g.id}
          href={`#${g.id}`}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-full glass-dark px-4 text-[15px] font-medium text-white hover:bg-white/10"
        >
          <Icon name={g.icon} size={18} stroke={1.8} className="text-lilac" />
          {g.title}
        </a>
      ))}
    </nav>
  );
}

export function CapabilityGroups({ groups }: { groups: Group[] }) {
  return (
    <>
      {groups.map((g, gi) => (
        <section key={g.id} id={g.id} className={`scroll-mt-24 ${gi % 2 === 0 ? "bg-transparent" : "bg-transparent"}`}>
          <Container className="flex flex-col gap-10 py-20">
            <div className="flex items-start gap-4">
              <span className="flex h-14 w-14 flex-none items-center justify-center rounded-2xl bg-tint text-plum">
                <Icon name={g.icon} size={28} stroke={1.8} />
              </span>
              <div className="flex flex-col gap-1.5">
                <h2 className="text-2xl font-bold sm:text-3xl">{g.title}</h2>
                <p className="text-lg text-muted">{g.text}</p>
              </div>
            </div>
            <div className={`grid grid-cols-1 gap-5 md:grid-cols-2 ${g.items.length % 3 === 0 ? "lg:grid-cols-3" : ""}`}>
              {g.items.map((it) => (
                <article key={it.key} className="flex flex-col gap-4 rounded-2xl glass p-7">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-xl font-bold">{it.name}</h3>
                    <span dir="ltr" className="rounded-full bg-tint px-3 py-1 text-[12px] font-semibold text-plum-dark">
                      {it.tag}
                    </span>
                  </div>
                  <p className="text-base text-muted">{it.text}</p>
                  <ul className="flex flex-col gap-2.5 border-t border-line pt-4 text-[15px]">
                    {it.features.map((f) => (
                      <li key={f} className="flex gap-2.5">
                        <Icon name="check" size={18} stroke={2.4} className="mt-1 flex-none text-plum" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
