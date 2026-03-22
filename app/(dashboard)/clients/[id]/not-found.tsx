import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        Client not found
      </h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        That client does not exist or was removed from your workspace.
      </p>
      <Button asChild className="mt-8 rounded-xl">
        <Link href="/">Back to overview</Link>
      </Button>
    </main>
  );
}
