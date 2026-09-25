import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type SiteSettings = {
  name?: string | null;
  email?: string | null;
  cvUrl?: string | null;
};

const NAV = [
  { href: "#about", label: "About" },
  { href: "#research", label: "Research" },
  { href: "#publications", label: "Publications" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

const INTERESTS = [
  "Genetic divergence of freshwater mussels across natural and artificial geographic barriers",
  "Genomic variation associated with alternative life-history strategies in American shad",
  "Non-lethal DNA collection and reduced-representation sequencing of freshwater bivalves",
  "Regulatory and conservation surveys of freshwater pearly mussels in New York watersheds",
];

const EDUCATION = [
  {
    school: "State University of New York at Oneonta",
    degree: "Master of Science, Biology",
    when: "Fall 2026",
    note: "Thesis: Genetic divergence of Eastern Elliptio populations by natural and artificial geographic barriers",
  },
  {
    school: "State University of New York at Oneonta",
    degree: "Bachelor of Science, Biology",
    when: "August 2025",
    note: "Capstone: Genetic variation in association with alternative migratory strategies in East Coast American shad",
  },
];

const PUBLICATIONS = [
  {
    citation:
      "R. Mentley-Peters, M. Best, D. Stich, and V.A. Sotola. Genomic variation of alternative life histories of East Coast American Shad populations. In prep, Ecology and Evolution.",
  },
  {
    citation:
      "R. Mentley-Peters, P.H. Lord, V.A. Sotola. Genetic divergence of Eastern Elliptio by geographic barriers in New York State Watersheds. In prep, Freshwater Biology.",
  },
];

const EXPERIENCE = [
  {
    org: "SUNY Oneonta",
    role: "Graduate Research Assistant",
    when: "Aug 2025 – Present",
    detail:
      "Point of contact for freshwater mussel projects with the Research Foundation; DNA extraction, library prep, Linux/R genomic analysis.",
  },
  {
    org: "Western Pennsylvania Conservancy",
    role: "Freshwater Mussel Researcher",
    when: "May – Dec 2025",
    detail:
      "Led survey teams in Susquehanna tributaries; species presence, habitat, and anthropogenic disturbance.",
  },
  {
    org: "United States Geological Survey",
    role: "DNA Field Collection",
    when: "May – Sept 2025",
    detail:
      "Non-lethal swabbing for Lampsilis cariosa genetic study, Susquehanna River Watershed.",
  },
  {
    org: "Catskill Watershed Steward Program",
    role: "Assistant Coordinator",
    when: "Jan 2025 – Present",
    detail:
      "Training, outreach, inventory; SCUBA collection and identification of aquatic invasive species.",
  },
];

export default async function HomePage() {
  const { data } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
  });
  const settings = data as SiteSettings | null;

  const name = settings?.name ?? "Rowan Mentley-Peters";
  const email = settings?.email ?? "mentrs635@oneonta.edu";
  const cvUrl = settings?.cvUrl ?? null;

  return (
    <div className="min-h-svh">
      <div className="mx-auto w-full max-w-[42rem] px-5 py-10 sm:px-6 sm:py-14">
        <header className="border-b border-rule pb-8">
          <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight sm:text-[2rem]">
            {name}
          </h1>
          <p className="mt-2 text-[0.95rem] leading-snug text-muted">
            M.S. Student, Biology
            <span className="mx-2 text-rule" aria-hidden>
              ·
            </span>
            SUNY Oneonta
          </p>
          <p className="mt-1 text-[0.95rem] leading-snug text-muted">
            PADI Rescue Diver
            <span className="mx-2 text-rule" aria-hidden>
              ·
            </span>
            Freshwater mussel researcher
          </p>

          <nav
            className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[0.9rem]"
            aria-label="Page"
          >
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="no-underline hover:underline">
                {item.label}
              </a>
            ))}
            {cvUrl ? (
              <a href={cvUrl} className="no-underline hover:underline" target="_blank" rel="noreferrer">
                CV
              </a>
            ) : (
              <span className="text-muted" title="Upload a CV in Studio → Site Settings">
                CV
              </span>
            )}
          </nav>
        </header>

        <main className="divide-y divide-rule">
          <section id="about" className="scroll-mt-8 py-10">
            <div className="grid gap-8 sm:grid-cols-[9.5rem_1fr] sm:gap-10">
              <div
                className="aspect-[4/5] w-full max-w-[9.5rem] border border-rule bg-[#ebe8e0]"
                role="img"
                aria-label="Portrait placeholder"
              >
                <div className="flex h-full items-end p-2 text-[0.65rem] leading-tight text-muted">
                  Portrait
                  <br />
                  forthcoming
                </div>
              </div>
              <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground">
                <p>
                  I am a graduate student in Biology at SUNY Oneonta studying
                  genetic structure in freshwater mussels and fishes across New
                  York watersheds. My work combines field surveys, SCUBA, and
                  laboratory genomics.
                </p>
                <p>
                  Current thesis research examines how natural and artificial
                  geographic barriers shape divergence in Eastern Elliptio (
                  <em>Elliptio complanata</em>). I also work on genomic
                  variation linked to alternative migratory strategies in East
                  Coast American shad.
                </p>
              </div>
            </div>
          </section>

          <section id="research" className="scroll-mt-8 py-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.06em] text-foreground">
              Research interests
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[0.95rem] leading-relaxed">
              {INTERESTS.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className="mt-10 text-sm font-bold uppercase tracking-[0.06em]">
              Education
            </h2>
            <ul className="mt-4 space-y-5 text-[0.95rem] leading-relaxed">
              {EDUCATION.map((item) => (
                <li key={item.degree + item.when}>
                  <p className="font-bold">{item.degree}</p>
                  <p className="text-muted">
                    {item.school}
                    <span className="mx-2 text-rule" aria-hidden>
                      ·
                    </span>
                    {item.when}
                  </p>
                  <p className="mt-1">{item.note}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="publications" className="scroll-mt-8 py-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.06em]">
              Publications
            </h2>
            <p className="mt-1 text-[0.85rem] text-muted">In preparation</p>
            <ol className="mt-4 list-decimal space-y-4 pl-5 text-[0.95rem] leading-relaxed">
              {PUBLICATIONS.map((pub) => (
                <li key={pub.citation}>{pub.citation}</li>
              ))}
            </ol>
          </section>

          <section id="experience" className="scroll-mt-8 py-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.06em]">
              Selected experience
            </h2>
            <ul className="mt-4 space-y-5 text-[0.95rem] leading-relaxed">
              {EXPERIENCE.map((item) => (
                <li key={item.org + item.role}>
                  <p>
                    <span className="font-bold">{item.role}</span>
                    <span className="text-muted">
                      {", "}
                      {item.org}
                    </span>
                  </p>
                  <p className="text-[0.85rem] text-muted">{item.when}</p>
                  <p className="mt-1">{item.detail}</p>
                </li>
              ))}
            </ul>
          </section>

          <section id="contact" className="scroll-mt-8 py-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.06em]">
              Contact
            </h2>
            <dl className="mt-4 space-y-2 text-[0.95rem] leading-relaxed">
              <div className="flex flex-wrap gap-x-3">
                <dt className="text-muted">Email</dt>
                <dd>
                  <a href={`mailto:${email}`}>{email}</a>
                </dd>
              </div>
              <div className="flex flex-wrap gap-x-3">
                <dt className="text-muted">Affiliation</dt>
                <dd>Biology Department, SUNY Oneonta</dd>
              </div>
              <div className="flex flex-wrap gap-x-3">
                <dt className="text-muted">Location</dt>
                <dd>Oneonta / Cooperstown, New York</dd>
              </div>
            </dl>
          </section>
        </main>

        <footer className="border-t border-rule pt-6 text-[0.8rem] text-muted">
          <p>
            © {new Date().getFullYear()} {name}
          </p>
        </footer>
      </div>
    </div>
  );
}
