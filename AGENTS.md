# rowanmp

Personal site for Rowan Mentley-Peters (Biology, SUNY Oneonta). Homepage is rows of "record shelves" (square sleeves on a wooden bar) with About underneath; posts are separate; header CV link downloads a PDF (`/cv` too).

## Dev framework

This repo follows Jake's dev framework: [jakedcl/dev-framework](https://github.com/jakedcl/dev-framework) (start at its `AGENTS.md`). The framework is the source of truth; if anything in this file conflicts with it, the framework wins.

This Next.js version has breaking changes; check node_modules/next/dist/docs before using APIs.

## Stack (from package.json)
Next.js 16.3.6 App Router, React 19.2.8, Tailwind 4, Sanity ^6.16 + next-sanity ^13 + @sanity/vision, @portabletext/react. Deployed on Vercel (per README).

## Layout
- `src/app/` page (shelves), records/[slug], posts, posts/[slug], cv, contact, studio/[[...tool]]
- `src/components/` RecordWall, SleeveLink, SleeveDemo, RichText, SiteShell, Reveal
- `src/sanity/` env.ts, lib (client, queries, image, live), schemaTypes (shelf, record, post, siteSettings, blockContent)

## Commands
`npm run dev` (site :3000, Studio at /studio), `npm run build`, `npm run lint`. (`npm run studio` is just `next dev`.)

## Content
Sanity project `0mbng8go`, dataset `production`, Studio at `/studio`. Shelves → homepage rows; Records → sleeves and `/records/[slug]`; Home page singleton (`siteSettings`) → About copy and the CV PDF; Posts → `/posts`.

## Gotchas
- `agentRules: false` in `next.config.ts` stops `next dev` from re-adding the Next.js agent block to this file. Keep it.
- Record photos are optional; a blank jacket renders until one is uploaded.
