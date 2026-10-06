import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import Link from "next/link";
import { RecordWall, type WallShelf } from "@/components/RecordWall";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@/components/RichText";
import { SiteShell } from "@/components/SiteShell";
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

  return (
    <SiteShell
      name={name}
      tagline={tagline}
      email={email}
      cvUrl={settings?.cvUrl}
      active="home"
    >
      <main>
        <RecordWall shelves={shelves} />

        <section className="mt-14 border-t border-rule pt-10">
          <h2 className="section-label">About</h2>
          <div className="mt-6">
            {page?.length ? (
              <RichText value={page} />
            ) : (
              <div className="border border-rule bg-panel px-5 py-8 text-[0.95rem] leading-relaxed text-muted">
                <p className="font-bold text-foreground">About is empty</p>
                <p className="mt-2">
                  Open <Link href="/studio">Studio</Link> → Home page to write a short
                  bio under the wall.
                </p>
              </div>
            )}
          </div>
        </section>

        {recent.length > 0 ? (
          <Reveal className="mt-14">
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
