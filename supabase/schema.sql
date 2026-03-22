-- Run in Supabase SQL Editor: schema + RLS policies for anon key (no auth app)

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  country text not null,
  entity_type text not null
);

create table if not exists public.compliance_tasks (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.clients (id) on delete cascade,
  title text not null,
  description text,
  category text not null,
  due_date timestamptz not null,
  status text not null check (status in ('Pending', 'In Progress', 'Completed')),
  priority text not null check (priority in ('Low', 'Medium', 'High'))
);

create index if not exists compliance_tasks_client_id_idx on public.compliance_tasks (client_id);
create index if not exists compliance_tasks_due_date_idx on public.compliance_tasks (due_date);

alter table public.clients enable row level security;
alter table public.compliance_tasks enable row level security;

-- Demo app: allow anon read/write (use stricter policies in production)
drop policy if exists "anon_all_clients" on public.clients;
create policy "anon_all_clients" on public.clients
  for all using (true) with check (true);

drop policy if exists "anon_all_tasks" on public.compliance_tasks;
create policy "anon_all_tasks" on public.compliance_tasks
  for all using (true) with check (true);
