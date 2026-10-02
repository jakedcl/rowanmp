import Image from "next/image";
import Link from "next/link";
import type { SanityImageSource } from "@sanity/image-url";
import { PhotoPlaceholder } from "@/components/PhotoPlaceholder";
import { Reveal } from "@/components/Reveal";
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

function hasImageAsset(
  image: WallRecord["sleeve"],
): image is SanityImageSource & { alt?: string } {
  return Boolean(
    image && typeof image === "object" && "asset" in image && image.asset,
  );
}

function Album({ record }: { record: WallRecord }) {
  const sleeve = record.sleeve;
  const withPhoto = hasImageAsset(sleeve);
  const src = withPhoto
    ? urlFor(sleeve).width(800).height(800).fit("crop").url()
    : null;
  const alt = (withPhoto ? sleeve.alt : undefined) || record.title;

  return (
    <Link href={`/records/${record.slug}`} className="album" aria-label={record.title}>
      <span className="album-face">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 30vw, 16vw"
          />
        ) : (
          <PhotoPlaceholder />
        )}
        <span className="album-caption">{record.title}</span>
      </span>
    </Link>
  );
}

function ShelfBar() {
  return <div className="shelf-bar" aria-hidden />;
}

export function RecordWall({ shelves }: Props) {
  if (shelves.length === 0) {
    return (
      <div className="border border-rule bg-panel px-5 py-10 text-[0.95rem] leading-relaxed text-muted">
        <p className="font-bold text-foreground">The shelves are empty</p>
        <p className="mt-2">
          Open <Link href="/studio">Studio</Link> → Shelves to add a row, then
          Records to place photos on it.
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Shelves">
      {shelves.map((shelf, shelfIndex) => (
        <Reveal key={shelf._id} className="shelf" delayMs={shelfIndex * 60}>
          <h2 className="section-label shelf-label">{shelf.title}</h2>
          {shelf.records.length === 0 ? (
            <div className="shelf-bay">
              <p className="shelf-empty">No albums on this shelf yet.</p>
              <ShelfBar />
            </div>
          ) : (
            <div className="shelf-bay">
              <div className="shelf-grid">
                {shelf.records.map((record) => (
                  <Album key={record._id} record={record} />
                ))}
              </div>
              <ShelfBar />
            </div>
          )}
        </Reveal>
      ))}
    </section>
  );
}
