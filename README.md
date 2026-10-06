# rowanmp

Personal site for **Rowan Mentley-Peters** — Biology, SUNY Oneonta.

Homepage is a set of **record shelves** (a wooden bar with square sleeves), with About underneath. Posts stay separate. The header CV link downloads the PDF; `/cv` is the same download.

## Stack

- Next.js App Router + Tailwind
- Sanity CMS (Studio at `/studio`)
- Vercel

## How Rowan edits

| In Studio | On the site |
|---|---|
| **Shelves** | Rows on the homepage |
| **Records** | Sleeves on a shelf → `/records/[slug]` (square photo optional; a blank jacket shows until one is uploaded) |
| **Home page** | About copy under the shelves |
| **Posts** | `/posts` list + detail |
| **CV** | PDF in the header, and the same file on `/cv` |

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
