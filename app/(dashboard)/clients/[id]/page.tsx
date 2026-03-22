import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ClientPageHeader } from "@/components/client-page-header";
import { TaskFiltersBar } from "@/components/task-filters";
import { TaskGrid } from "@/components/task-grid";
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
      <main className="relative px-4 py-10 md:px-6 lg:px-10">
        <div className="mx-auto max-w-6xl rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-8 text-destructive">
          <p className="font-medium">Could not load tasks</p>
          <p className="mt-1 text-sm opacity-90">{tasksError.message}</p>
        </div>
      </main>
    );
  }

  const allTasks = (tasksRaw ?? []) as TaskRow[];
  const categories = Array.from(
    new Set(allTasks.map((t) => t.category))
  ).sort();

  const filtered = applyTaskFilters(allTasks, statusFilter, categoryFilter);

  return (
    <main className="relative px-4 py-8 md:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <ClientPageHeader
          clientId={id}
          companyName={client.company_name}
          country={client.country}
          entityType={client.entity_type}
        />

        <div className="rounded-2xl border border-border/50 bg-card/50 p-4 shadow-sm backdrop-blur-md dark:bg-card/40 sm:p-6">
          <Suspense
            fallback={
              <div className="h-12 w-full max-w-xl animate-pulse rounded-xl bg-muted/60" />
            }
          >
            <TaskFiltersBar
              clientId={id}
              status={statusFilter}
              category={categoryFilter}
              categories={categories}
            />
          </Suspense>
        </div>

        <TaskGrid clientId={id} tasks={filtered} />
      </div>
    </main>
  );
}
