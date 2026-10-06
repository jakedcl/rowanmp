import Image from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { SiteShell } from "@/components/SiteShell";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type SiteSettings = {
  name?: string | null;
  tagline?: string | null;
  email?: string | null;
  cvUrl?: string | null;
  portrait?: (SanityImageSource & { alt?: string }) | null;
};

export default async function ContactPage() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const settings = data as SiteSettings | null;

  const name = settings?.name ?? "Rowan Mentley-Peters";
  const tagline =
    settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta";
  const email = settings?.email ?? "mentrs635@oneonta.edu";
  const portraitSrc = settings?.portrait
    ? urlFor(settings.portrait).width(720).height(900).fit("crop").url()
    : null;

  return (
    <SiteShell
      name={name}
      tagline={tagline}
      email={email}
      cvUrl={settings?.cvUrl}
      active="contact"
    >
      <main>
        <h1 className="section-label">Contact</h1>

        <div className="mt-8 grid gap-10 sm:grid-cols-[11rem_1fr] sm:gap-12">
          <div className="portrait-frame relative aspect-[4/5] w-full max-w-[11rem] overflow-hidden border border-rule bg-panel">
            {portraitSrc ? (
              <Image
                src={portraitSrc}
                alt={settings?.portrait?.alt || name}
                fill
                className="object-cover"
                sizes="11rem"
                priority
              />
            ) : (
              <div className="flex h-full flex-col justify-end p-3 text-[0.7rem] leading-snug text-muted">
                Portrait
                <br />
                forthcoming
              </div>
            )}
          </div>

          <dl className="space-y-4 text-[0.95rem] leading-relaxed">
            <div>
              <dt className="text-[0.8rem] font-bold uppercase tracking-[0.06em] text-muted">
                Email
              </dt>
              <dd className="mt-1">
                <a href={`mailto:${email}`}>{email}</a>
              </dd>
            </div>
            <div>
              <dt className="text-[0.8rem] font-bold uppercase tracking-[0.06em] text-muted">
                Affiliation
              </dt>
              <dd className="mt-1">Biology Department, SUNY Oneonta</dd>
            </div>
            <div>
              <dt className="text-[0.8rem] font-bold uppercase tracking-[0.06em] text-muted">
                Location
              </dt>
              <dd className="mt-1">Oneonta / Cooperstown, New York</dd>
            </div>
            {settings?.cvUrl ? (
              <div>
                <dt className="text-[0.8rem] font-bold uppercase tracking-[0.06em] text-muted">
                  CV
                </dt>
                <dd className="mt-1">
                  <a
                    href={settings.cvUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download PDF
                  </a>
                </dd>
              </div>
            ) : (
              <div>
                <dt className="text-[0.8rem] font-bold uppercase tracking-[0.06em] text-muted">
                  CV
                </dt>
                <dd className="mt-1 text-muted">
                  Upload a CV in Studio → Home page when ready.
                </dd>
              </div>
            )}
          </dl>
        </div>
      </main>
    </SiteShell>
  );
}
