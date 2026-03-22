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

- `app/(dashboard)/page.tsx` — client overview (cards)
- `app/(dashboard)/clients/[id]/page.tsx` — tasks grid, filters, add-task dialog
- `app/(dashboard)/layout.tsx` — shell with sidebar
- `lib/actions/tasks.ts` — server actions (create task, update status)
- `components/task-grid.tsx`, `task-card.tsx`, `task-filters.tsx`, `add-task-dialog.tsx`
- `lib/supabase.ts` — Supabase client
- `supabase/schema.sql` — tables + RLS policies for demo
