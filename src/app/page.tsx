import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import Image from "next/image";
import Link from "next/link";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { RecordWall, type WallShelf } from "@/components/RecordWall";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@/components/RichText";
import { SiteShell } from "@/components/SiteShell";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  SHELVES_WITH_RECORDS_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";

type SiteSettings = {
  name?: string | null;
  tagline?: string | null;
  email?: string | null;
  cvUrl?: string | null;
  portrait?: (SanityImageSource & { alt?: string }) | null;
  page?: PortableTextBlock[] | null;
};

function hasAsset(image: SiteSettings["portrait"]): image is NonNullable<
  SiteSettings["portrait"]
> {
  return Boolean(
    image && typeof image === "object" && "asset" in image && image.asset,
  );
}

function splitAbout(blocks: PortableTextBlock[]) {
  const heading = blocks.findIndex(
    (block) => block._type === "block" && block.style === "h2",
  );
  if (heading <= 0) {
    return { intro: blocks, rest: [] as PortableTextBlock[] };
  }
  return {
    intro: blocks.slice(0, heading),
    rest: blocks.slice(heading),
  };
}

export default async function HomePage() {
  const [{ data: settingsData }, { data: shelvesData }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: SHELVES_WITH_RECORDS_QUERY }),
  ]);

  const settings = settingsData as SiteSettings | null;
  const shelves = (shelvesData as WallShelf[] | null) ?? [];
  const name = settings?.name ?? "Rowan Mentley-Peters";
  const tagline = settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta";
  const page = settings?.page;
  const { intro, rest } = page?.length
    ? splitAbout(page)
    : { intro: [], rest: [] };
  const portrait = hasAsset(settings?.portrait) ? settings.portrait : null;
  const portraitSrc = portrait
    ? urlFor(portrait).width(1400).height(900).fit("crop").url()
    : null;

  return (
    <SiteShell name={name} tagline={tagline} active="home">
      <main>
        <RecordWall shelves={shelves} />

        <section className="mt-16 sm:mt-20" aria-labelledby="about-heading">
          <h2 id="about-heading" className="section-label">
            About
          </h2>
          <div className="mt-6 grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="relative aspect-[16/10] overflow-hidden bg-placeholder">
              {portraitSrc ? (
                <Image
                  src={portraitSrc}
                  alt={portrait?.alt || name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              ) : (
                <PhotoPlaceholder note="Field portrait" />
              )}
            </div>
            <div>
              {intro.length ? (
                <RichText value={intro} />
              ) : (
                <div className="border border-rule bg-panel px-5 py-8 text-[0.95rem] leading-relaxed text-muted">
                  <p className="font-bold text-foreground">About is empty</p>
                  <p className="mt-2">
                    Open <Link href="/studio">Studio</Link> → Home page to write
                    a short bio under the shelves.
                  </p>
                </div>
              )}
            </div>
          </div>
          {rest.length ? (
            <Reveal className="mt-12 max-w-3xl">
              <RichText value={rest} />
            </Reveal>
          ) : null}
        </section>
      </main>
    </SiteShell>
  );
}
