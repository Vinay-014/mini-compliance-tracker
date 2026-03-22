"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { StatusFilter } from "@/types";

const STATUS_OPTIONS: StatusFilter[] = [
  "All",
  "Pending",
  "Completed",
  "Overdue",
];

type Props = {
  clientId: string;
  status: StatusFilter;
  category: string;
  categories: string[];
};

export function TaskFilters({ clientId, status, category, categories }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function push(next: { status?: StatusFilter; category?: string }) {
    const sp = new URLSearchParams(searchParams.toString());
    if (next.status !== undefined) sp.set("status", next.status);
    if (next.category !== undefined) sp.set("category", next.category);
    router.push(`/clients/${clientId}?${sp.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-end gap-4">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-slate-700">Status</span>
        <select
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          value={status}
          onChange={(e) => push({ status: e.target.value as StatusFilter })}
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-slate-700">Category</span>
        <select
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          value={category}
          onChange={(e) => push({ category: e.target.value })}
        >
          <option value="All">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
