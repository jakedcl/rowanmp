import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@/components/RichText";
import { SiteShell } from "@/components/SiteShell";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { RECORD_BY_SLUG_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";

type SiteSettings = {
  name?: string | null;
  tagline?: string | null;
};

type RecordDoc = {
  _id: string;
  title: string;
  slug: string;
  summary?: string | null;
  sleeve?: (SanityImageSource & { alt?: string }) | null;
  body?: PortableTextBlock[] | null;
  shelf?: { _id: string; title: string } | null;
  relatedPost?: { title: string; slug: string } | null;
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

function sleeveUrl(image: RecordDoc["sleeve"]) {
  if (!image || typeof image !== "object" || !("asset" in image) || !image.asset) {
    return null;
  }
  return urlFor(image).width(1200).height(1200).fit("crop").url();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await sanityFetch({
    query: RECORD_BY_SLUG_QUERY,
    params: { slug },
    stega: false,
  });
  const record = data as RecordDoc | null;
  if (!record) return { title: "Record not found" };

  const src = sleeveUrl(record.sleeve);
  return {
    title: `${record.title} — Rowan Mentley-Peters`,
    description: record.summary ?? undefined,
    openGraph: src
      ? { title: record.title, description: record.summary ?? undefined, images: [{ url: src }] }
      : undefined,
  };
}

export default async function RecordPage({ params }: PageProps) {
  const { slug } = await params;

  const [{ data: settingsData }, { data: recordData }] = await Promise.all([
    sanityFetch({ query: SITE_SETTINGS_QUERY }),
    sanityFetch({
      query: RECORD_BY_SLUG_QUERY,
      params: { slug },
    }),
  ]);

  const settings = settingsData as SiteSettings | null;
  const record = recordData as RecordDoc | null;
  if (!record) notFound();

  const name = settings?.name ?? "Rowan Mentley-Peters";
  const src = sleeveUrl(record.sleeve);

  return (
    <SiteShell
      name={name}
      tagline={settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta"}
      active="record"
    >
      <main>
        <p className="text-[0.9rem]">
          <Link href="/" className="back-link">
            Back to Home
          </Link>
          {record.shelf ? (
            <span className="text-muted">
              <span className="mx-2" aria-hidden>
                ·
              </span>
              {record.shelf.title}
            </span>
          ) : null}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,18rem)_1fr] lg:gap-12">
          <Reveal>
            <div className="relative aspect-square w-full max-w-[18rem] overflow-hidden bg-placeholder">
              {src ? (
                <Image
                  src={src}
                  alt={record.sleeve?.alt || record.title}
                  fill
                  className="object-cover"
                  sizes="18rem"
                  priority
                />
              ) : (
                <PhotoPlaceholder />
              )}
            </div>
          </Reveal>

          <div className="min-w-0">
            <h1 className="page-title">{record.title}</h1>
            {record.summary ? (
              <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-muted">
                {record.summary}
              </p>
            ) : null}

            {record.body?.length ? (
              <div className="mt-8 max-w-2xl">
                <RichText value={record.body} />
              </div>
            ) : (
              <p className="mt-8 text-[0.95rem] text-muted">
                No write-up yet — add a body in Studio → Records.
              </p>
            )}

            {record.relatedPost?.slug ? (
              <p className="mt-8 text-[0.95rem]">
                <Link href={`/posts/${record.relatedPost.slug}`}>
                  Related post: {record.relatedPost.title}
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
