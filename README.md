# Mini Compliance Tracker

A focused compliance operations UI for tracking regulatory tasks per client: client workspace, task cards with status and overdue handling, filters, and a modal to add tasks. Built for clarity and fast deployment—no authentication layer.

## Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript  
- **Styling:** Tailwind CSS, shadcn-style Radix UI components, Framer Motion, next-themes  
- **Data:** Supabase (PostgreSQL) via `@supabase/supabase-js` (no ORM)

## Features

- Client overview with sidebar navigation (desktop + mobile sheet)  
- Per-client task grid with category / status / overdue filters (URL-driven)  
- Server actions for creating tasks and updating status  
- Optional light/dark theme  
- Demo-friendly RLS policies (see `supabase/schema.sql`)

## Prerequisites

- Node.js LTS  
- A [Supabase](https://supabase.com) project  

## Setup

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment template and add your project credentials:

```bash
cp .env.example .env.local
```

| Variable            | Description                  |
|---------------------|------------------------------|
| `SUPABASE_URL`      | Project URL                  |
| `SUPABASE_ANON_KEY` | anon / public key            |


3. In the Supabase SQL editor, run the following scripts in order:

1. `supabase/schema.sql`
2. `supabase/seed.sql`


4. Start the dev server:

```bash
npm run dev
```
Open http://localhost:3000/.

## Scripts

| Command          | Purpose                              |
|------------------|--------------------------------------|
| `npm run dev`    | Development (Turbopack)              |
| `npm run build`  | Production build                     |
| `npm run start`  | Run production server                |
| `npm run lint`   | ESLint                               |

## Deployment (Vercel)
1. Push to GitHub.
2. Import the repo in Vercel.
3. Set Environment Variables:
    - SUPABASE_URL
    - SUPABASE_ANON_KEY
4. Deploy.

## Project Structure (High Level)
- `app/ (dashboard)/`: Routed UI shell + pages
    - `layout.tsx`: Root layout, theme, fonts
- `lib/`:
    - `actions/tasks.ts`: Server actions
    - `supabase.ts`: Supabase client factory
    - `task-utils.ts`: Overdue / filter helpers
- `components/`: UI shell, task grid, dialogs, `ui/` primitives
- `supabase/`:
    - `schema.sql`: Tables + RLS (demo)
    - `seed.sql`: Sample clients & tasks

## Security Note
This project uses the anon key with permissive policies for a demo. For production, tighten Row Level Security and add proper authentication.
