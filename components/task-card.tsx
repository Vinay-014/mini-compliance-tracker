"use client";

import { useTransition } from "react";
import { motion } from "framer-motion";
import { CalendarDays, Layers } from "lucide-react";

import { updateTaskStatus } from "@/lib/actions/tasks";
import { isOverdue } from "@/lib/task-utils";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TaskRow, TaskStatus } from "@/types";

const STATUS_OPTIONS: TaskStatus[] = ["Pending", "In Progress", "Completed"];

type Props = {
  clientId: string;
  task: TaskRow;
  index: number;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function priorityVariant(p: string): "default" | "warning" | "success" | "destructive" {
  if (p === "High") return "destructive";
  if (p === "Medium") return "warning";
  return "success";
}

export function TaskCard({ clientId, task, index }: Props) {
  const [pending, startTransition] = useTransition();
  const overdue = isOverdue(task.due_date, task.status);

  function onStatusChange(value: string) {
    startTransition(async () => {
      await updateTaskStatus(task.id, clientId, value);
    });
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <Card
        className={cn(
          "group h-full overflow-hidden border-border/60 bg-card/80 backdrop-blur-md transition-shadow duration-300 hover:shadow-lg dark:border-border/40 dark:bg-card/60",
          overdue &&
            "border-red-200 bg-red-50/90 shadow-red-100/50 dark:border-red-900/40 dark:bg-red-950/30"
        )}
      >
        <CardHeader className="space-y-3 pb-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div className="min-w-0 flex-1 space-y-1">
              <h3 className="text-base font-semibold leading-snug tracking-tight text-foreground">
                {task.title}
              </h3>
              {task.description && (
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {task.description}
                </p>
              )}
            </div>
            {overdue && (
              <Badge variant="overdue" className="shrink-0">
                Overdue
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="font-normal">
              <Layers className="mr-1 h-3 w-3" />
              {task.category}
            </Badge>
            <Badge variant={priorityVariant(task.priority)}>
              {task.priority} priority
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 shrink-0" />
            <span>Due {formatDate(task.due_date)}</span>
          </div>
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Status
            </p>
            <Select
              disabled={pending}
              value={task.status}
              onValueChange={onStatusChange}
            >
              <SelectTrigger
                className={cn(
                  "rounded-lg",
                  pending && "opacity-60"
                )}
                aria-label={`Status for ${task.title}`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
