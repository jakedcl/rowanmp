# rowanmp

Portfolio site for **Rowan Mentley-Peters** (Biology, SUNY Oneonta). Projects and writing are organized like vinyl on wooden shelves — live at **https://rowanmp.com**.

## Highlights

- **Record wall** — Homepage rows of square sleeves on oak shelves. Hover (desktop) or tap (mobile) slides a sleeve out to reveal the label art; first visit runs a short on-page demo on one sleeve.
- **Sanity CMS** — Content lives in Sanity (`production` dataset). Embedded **Studio** at `/studio` for shelves, records, posts, about copy, and CV PDF.
- **Sanity CDN images** — `SanityImage` uses a custom `next/image` loader (`src/lib/sanityImageLoader.ts`) so `cdn.sanity.io` assets resize on Sanity’s CDN instead of Vercel Image Optimization. Local `/public` images still use the default optimizer.

## Tech stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4
- Sanity v6 + next-sanity (live preview, Portable Text)
- Deployed on Vercel

## How it’s built / local dev

Create `.env.local`:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=0mbng8go
NEXT_PUBLIC_SANITY_DATASET=production
```

Then:

```bash
npm install
npm run dev
```

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | Site |
| http://localhost:3000/studio | Sanity Studio |
| http://localhost:3000/posts | Posts index |
| http://localhost:3000/contact | Contact |

Build and lint: `npm run build`, `npm run lint`.

## Production

- **https://rowanmp.com** — apex canonical domain
- `robots.txt` and `sitemap.xml` are generated from the app (CMS slugs included automatically)
- Security headers (HSTS, frame options, referrer policy, etc.) are set in `next.config.ts` — no site-wide CSP, so `/studio` can load embedded Sanity tooling

## Sanity project

| | |
|---|---|
| Project | `rowanmp` (`0mbng8go`) |
| Dataset | `production` |
| Manage | https://www.sanity.io/manage/project/0mbng8go |

| In Studio | On the site |
|---|---|
| **Shelves** | Homepage rows |
| **Records** | Sleeves → `/records/[slug]` |
| **Home page** | About under the wall |
| **Posts** | `/posts` and `/posts/[slug]` |
| **CV** | Header link + `/cv` download |