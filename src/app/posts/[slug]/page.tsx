import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import { Reveal } from "@/components/Reveal";
import { SiteShell } from "@/components/SiteShell";
import { RichText } from "@/components/RichText";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  POST_BY_SLUG_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";

type SiteSettings = {
  name?: string | null;
  tagline?: string | null;
  email?: string | null;
  cvUrl?: string | null;
  portrait?: (SanityImageSource & { alt?: string }) | null;
};

type Post = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  summary?: string | null;
  coverImage?: {
    alt?: string;
    asset?: unknown;
  } | null;
  body?: PortableTextBlock[] | null;
};

const CATEGORY_LABEL: Record<string, string> = {
  announcement: "Announcement",
  publication: "Publication",
  project: "Project",
  talk: "Talk",
  other: "Other",
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
  const coverSrc = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1200).height(800).fit("max").url()
    : null;

  return (
    <SiteShell
      name={name}
      tagline={settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta"}
      email={settings?.email ?? "mentrs635@oneonta.edu"}
      cvUrl={settings?.cvUrl}
      portrait={settings?.portrait}
      active="posts"
    >
      <main>
        <p className="text-[0.85rem]">
          <Link href="/posts" className="no-underline hover:underline">
            ← Posts
          </Link>
        </p>

        <p className="mt-6 text-[0.8rem] uppercase tracking-[0.04em] text-muted">
          {CATEGORY_LABEL[post.category] ?? post.category}
          <span className="mx-2 text-rule" aria-hidden>
            ·
          </span>
          {formatDate(post.publishedAt)}
        </p>

        <h1 className="mt-2 text-[1.75rem] font-bold leading-tight tracking-tight sm:text-[2rem]">
          {post.title}
        </h1>

        {post.summary ? (
          <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
            {post.summary}
          </p>
        ) : null}

        {coverSrc ? (
          <Reveal className="mt-8">
            <Image
              src={coverSrc}
              alt={post.coverImage?.alt || post.title}
              width={1200}
              height={800}
              className="rich-image h-auto w-full border border-rule"
              priority
            />
          </Reveal>
        ) : null}

        {post.body?.length ? (
          <div className="mt-8">
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
