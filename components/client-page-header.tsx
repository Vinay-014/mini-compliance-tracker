"use client";

import { motion } from "framer-motion";

import { AddTaskDialog } from "@/components/add-task-dialog";

type Props = {
  clientId: string;
  companyName: string;
  country: string;
  entityType: string;
};

export function ClientPageHeader({
  clientId,
  companyName,
  country,
  entityType,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6 border-b border-border/60 pb-8 sm:flex-row sm:items-end sm:justify-between"
    >
      <div className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary/90">
          Client workspace
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {companyName}
        </h1>
        <p className="text-base text-muted-foreground">
          {country} · {entityType}
        </p>
      </div>
      <AddTaskDialog clientId={clientId} />
    </motion.div>
  );
}
