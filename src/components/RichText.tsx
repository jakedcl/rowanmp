import Image from "next/image";
import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { Reveal } from "@/components/Reveal";
import { urlFor } from "@/sanity/lib/image";

type Props = {
  value: PortableTextBlock[] | null | undefined;
  className?: string;
};

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <Reveal className="mt-12">
        <h2 className="text-sm font-bold uppercase tracking-[0.06em]">
          {children}
        </h2>
      </Reveal>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 text-base font-bold">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mt-4 text-[0.95rem] leading-relaxed first:mt-0">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l border-rule pl-4 text-[0.95rem] leading-relaxed text-muted italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 mb-2 list-disc space-y-2.5 pl-5 text-[0.95rem] leading-relaxed">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 mb-2 list-decimal space-y-2.5 pl-5 text-[0.95rem] leading-relaxed">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => {
      const href = value?.href || "#";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const alt = value.alt || "";
      const src = urlFor(value).width(1200).height(800).fit("max").url();
      return (
        <Reveal className="mt-10">
          <figure>
            <Image
              src={src}
              alt={alt}
              width={1200}
              height={800}
              className="rich-image h-auto w-full border border-rule"
            />
            {value.caption ? (
              <figcaption className="mt-2 text-[0.85rem] text-muted">
                {value.caption}
              </figcaption>
            ) : null}
          </figure>
        </Reveal>
      );
    },
  },
};

export function RichText({ value, className }: Props) {
  if (!value?.length) return null;
  return (
    <div className={`rich-text ${className ?? ""}`.trim()}>
      <PortableText value={value} components={components} />
    </div>
  );
}
