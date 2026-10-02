# rowanmp

Personal site for **Rowan Mentley-Peters** — Biology, SUNY Oneonta.

Homepage is a **bookshelf** (wooden shelves + square album photos), with About underneath. Posts, contact, and CV are separate pages.

## Stack

- Next.js App Router + Tailwind
- Sanity CMS (Studio at `/studio`)
- Vercel

## How Rowan edits

| In Studio | On the site |
|---|---|
| **Shelves** | Rows on the home wall |
| **Records** | Albums on a shelf → `/records/[slug]` (square photo; blank tile until one is uploaded) |
| **Home page** | About copy and field portrait under the shelves |
| **Contact photo** | Tall photo on `/contact` |
| **Posts** | `/posts` list + detail |
| **CV** | `/cv`, with the PDF download |

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Site: http://localhost:3000
- Studio: http://localhost:3000/studio
- Contact: http://localhost:3000/contact

## Sanity

| | |
|---|---|
| Project | `rowanmp` (`0mbng8go`) |
| Dataset | `production` |
| Manage | https://www.sanity.io/manage/project/0mbng8go |
| Members | https://www.sanity.io/manage/project/0mbng8go/members |
