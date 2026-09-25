import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    name,
    tagline,
    email,
    bio,
    heroImage,
    "cvUrl": cv.asset->url
  }
`);

export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(year desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    year,
    role,
    summary,
    coverImage
  }
`);

export const FEATURED_PHOTOS_QUERY = defineQuery(`
  *[_type == "photo" && featured == true] | order(_createdAt desc) {
    _id,
    title,
    image,
    caption,
    location
  }
`);
