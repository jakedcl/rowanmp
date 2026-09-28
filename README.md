# rowanmp

Personal site for **Rowan Mentley-Peters** — Biology, SUNY Oneonta.

Homepage is a **record wall** (CSS shelves + sleeve photos), with About underneath. Posts stay separate.

## Stack

- Next.js App Router + Tailwind
- Sanity CMS (Studio at `/studio`)
- Vercel

## How Rowan edits

| In Studio | On the site |
|---|---|
| **Shelves** | Rows on the home wall |
| **Records** | Sleeves on a shelf → `/records/[slug]` (needs a square sleeve photo) |
| **Home page** | About copy under the wall |
| **Posts** | `/posts` list + detail |

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
