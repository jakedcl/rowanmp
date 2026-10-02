import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Reveal } from "@/components/Reveal";
import { SiteShell } from "@/components/SiteShell";
import { RichText } from "@/components/RichText";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_BY_SLUG_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type SiteSettings = {
  name?: string | null;
  tagline?: string | null;
};

type Post = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  summary?: string | null;
  coverImage?: (SanityImageSource & { alt?: string }) | null;
  body?: PortableTextBlock[] | null;
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

function coverUrl(image: Post["coverImage"]) {
  if (!image || typeof image !== "object" || !("asset" in image) || !image.asset) {
    return null;
  }
  return urlFor(image).width(1600).height(1000).fit("max").url();
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });
  const post = data as Post | null;
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} — Rowan Mentley-Peters`,
    description: post.summary ?? undefined,
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  const [{ data: settingsData }, { data: postData }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({
      query: POST_BY_SLUG_QUERY,
      params: { slug },
    }),
  ]);

  const settings = settingsData as SiteSettings | null;
  const post = postData as Post | null;

  if (!post) notFound();

  const name = settings?.name ?? "Rowan Mentley-Peters";
  const coverSrc = coverUrl(post.coverImage);

  return (
    <SiteShell
      name={name}
      tagline={settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta"}
      active="posts"
    >
      <main>
        <Link href="/posts" className="back-link">
          Back to Posts
        </Link>

        <h1 className="page-title mt-8 max-w-3xl">{post.title}</h1>
        <p className="mt-3 text-[0.95rem] text-muted">
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>

        <Reveal className="mt-8">
          <div className="relative aspect-[16/9] overflow-hidden bg-placeholder">
            {coverSrc ? (
              <Image
                src={coverSrc}
                alt={post.coverImage?.alt || post.title}
                fill
                className="rich-image object-cover"
                sizes="(max-width: 1152px) 100vw, 72rem"
                priority
              />
            ) : (
              <PhotoPlaceholder note="Post cover" />
            )}
          </div>
        </Reveal>

        {post.summary ? (
          <p className="mt-8 max-w-2xl text-[1.08rem] leading-relaxed text-muted">
            {post.summary}
          </p>
        ) : null}

        {post.body?.length ? (
          <div className="mt-6 max-w-2xl">
            <RichText value={post.body} />
          </div>
        ) : (
          <p className="mt-8 text-[0.95rem] text-muted">
            This post has no body yet.
          </p>
        )}
      </main>
    </SiteShell>
  );
}
