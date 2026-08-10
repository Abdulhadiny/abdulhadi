import ThemeToggle from "@/components/ThemeToggle";
import ProjectRow from "@/components/ProjectRow";
import { profile, intro, projects, differentiators, skills } from "@/lib/content";

/* Small section eyebrow: a monospace index + label. */
function Eyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-8 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-faint">
      <span className="text-accent">{index}</span>
      <span>{children}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

const nav = [
  { href: "#work", label: "Work" },
  { href: "#expertise", label: "Expertise" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Home() {
  const delay = (i: number) => ({ animationDelay: `${i * 90}ms` });

  return (
    <div className="min-h-screen">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-mono text-sm font-medium tracking-tight">
            {profile.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </a>
          <nav className="hidden items-center gap-7 font-mono text-xs text-muted sm:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="link-underline transition-colors hover:text-fg">
                {n.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </header>

      <main id="top" className="mx-auto max-w-5xl px-6">
        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="pb-20 pt-20 md:pb-28 md:pt-28">
          <p className="reveal mb-6 flex items-center gap-2.5 font-mono text-xs text-muted" style={delay(0)}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </p>

          <h1
            className="reveal max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.02em] sm:text-5xl md:text-6xl"
            style={delay(1)}
          >
            {profile.name}
          </h1>

          <p className="reveal mt-4 font-mono text-base text-accent md:text-lg" style={delay(2)}>
            {profile.role}
          </p>

          <p className="reveal mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl" style={delay(3)}>
            {profile.tagline}
          </p>

          <div className="reveal mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-sm" style={delay(4)}>
            <a href={`mailto:${profile.email}`} className="link-underline">
              {profile.email}
            </a>
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="link-underline text-muted transition-colors hover:text-fg">
                GitHub
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline text-muted transition-colors hover:text-fg">
                LinkedIn
              </a>
            )}
            {profile.location && <span className="text-faint">{profile.location}</span>}
          </div>
        </section>

        {/* ── Intro ─────────────────────────────────────────────────────────── */}
        <section className="border-t border-line py-14 md:py-16">
          <p className="max-w-3xl text-lg leading-relaxed text-fg/90 md:text-xl">{intro}</p>
        </section>

        {/* ── Work ──────────────────────────────────────────────────────────── */}
        <section id="work" className="pt-14 md:pt-20">
          <Eyebrow index="01">Selected Work</Eyebrow>
          <div>
            {projects.map((p, i) => (
              <ProjectRow key={p.name} project={p} index={i} />
            ))}
            <div className="border-t border-line" />
          </div>
        </section>

        {/* ── Expertise ─────────────────────────────────────────────────────── */}
        <section id="expertise" className="pt-16 md:pt-24">
          <Eyebrow index="02">What I Bring</Eyebrow>
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {differentiators.map((d) => (
              <div key={d.title} className="bg-surface p-6 md:p-7">
                <h3 className="text-base font-semibold tracking-tight">{d.title}</h3>
                <p className="mt-2 text-[0.925rem] leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Skills ────────────────────────────────────────────────────────── */}
        <section id="skills" className="pt-16 md:pt-24">
          <Eyebrow index="03">Technical Skills</Eyebrow>
          <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {skills.map((s) => (
              <div key={s.group} className="grid gap-3 border-t border-line pt-4">
                <dt className="font-mono text-xs uppercase tracking-wider text-faint">{s.group}</dt>
                <dd className="flex flex-wrap gap-x-2 gap-y-2">
                  {s.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-line px-2.5 py-1 text-sm text-fg/85 transition-colors hover:border-line-strong"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ── Contact ───────────────────────────────────────────────────────── */}
        <section id="contact" className="py-20 md:py-28">
          <Eyebrow index="04">Get in Touch</Eyebrow>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight tracking-[-0.02em] md:text-4xl">
            Have a role or a problem worth solving?
          </h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
            I&rsquo;m {profile.availability.toLowerCase().replace(/^open/, "open")}. The fastest way to reach me is email.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-8 inline-flex items-center gap-3 rounded-lg bg-fg px-6 py-3.5 font-mono text-sm text-bg transition-transform hover:-translate-y-0.5"
          >
            {profile.email}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-8 font-mono text-xs text-faint">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <div className="flex items-center gap-5">
            <a href={`mailto:${profile.email}`} className="transition-colors hover:text-fg">
              Email
            </a>
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
                GitHub
              </a>
            )}
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-fg">
                LinkedIn
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
