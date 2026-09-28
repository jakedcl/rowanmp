import Image from "next/image";
import Link from "next/link";
import type { PortableTextBlock } from "@portabletext/react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { SanityImageSource } from "@sanity/image-url";
import { Reveal } from "@/components/Reveal";
import { RichText } from "@/components/RichText";
import { SiteShell } from "@/components/SiteShell";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import {
  RECORD_BY_SLUG_QUERY,
  SITE_SETTINGS_QUERY,
} from "@/sanity/lib/queries";

type SiteSettings = {
  name?: string | null;
  tagline?: string | null;
  email?: string | null;
  cvUrl?: string | null;
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

  const images = record.sleeve
    ? [
        {
          url: urlFor(record.sleeve).width(1200).height(1200).fit("crop").url(),
        },
      ]
    : undefined;

  return {
    title: `${record.title} — Rowan Mentley-Peters`,
    description: record.summary ?? undefined,
    openGraph: {
      title: record.title,
      description: record.summary ?? undefined,
      images,
    },
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
  const sleeveSrc = record.sleeve
    ? urlFor(record.sleeve).width(900).height(900).fit("crop").url()
    : null;

  return (
    <SiteShell
      name={name}
      tagline={settings?.tagline ?? "M.S. Student, Biology · SUNY Oneonta"}
      email={settings?.email ?? "mentrs635@oneonta.edu"}
      cvUrl={settings?.cvUrl}
      active="record"
    >
      <main>
        <p className="text-[0.85rem]">
          <Link href="/" className="no-underline hover:underline">
            ← Wall
          </Link>
          {record.shelf ? (
            <span className="text-muted">
              <span className="mx-2 text-rule" aria-hidden>
                ·
              </span>
              {record.shelf.title}
            </span>
          ) : null}
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-10 lg:grid-cols-[minmax(0,16rem)_1fr]">
          {sleeveSrc ? (
            <Reveal>
              <div className="record-hero-sleeve relative aspect-square w-full max-w-[16rem] overflow-hidden bg-panel">
                <Image
                  src={sleeveSrc}
                  alt={record.sleeve?.alt || record.title}
                  fill
                  className="object-cover"
                  sizes="16rem"
                  priority
                />
              </div>
            </Reveal>
          ) : (
            <div className="aspect-square w-full max-w-[16rem] border border-rule bg-panel p-4 text-[0.85rem] text-muted">
              Sleeve forthcoming
            </div>
          )}

          <div className="min-w-0">
            <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight sm:text-[2rem]">
              {record.title}
            </h1>
            {record.summary ? (
              <p className="mt-4 text-[1.05rem] leading-relaxed text-muted">
                {record.summary}
              </p>
            ) : null}

            {record.body?.length ? (
              <div className="mt-8">
                <RichText value={record.body} />
              </div>
            ) : (
              <p className="mt-8 text-[0.95rem] text-muted">
                No write-up yet — add a body in Studio → Records.
              </p>
            )}

            {record.relatedPost?.slug ? (
              <p className="mt-8 text-[0.95rem]">
                <Link
                  href={`/posts/${record.relatedPost.slug}`}
                  className="no-underline hover:underline"
                >
                  Related post: {record.relatedPost.title} →
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
