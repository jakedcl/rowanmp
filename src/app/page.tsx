import Image from "next/image";
import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import Link from "next/link";
import { RecordWall, type WallShelf } from "@/components/RecordWall";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@/components/RichText";
import { ScrollSwoop } from "@/components/ScrollSwoop";
import { SiteShell } from "@/components/SiteShell";
import { StudyRoom } from "@/components/StudyRoom";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  RECENT_POSTS_QUERY,
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

type RecentPost = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
};

const CATEGORY_LABEL: Record<string, string> = {
  announcement: "Announcement",
  publication: "Publication",
  project: "Project",
  talk: "Talk",
  other: "Other",
};

export default async function HomePage() {
  const [
    { data: settingsData },
    { data: shelvesData },
    { data: recentData },
  ] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: SHELVES_WITH_RECORDS_QUERY }),
    sanityFetch({ query: RECENT_POSTS_QUERY }),
  ]);

  const settings = settingsData as SiteSettings | null;
  const shelves = (shelvesData as WallShelf[] | null) ?? [];
  const recent = (recentData as RecentPost[] | null) ?? [];

  const name = settings?.name ?? "Rowan Mentley-Peters";
  const tagline =
    settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta";
  const email = settings?.email ?? "mentrs635@oneonta.edu";
  const page = settings?.page;
  const portraitSrc = settings?.portrait
    ? urlFor(settings.portrait).width(960).height(720).fit("crop").url()
    : null;

  return (
    <SiteShell
      name={name}
      tagline={tagline}
      email={email}
      cvUrl={settings?.cvUrl}
      active="home"
      wide
    >
      <main>
        <StudyRoom>
          <RecordWall shelves={shelves} hideCaptions />
        </StudyRoom>

        <p className="study-scroll-hint">
          <a href="#about" className="no-underline hover:underline">
            Scroll for about ↓
          </a>
        </p>

        <ScrollSwoop id="about" className="mt-6 sm:mt-10">
          <div className="about-panel">
            <h2 className="section-label">About</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,18rem)_1fr] md:gap-10 lg:grid-cols-[minmax(0,22rem)_1fr]">
              <div className="about-photo relative aspect-[4/3] w-full overflow-hidden border border-rule bg-panel">
                {portraitSrc ? (
                  <Image
                    src={portraitSrc}
                    alt={settings?.portrait?.alt || name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 22rem"
                  />
                ) : (
                  <div className="flex h-full items-end p-4 text-[0.8rem] leading-snug text-muted">
                    Add a portrait in Studio → Home page
                    <br />
                    (shown here and on Contact)
                  </div>
                )}
              </div>
              <div className="min-w-0 about-copy">
                {page?.length ? (
                  <RichText value={page} />
                ) : (
                  <div className="border border-rule bg-panel px-5 py-8 text-[0.95rem] leading-relaxed text-muted">
                    <p className="font-bold text-foreground">About is empty</p>
                    <p className="mt-2">
                      Open <a href="/studio">Studio</a> → Home page to write a
                      short bio under the wall.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollSwoop>

        {recent.length > 0 ? (
          <Reveal className="mt-16">
            <div className="border-t border-rule pt-10">
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="section-label">Recent posts</h2>
                <Link
                  href="/posts"
                  className="text-[0.85rem] no-underline hover:underline"
                >
                  All posts →
                </Link>
              </div>
              <ul className="mt-5 divide-y divide-rule border-y border-rule">
                {recent.map((post) => (
                  <li key={post._id}>
                    <Link
                      href={`/posts/${post.slug}`}
                      className="post-row group grid grid-cols-[4.5rem_1fr] gap-4 py-4 text-foreground no-underline sm:grid-cols-[5.5rem_1fr]"
                    >
                      <span className="pt-0.5 text-[0.8rem] tabular-nums text-muted">
                        {post.publishedAt.slice(0, 4)}
                      </span>
                      <span>
                        <span className="block text-[0.75rem] uppercase tracking-[0.05em] text-muted">
                          {CATEGORY_LABEL[post.category] ?? post.category}
                        </span>
                        <span className="post-title mt-1 block text-[1.02rem] font-bold leading-snug">
                          {post.title}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}
      </main>
    </SiteShell>
  );
}
