import type { Metadata } from "next";
import Link from "next/link";
import { Fern } from "@/components/Fern";
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
  cvUrl?: string | null;
};

export default async function CvPage() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const settings = data as SiteSettings | null;
  const name = settings?.name ?? "Rowan Mentley-Peters";
  const tagline = settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta";

  return (
    <SiteShell name={name} tagline={tagline} active="cv">
      <main>
        <div className="relative min-h-[32rem]">
          <h1 className="page-title">Curriculum Vitae</h1>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed">
            Research, field surveys, and education for {name}, M.S. student in
            Biology at SUNY Oneonta.
          </p>

          {settings?.cvUrl ? (
            <a
              href={settings.cvUrl}
              className="cv-button"
              target="_blank"
              rel="noreferrer"
            >
              <DownloadIcon />
              Download CV (PDF)
            </a>
          ) : (
            <div className="mt-8 max-w-md border border-rule bg-panel px-5 py-8 text-[0.95rem] leading-relaxed text-muted">
              <p className="font-bold text-foreground">CV not uploaded yet</p>
              <p className="mt-2">
                Add a PDF in <Link href="/studio">Studio</Link> → Home page.
              </p>
            </div>
          )}

          <Fern className="pointer-events-none absolute right-0 bottom-0 w-36 translate-x-2 translate-y-4 sm:w-52" />
        </div>
      </main>
    </SiteShell>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M12 4v11m0 0l-4-4m4 4l4-4M5 20h14"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
