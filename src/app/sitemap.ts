import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import {
  POST_SLUGS_QUERY,
  RECORD_SLUGS_QUERY,
} from "@/sanity/lib/queries";

const baseUrl = "https://rowanmp.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, records] = await Promise.all([
    client.fetch(POST_SLUGS_QUERY),
    client.fetch(RECORD_SLUGS_QUERY),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/posts`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/cv`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const postRoutes: MetadataRoute.Sitemap = (posts ?? [])
    .filter((post) => post.slug)
    .map((post) => ({
      url: `${baseUrl}/posts/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const recordRoutes: MetadataRoute.Sitemap = (records ?? [])
    .filter(
      (record) => record.slug && !record.slug.startsWith("placeholder"),
    )
    .map((record) => ({
      url: `${baseUrl}/records/${record.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...postRoutes, ...recordRoutes];
}