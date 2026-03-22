"use client";

import { motion } from "framer-motion";

export function HomeHero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="space-y-3"
    >
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-primary/90">
        Compliance
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-4xl sm:leading-tight">
        Your command center for filings & deadlines
      </h1>
      <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        Select a client to review obligations, track status, and keep regulators
        in the green.
      </p>
    </motion.div>
  );
}
