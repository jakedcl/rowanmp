"use client";

import Image, { type ImageProps } from "next/image";
import sanityImageLoader from "@/lib/sanityImageLoader";

function isSanityCdnSrc(src: ImageProps["src"]): boolean {
  return typeof src === "string" && src.startsWith("https://cdn.sanity.io/");
}

export function SanityImage({ src, alt, ...rest }: ImageProps) {
  if (isSanityCdnSrc(src)) {
    return (
      <Image src={src} alt={alt} {...rest} loader={sanityImageLoader} />
    );
  }
  return <Image src={src} alt={alt} {...rest} />;
}
