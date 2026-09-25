# rowanmp

Personal site for **Rowan Mentley-Peters** — freshwater mussel researcher & Rescue Diver.

## Stack

- Next.js App Router + Tailwind
- Sanity CMS (embedded Studio at `/studio`)
- Vercel

## Local

```bash
npm install
cp .env.example .env.local   # fill project id + read token
npm run dev
```

- Site: http://localhost:3000
- Studio: http://localhost:3000/studio

## Sanity

| | |
|---|---|
| Project | `rowanmp` |
| Project ID | `0mbng8go` |
| Dataset | `production` |
| Manage | https://www.sanity.io/manage/project/0mbng8go |
| **Invite Rowan** | https://www.sanity.io/manage/project/0mbng8go/members |

Invite as **Editor** (or Admin if he should manage members). Email from CV: `mentrs635@oneonta.edu` — confirm with him on the call.

## Content model

- **Site Settings** (singleton) — name, tagline, email, bio, hero, CV PDF
- **Projects** — field / research / dive work
- **Photos** — gallery + featured flag
