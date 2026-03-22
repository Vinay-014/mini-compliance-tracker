"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function TaskFiltersBar({
  clientId,
  status,
  category,
  categories,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function push(next: { status?: StatusFilter; category?: string }) {
    const sp = new URLSearchParams(searchParams.toString());
    if (next.status !== undefined) sp.set("status", next.status);
    if (next.category !== undefined) sp.set("category", next.category);
    router.push(`/clients/${clientId}?${sp.toString()}`);
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span className="font-medium text-foreground">Filters</span>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex flex-wrap gap-1.5 rounded-xl border border-border/60 bg-muted/50 p-1.5 dark:bg-muted/30">
          {STATUS_OPTIONS.map((s) => {
            const active = status === s;
            return (
              <Button
                key={s}
                type="button"
                variant={active ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "h-9 rounded-lg px-3 text-xs font-medium shadow-none transition-all",
                  active && "shadow-sm"
                )}
                onClick={() => push({ status: s })}
              >
                {s}
              </Button>
            );
          })}
        </div>
        <div className="w-full min-w-[180px] sm:w-56">
          <Select
            value={category}
            onValueChange={(v) => push({ category: v })}
          >
            <SelectTrigger className="h-10 rounded-xl border-border/60 bg-background/80 backdrop-blur-sm">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
