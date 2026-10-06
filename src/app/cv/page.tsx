import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Curriculum Vitae — Rowan Mentley-Peters",
  description:
    "Curriculum vitae for Rowan Mentley-Peters, M.S. student in Biology at SUNY Oneonta.",
};

type SiteSettings = {
  name?: string | null;
  tagline?: string | null;
  email?: string | null;
  cvUrl?: string | null;
};

export default async function CvPage() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const settings = data as SiteSettings | null;
  const name = settings?.name ?? "Rowan Mentley-Peters";
  const tagline = settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta";
  const email = settings?.email ?? "mentrs635@oneonta.edu";

  return (
    <SiteShell
      name={name}
      tagline={tagline}
      email={email}
      cvUrl={settings?.cvUrl}
      active="cv"
    >
      <main>
        <h1 className="section-label">CV</h1>
        <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted">
          Curriculum vitae for {name}, M.S. student in Biology at SUNY Oneonta.
        </p>

        {settings?.cvUrl ? (
          <p className="mt-6 text-[0.95rem]">
            <a href={settings.cvUrl} target="_blank" rel="noreferrer">
              Download PDF
            </a>
          </p>
        ) : (
          <div className="mt-8 max-w-md border border-rule bg-panel px-5 py-8 text-[0.95rem] leading-relaxed text-muted">
            <p className="font-bold text-foreground">CV not uploaded yet</p>
            <p className="mt-2">
              Add a PDF in <Link href="/studio">Studio</Link> → Home page.
            </p>
          </div>
        )}
      </main>
    </SiteShell>
  );
}
