# rowanmp

Personal site for **Rowan Mentley-Peters** — Biology, SUNY Oneonta.

## Stack

- Next.js App Router + Tailwind
- Sanity CMS (Studio at `/studio`)
- Vercel

## How Rowan edits

| In Studio | On the site |
|---|---|
| **Home page** → big rich-text field | `/` — write anything, drop images |
| **Posts** | `/posts` list + `/posts/[slug]` |

Categories on posts: Announcement, Publication, Project, Talk, Other.

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

- Site: http://localhost:3000
- Studio: http://localhost:3000/studio

## Sanity

| | |
|---|---|
| Project | `rowanmp` (`0mbng8go`) |
| Dataset | `production` |
| Manage | https://www.sanity.io/manage/project/0mbng8go |
| Members | https://www.sanity.io/manage/project/0mbng8go/members |
