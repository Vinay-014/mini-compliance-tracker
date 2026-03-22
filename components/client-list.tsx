"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Building2, Globe2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import type { ClientLite } from "@/components/client-sidebar";

type Props = {
  clients: ClientLite[];
};

export function ClientList({ clients }: Props) {
  if (clients.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border/80 bg-card/40 px-6 py-12 text-center text-muted-foreground backdrop-blur-sm">
        No clients found. Run{" "}
        <code className="rounded-md bg-muted px-1.5 py-0.5 text-xs font-mono text-foreground">
          supabase/seed.sql
        </code>{" "}
        in the Supabase SQL editor.
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {clients.map((c, i) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <Link href={`/clients/${c.id}`} className="block h-full">
            <Card
              className={cn(
                "group h-full border-border/60 bg-card/70 backdrop-blur-md transition-all duration-300",
                "hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5"
              )}
            >
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                </div>
                <div className="space-y-1">
                  <h2 className="text-lg font-semibold leading-snug tracking-tight text-foreground">
                    {c.company_name}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe2 className="h-3.5 w-3.5 shrink-0" />
                    <span>{c.country}</span>
                    <span className="text-border">·</span>
                    <span>{c.entity_type}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
