import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddTaskForm } from "@/components/AddTaskForm";
import { TaskFilters } from "@/components/TaskFilters";
import { TaskTable } from "@/components/TaskTable";
import { applyTaskFilters } from "@/lib/task-utils";
import { getSupabase } from "@/lib/supabase";
import type { StatusFilter, TaskRow } from "@/types";

export const dynamic = "force-dynamic";

function parseStatusFilter(v: string | undefined): StatusFilter {
  const allowed: StatusFilter[] = ["All", "Pending", "Completed", "Overdue"];
  if (v && allowed.includes(v as StatusFilter)) return v as StatusFilter;
  return "All";
}

export default async function ClientTasksPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ status?: string; category?: string }>;
}) {
  const { id } = await params;
  const sp = await searchParams;
  const statusFilter = parseStatusFilter(sp.status);
  const categoryFilter = sp.category?.trim() || "All";

  const supabase = getSupabase();

  const { data: client, error: clientError } = await supabase
    .from("clients")
    .select("id, company_name, country, entity_type")
    .eq("id", id)
    .maybeSingle();

  if (clientError || !client) {
    notFound();
  }

  const { data: tasksRaw, error: tasksError } = await supabase
    .from("compliance_tasks")
    .select(
      "id, client_id, title, description, category, due_date, status, priority"
    )
    .eq("client_id", id)
    .order("due_date", { ascending: true });

  if (tasksError) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <p className="rounded border border-red-200 bg-red-50 p-4 text-red-800">
          Could not load tasks: {tasksError.message}
        </p>
      </main>
    );
  }

  const allTasks = (tasksRaw ?? []) as TaskRow[];
  const categories = Array.from(
    new Set(allTasks.map((t) => t.category))
  ).sort();

  const filtered = applyTaskFilters(allTasks, statusFilter, categoryFilter);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <Link
        href="/"
        className="text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        ← All clients
      </Link>

      <header className="mt-4 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-semibold text-slate-900">
          {client.company_name}
        </h1>
        <p className="mt-1 text-slate-600">
          {client.country} · {client.entity_type}
        </p>
      </header>

      <section className="mt-8 space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Suspense fallback={<div className="h-10 w-full max-w-md animate-pulse rounded bg-slate-200" />}>
            <TaskFilters
              clientId={id}
              status={statusFilter}
              category={categoryFilter}
              categories={categories}
            />
          </Suspense>
        </div>

        <TaskTable clientId={id} tasks={filtered} />

        <AddTaskForm clientId={id} />
      </section>
    </main>
  );
}
