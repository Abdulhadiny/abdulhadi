import type { Project } from "@/lib/content";

const ArrowUpRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

export default function ProjectRow({ project, index }: { project: Project; index: number }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <article className="group border-t border-line py-8 md:py-10">
      <div className="grid gap-6 md:grid-cols-[3rem_1fr]">
        <div className="hidden font-mono text-sm text-faint md:block">{num}</div>

        <div>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{project.name}</h3>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-accent">{project.role}</span>
              {project.meta && (
                <>
                  <span className="text-line-strong">/</span>
                  <span className="text-faint">{project.meta}</span>
                </>
              )}
            </div>
          </div>

          <p className="mt-3 max-w-2xl text-[0.975rem] leading-relaxed text-muted">
            {project.summary}
          </p>

          <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-xs text-faint">
            {project.stack.map((s) => (
              <li key={s} className="before:mr-3 before:text-line-strong before:content-['·'] first:before:hidden">
                {s}
              </li>
            ))}
          </ul>

          {project.links && project.links.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-sm">
              {project.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1 text-fg"
                >
                  {l.label}
                  <ArrowUpRight />
                </a>
              ))}
            </div>
          )}

          {project.type === "case-study" && project.caseStudy && (
            <details className="group/cs mt-5">
              <summary className="inline-flex cursor-pointer items-center gap-2 font-mono text-sm text-fg">
                <span className="grid h-5 w-5 place-items-center rounded border border-line text-faint transition-colors group-open/cs:border-accent group-open/cs:text-accent">
                  <span className="block h-2.5 w-2.5 leading-none">
                    <span className="group-open/cs:hidden">+</span>
                    <span className="hidden group-open/cs:inline">−</span>
                  </span>
                </span>
                <span className="link-underline">Read case study</span>
              </summary>

              <div className="mt-6 space-y-6 border-l border-line pl-5 md:pl-7">
                <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted">
                  {project.caseStudy.context}
                </p>
                <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted">
                  <span className="font-mono text-xs uppercase tracking-wider text-faint">My role — </span>
                  {project.caseStudy.contribution}
                </p>

                <div className="space-y-5">
                  {project.caseStudy.highlights.map((h) => (
                    <div key={h.title} className="grid gap-1.5">
                      <h4 className="text-[0.95rem] font-semibold tracking-tight text-fg">{h.title}</h4>
                      <p className="max-w-2xl text-[0.925rem] leading-relaxed text-muted">{h.body}</p>
                    </div>
                  ))}
                </div>

                <p className="font-mono text-xs text-faint">
                  Code is client-owned and private — walkthrough available on request.
                </p>
              </div>
            </details>
          )}
        </div>
      </div>
    </article>
  );
}
