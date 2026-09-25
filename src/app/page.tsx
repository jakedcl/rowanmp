import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type SiteSettings = {
  name?: string | null;
  tagline?: string | null;
  email?: string | null;
};

export default async function HomePage() {
  const { data } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
  });
  const settings = data as SiteSettings | null;

  const name = settings?.name ?? "Rowan Mentley-Peters";
  const tagline =
    settings?.tagline ??
    "Freshwater mussel researcher and Rescue Diver. Genetics below the surface of New York's rivers.";
  const email = settings?.email ?? "mentrs635@oneonta.edu";

  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#1f3328_0%,transparent_55%),radial-gradient(ellipse_at_90%_80%,#15241c_0%,transparent_45%),linear-gradient(180deg,#0e1412_0%,#0a100e_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.04)_3px)]"
      />

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <p className="text-sm tracking-[0.08em] uppercase text-muted">
          Mentley-Peters
        </p>
        <nav className="flex gap-6 text-sm text-muted">
          <Link href="/studio" className="transition hover:text-foreground">
            Studio
          </Link>
          <a href={`mailto:${email}`} className="transition hover:text-foreground">
            Contact
          </a>
        </nav>
      </header>

      <section className="relative z-10 flex flex-1 flex-col justify-end px-6 pb-16 pt-24 md:px-10 md:pb-20">
        <h1 className="max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-foreground">
          {name}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          {tagline}
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={`mailto:${email}`}
            className="bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:bg-accent hover:text-foreground"
          >
            Email Rowan
          </a>
          <Link
            href="/studio"
            className="border border-muted/40 px-5 py-3 text-sm text-muted transition hover:border-foreground hover:text-foreground"
          >
            Open Studio
          </Link>
        </div>
      </section>
    </main>
  );
}
