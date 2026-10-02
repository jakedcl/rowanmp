import Image from "next/image";
import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { SiteShell } from "@/components/SiteShell";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Contact — Rowan Mentley-Peters",
  description: "Email Rowan Mentley-Peters at SUNY Oneonta.",
};

type SiteSettings = {
  name?: string | null;
  tagline?: string | null;
  email?: string | null;
  contactImage?: (SanityImageSource & { alt?: string }) | null;
};

function imageUrl(image: SiteSettings["contactImage"]) {
  if (!image || typeof image !== "object" || !("asset" in image) || !image.asset) {
    return null;
  }
  return urlFor(image).width(1200).height(1600).fit("crop").url();
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path
        d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default async function ContactPage() {
  const { data } = await sanityFetch({ query: SITE_SETTINGS_QUERY });
  const settings = data as SiteSettings | null;

  const name = settings?.name ?? "Rowan Mentley-Peters";
  const tagline = settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta";
  const email = settings?.email ?? "mentrs635@oneonta.edu";
  const photo = settings?.contactImage;
  const photoSrc = imageUrl(photo);

  return (
    <SiteShell name={name} tagline={tagline} active="contact">
      <main>
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col justify-center py-2">
            <h1 className="page-title">Contact</h1>
            <p className="mt-4 max-w-md text-[1.05rem] leading-relaxed">
              M.S. student in Biology at SUNY Oneonta.
            </p>
            <ul className="mt-8 space-y-4 text-[0.98rem]">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="inline-flex items-center gap-3 no-underline hover:underline"
                >
                  <MailIcon />
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <PinIcon />
                <span>Oneonta / Cooperstown, New York</span>
              </li>
            </ul>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden bg-placeholder lg:aspect-auto lg:min-h-[34rem]">
            {photoSrc ? (
              <Image
                src={photoSrc}
                alt={photo?.alt || "Contact photo"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            ) : (
              <PhotoPlaceholder note="River photo" />
            )}
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
