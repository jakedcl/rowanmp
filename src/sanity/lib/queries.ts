import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    name,
    tagline,
    email,
    portrait,
    page,
    "cvUrl": cv.asset->url
  }
`);

export const POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    summary
  }
`);

export const RECENT_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    summary,
    coverImage,
    body
  }
`);

export const POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current }
`);

export const SHELVES_WITH_RECORDS_QUERY = defineQuery(`
  *[_type == "shelf"] | order(order asc, title asc) {
    _id,
    title,
    description,
    order,
    "records": *[_type == "record" && references(^._id) && defined(slug.current) && defined(sleeve.asset)]
      | order(order asc, title asc) {
        _id,
        title,
        "slug": slug.current,
        summary,
        sleeve,
        order
      }
  }
`);

export const RECORD_BY_SLUG_QUERY = defineQuery(`
  *[_type == "record" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    summary,
    sleeve,
    body,
    "shelf": shelf->{ _id, title },
    "relatedPost": relatedPost->{
      title,
      "slug": slug.current
    }
  }
`);

export const RECORD_SLUGS_QUERY = defineQuery(`
  *[_type == "record" && defined(slug.current)]{ "slug": slug.current }
`);
