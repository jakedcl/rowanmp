import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { Reveal } from "@/components/Reveal";
import { SleeveDemo } from "@/components/SleeveDemo";
import { SleeveLink } from "@/components/SleeveLink";
import { urlFor } from "@/sanity/lib/image";

export type WallRecord = {
  _id: string;
  title: string;
  slug: string;
  summary?: string | null;
  sleeve?: (SanityImageSource & { alt?: string }) | null;
};

export type WallShelf = {
  _id: string;
  title: string;
  description?: string | null;
  records: WallRecord[];
};

type Props = {
  shelves: WallShelf[];
};

function hasSleeveAsset(
  sleeve: WallRecord["sleeve"],
): sleeve is SanityImageSource & { alt?: string } {
  return Boolean(
    sleeve &&
      typeof sleeve === "object" &&
      "asset" in sleeve &&
      sleeve.asset,
  );
}

function Sleeve({ record, demo = false }: { record: WallRecord; demo?: boolean }) {
  const sleeve = record.sleeve;
  const withPhoto = hasSleeveAsset(sleeve);
  const src = withPhoto
    ? urlFor(sleeve).width(640).height(640).fit("crop").url()
    : null;
  const alt =
    withPhoto && sleeve.alt && sleeve.alt !== record.title ? sleeve.alt : "";

  return (
    <SleeveLink href={`/records/${record.slug}`} demo={demo}>
      <span className="sleeve-stand">
        <span className="sleeve-disc" aria-hidden>
          <span className="sleeve-disc-label">
            {src ? (
              <Image src={src} alt="" fill className="object-cover" sizes="48px" />
            ) : null}
          </span>
        </span>
        <span className={`sleeve-face ${src ? "" : "sleeve-face-blank"}`.trim()}>
          {src ? (
            <Image
              src={src}
              alt={alt}
              width={640}
              height={640}
              className="h-full w-full object-cover"
              sizes="120px"
            />
          ) : (
            <span className="sleeve-blank" aria-hidden />
          )}
          <span className="sleeve-vignette">
            <span className="sleeve-name">{record.title}</span>
          </span>
        </span>
      </span>
    </SleeveLink>
  );
}

function ShelfBoard() {
  return (
    <div className="shelf-board" aria-hidden>
      <span className="shelf-bracket shelf-bracket-left" />
      <span className="shelf-bracket shelf-bracket-right" />
      <div className="shelf-top" />
      <div className="shelf-front" />
      <div className="shelf-cast" />
    </div>
  );
}

export function RecordWall({ shelves }: Props) {
  if (shelves.length === 0) {
    return (
      <div className="border border-rule bg-panel px-5 py-10 text-[0.95rem] leading-relaxed text-muted">
        <p className="font-bold text-foreground">The shelves are empty</p>
        <p className="mt-2">
          Open <Link href="/studio">Studio</Link> → Shelves to add a row, then Records
          to drop in sleeve photos.
        </p>
      </div>
    );
  }

  const demoId = shelves.find((shelf) => shelf.records.length > 0)?.records[0]?._id;

  return (
    <section className="record-wall" aria-label="Record shelves">
      <SleeveDemo />
      {shelves.map((shelf, shelfIndex) => (
        <Reveal key={shelf._id} className="shelf" delayMs={shelfIndex * 70}>
          <div className="shelf-heading">
            <h2 className="shelf-title">{shelf.title}</h2>
            {shelf.description ? (
              <p className="shelf-desc">{shelf.description}</p>
            ) : null}
          </div>

          <div
            className={`shelf-bay ${shelf.records.length === 0 ? "shelf-bay-empty" : ""}`.trim()}
          >
            {shelf.records.length === 0 ? (
              <p className="shelf-empty-note">No records on this shelf yet.</p>
            ) : (
              <div className="shelf-row">
                {shelf.records.map((record) => (
                  <Sleeve key={record._id} record={record} demo={record._id === demoId} />
                ))}
              </div>
            )}
            <ShelfBoard />
          </div>
        </Reveal>
      ))}
    </section>
  );
}
