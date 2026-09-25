import type { PortableTextBlock } from "@portabletext/react";
import { SiteHeader } from "@/components/SiteHeader";
import { RichText } from "@/components/RichText";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type SiteSettings = {
  name?: string | null;
  tagline?: string | null;
  email?: string | null;
  cvUrl?: string | null;
  page?: PortableTextBlock[] | null;
};

export default async function HomePage() {
  const { data } = await sanityFetch({
    query: SITE_SETTINGS_QUERY,
  });
  const settings = data as SiteSettings | null;

  const name = settings?.name ?? "Rowan Mentley-Peters";
  const tagline =
    settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta";
  const email = settings?.email ?? "mentrs635@oneonta.edu";
  const page = settings?.page;

  return (
    <div className="min-h-svh">
      <div className="mx-auto w-full max-w-[42rem] px-5 py-10 sm:px-6 sm:py-14">
        <SiteHeader
          name={name}
          tagline={tagline}
          email={email}
          cvUrl={settings?.cvUrl}
        />

        <main className="py-10">
          {page?.length ? (
            <RichText value={page} />
          ) : (
            <div className="border border-rule bg-[#ebe8e0]/px-5 py-8 text-[0.95rem] leading-relaxed text-muted">
              <p className="font-bold text-foreground">Home page is empty</p>
              <p className="mt-2">
                Open{" "}
                <a href="/studio">Studio</a> → Home page, and write in the big
                editor. You can add text, headings, and images.
              </p>
            </div>
          )}
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
