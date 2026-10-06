import type { PortableTextBlock } from "@portabletext/react";
import type { SanityImageSource } from "@sanity/image-url";
import Link from "next/link";
import { RecordWall, type WallShelf } from "@/components/RecordWall";
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
  publishedAt: string;
};

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

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
        <div className="home-split">
          <div className="home-wall">
            <RecordWall shelves={shelves} />
          </div>

          {recent.length > 0 ? (
            <aside className="home-rail" aria-label="Recent posts">
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h2 className="section-label">Latest</h2>
                <Link href="/posts" className="text-[0.8rem] no-underline hover:underline">
                  All posts
                </Link>
              </div>
              <ul>
                {recent.map((post) => (
                  <li key={post._id}>
                    <Link href={`/posts/${post.slug}`} className="home-post">
                      <span className="home-post-date">{formatDate(post.publishedAt)}</span>
                      <span className="home-post-title">{post.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          ) : null}
        </div>

        <section className="mt-10 border-t border-rule pt-8">
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
      </main>
    </SiteShell>
  );
}
