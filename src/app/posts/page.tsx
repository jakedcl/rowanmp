import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Reveal } from "@/components/Reveal";
import { SiteShell } from "@/components/SiteShell";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { POSTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type SiteSettings = {
  name?: string | null;
  tagline?: string | null;
};

type PostListItem = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  summary?: string | null;
  coverImage?: (SanityImageSource & { alt?: string }) | null;
};

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function coverUrl(image: PostListItem["coverImage"]) {
  if (!image || typeof image !== "object" || !("asset" in image) || !image.asset) {
    return null;
  }
  return urlFor(image).width(1200).height(800).fit("crop").url();
}

export default async function PostsPage() {
  const [{ data: settingsData }, { data: postsData }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({ query: POSTS_QUERY }),
  ]);

  const settings = settingsData as SiteSettings | null;
  const posts = (postsData as PostListItem[] | null) ?? [];
  const name = settings?.name ?? "Rowan Mentley-Peters";

  return (
    <SiteShell
      name={name}
      tagline={settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta"}
      active="posts"
    >
      <main>
        <h1 className="page-title">Posts</h1>
        <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-muted">
          Publications, projects, talks, and announcements.
        </p>

        {posts.length === 0 ? (
          <div className="mt-8 border border-rule bg-panel px-5 py-8 text-[0.95rem] leading-relaxed text-muted">
            <p className="font-bold text-foreground">No posts yet</p>
            <p className="mt-2">
              Add one in <Link href="/studio">Studio</Link> → Posts.
            </p>
          </div>
        ) : (
          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => {
              const src = coverUrl(post.coverImage);
              return (
                <Reveal key={post._id} as="li" delayMs={index * 40}>
                  <Link href={`/posts/${post.slug}`} className="post-card">
                    <span className="post-card-media">
                      {src ? (
                        <Image
                          src={src}
                          alt={post.coverImage?.alt || post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <PhotoPlaceholder />
                      )}
                    </span>
                    <span className="post-card-title">{post.title}</span>
                    <time className="post-card-date" dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        )}
      </main>
    </SiteShell>
  );
}
