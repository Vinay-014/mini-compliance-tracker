"use client";

import { motion } from "framer-motion";
import { ClipboardList } from "lucide-react";

import { TaskCard } from "@/components/task-card";
import type { TaskRow } from "@/types";

type Props = {
  clientId: string;
  tasks: TaskRow[];
};

export function TaskGrid({ clientId, tasks }: Props) {
  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-card/40 px-8 py-16 text-center backdrop-blur-sm"
      >
        <ClipboardList className="mb-3 h-10 w-10 text-muted-foreground/60" />
        <p className="text-lg font-medium text-foreground">No tasks match filters</p>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Try adjusting status or category, or add a new compliance task.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.04 },
        },
      }}
    >
      {tasks.map((task, i) => (
        <TaskCard key={task.id} clientId={clientId} task={task} index={i} />
      ))}
    </motion.div>
  );
}
