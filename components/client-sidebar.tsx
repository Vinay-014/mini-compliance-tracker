"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LayoutDashboard, Menu, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export type ClientLite = {
  id: string;
  company_name: string;
  country: string;
  entity_type: string;
};

type Props = {
  clients: ClientLite[];
};

function useCurrentClientId(pathname: string | null) {
  if (!pathname) return undefined;
  const m = pathname.match(/^\/clients\/([^/]+)/);
  return m?.[1];
}

function SidebarInner({
  clients,
  currentId,
  onNavigate,
}: {
  clients: ClientLite[];
  currentId?: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      <Link
        href="/"
        onClick={onNavigate}
        className={cn(
          "mb-4 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
          !currentId
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-muted/80 hover:text-foreground"
        )}
      >
        <LayoutDashboard className="h-4 w-4 shrink-0" />
        Overview
      </Link>
      <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Clients
      </p>
      <ScrollArea className="h-[calc(100vh-220px)] pr-2">
        <div className="space-y-1.5 pb-6">
          {clients.map((c, i) => {
            const active = currentId === c.id;
            return (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
              >
                <Link
                  href={`/clients/${c.id}`}
                  onClick={onNavigate}
                  className={cn(
                    "group flex flex-col gap-0.5 rounded-xl border border-transparent px-3 py-3 text-left transition-all",
                    active
                      ? "border-primary/20 bg-primary/10 shadow-sm"
                      : "hover:scale-[1.02] hover:border-border/80 hover:bg-background/80 hover:shadow-md dark:hover:bg-card/60"
                  )}
                >
                  <span
                    className={cn(
                      "truncate text-sm font-medium leading-tight",
                      active ? "text-primary" : "text-foreground"
                    )}
                  >
                    {c.company_name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    {c.country} · {c.entity_type}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>
    </>
  );
}

export function ClientSidebar({ clients }: Props) {
  const pathname = usePathname();
  const currentId = useCurrentClientId(pathname);
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border/60 bg-background/80 px-4 py-3 backdrop-blur-xl md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-lg">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] border-border/60 p-6">
            <SheetHeader className="mb-4 space-y-3 p-0 text-left">
              <SheetTitle className="flex items-center gap-2 text-base">
                <Building2 className="h-5 w-5 text-primary" />
                Navigation
              </SheetTitle>
              <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-muted/40 px-3 py-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">Ledger Compliance</p>
                  <p className="truncate text-xs text-muted-foreground">CFO-grade tracking</p>
                </div>
              </div>
            </SheetHeader>
            <Separator className="mb-4" />
            <SidebarInner
              clients={clients}
              currentId={currentId}
              onNavigate={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="font-semibold tracking-tight">Compliance</span>
        </div>
        <ThemeToggle />
      </header>

      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[288px] flex-col border-r border-border/60 bg-card/70 p-6 backdrop-blur-xl dark:bg-card/50 md:flex">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">Ledger Compliance</p>
              <p className="text-xs text-muted-foreground">Operations hub</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <SidebarInner clients={clients} currentId={currentId} />
      </aside>
    </>
  );
}
