import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { Reveal } from "@/components/Reveal";
import { urlFor } from "@/sanity/lib/image";

export type WallRecord = {
  _id: string;
  title: string;
  slug: string;
  summary?: string | null;
  sleeve: SanityImageSource & { alt?: string };
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

function Sleeve({ record }: { record: WallRecord }) {
  const src = urlFor(record.sleeve).width(600).height(600).fit("crop").url();
  const alt = record.sleeve.alt || record.title;

  return (
    <Link
      href={`/records/${record.slug}`}
      className="sleeve group"
      aria-label={record.title}
    >
      <span className="sleeve-face">
        <Image
          src={src}
          alt={alt}
          width={600}
          height={600}
          className="h-full w-full object-cover"
          sizes="(max-width: 640px) 42vw, (max-width: 1024px) 22vw, 160px"
        />
      </span>
      <span className="sleeve-caption">{record.title}</span>
    </Link>
  );
}

export function RecordWall({ shelves }: Props) {
  if (shelves.length === 0) {
    return (
      <div className="wall-empty border border-rule bg-panel px-5 py-10 text-[0.95rem] leading-relaxed text-muted">
        <p className="font-bold text-foreground">The wall is empty</p>
        <p className="mt-2">
          Open <a href="/studio">Studio</a> → Shelves to add a row, then Records
          to drop in sleeve photos.
        </p>
      </div>
    );
  }

  return (
    <section className="record-wall" aria-label="Record wall">
      <div className="wall-frame">
        {shelves.map((shelf, shelfIndex) => (
          <Reveal key={shelf._id} className="shelf" delayMs={shelfIndex * 70}>
            <div className="shelf-heading">
              <h2 className="shelf-title">{shelf.title}</h2>
              {shelf.description ? (
                <p className="shelf-desc">{shelf.description}</p>
              ) : null}
            </div>

            {shelf.records.length === 0 ? (
              <div className="shelf-bay shelf-bay-empty">
                <div className="shelf-grid" aria-hidden />
                <div className="shelf-ledge" />
                <p className="shelf-empty-note">No sleeves yet — add a record in Studio</p>
              </div>
            ) : (
              <div className="shelf-bay">
                <div className="shelf-grid">
                  {shelf.records.map((record) => (
                    <Sleeve key={record._id} record={record} />
                  ))}
                </div>
                <div className="shelf-ledge" aria-hidden />
              </div>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
