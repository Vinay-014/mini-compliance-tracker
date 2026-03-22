# Mini Compliance Tracker

Next.js 15 (App Router) + TypeScript + Tailwind CSS + Supabase. No authentication.

## Local setup

1. Copy `.env.example` to `.env.local` and set `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the Supabase dashboard (Settings → API).

2. In Supabase SQL Editor, run `supabase/schema.sql` then `supabase/seed.sql`.

3. Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Git history (suggested commits)

After `git init`, you can match a clean history with:

```bash
git add package.json tsconfig.json next.config.ts postcss.config.mjs tailwind.config.ts eslint.config.mjs next-env.d.ts .gitignore
git commit -m "chore: add Next.js 15, TypeScript, Tailwind, ESLint config"

git add lib/ types/
git commit -m "feat: add Supabase client and task helpers"

git add app/ components/
git commit -m "feat: clients list, tasks page, filters, and server actions"

git add supabase/ .env.example README.md
git commit -m "docs: Supabase schema, seed data, and environment example"
```

## Deploy (Vercel)

1. Push this repo to GitHub.

2. Import the repository in [Vercel](https://vercel.com/new).

3. Add environment variables: `SUPABASE_URL`, `SUPABASE_ANON_KEY` (same values as local).

4. Deploy. The production URL will be shown when the build finishes.

## Project layout

- `app/page.tsx` — client list
- `app/clients/[id]/page.tsx` — tasks, filters, add form
- `app/clients/[id]/actions.ts` — server actions (create task, update status)
- `components/TaskTable.tsx` — table + status dropdown
- `components/TaskFilters.tsx` — status/category filters (URL query)
- `lib/supabase.ts` — Supabase client
- `supabase/schema.sql` — tables + RLS policies for demo
