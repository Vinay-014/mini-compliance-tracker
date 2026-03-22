import Link from "next/link";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const supabase = getSupabase();
  const { data: clients, error } = await supabase
    .from("clients")
    .select("id, company_name, country, entity_type")
    .order("company_name");

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="text-2xl font-semibold text-slate-900">Clients</h1>
        <p className="mt-4 rounded border border-red-200 bg-red-50 p-4 text-red-800">
          Could not load clients: {error.message}
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-slate-900">
        Mini Compliance Tracker
      </h1>
      <p className="mt-2 text-slate-600">Select a client to view tasks.</p>

      <ul className="mt-8 divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
        {(clients ?? []).map((c) => (
          <li key={c.id}>
            <Link
              href={`/clients/${c.id}`}
              className="flex flex-col gap-1 px-4 py-4 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
            >
              <span className="font-medium text-slate-900">{c.company_name}</span>
              <span className="text-sm text-slate-500">
                {c.country} · {c.entity_type}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {(!clients || clients.length === 0) && (
        <p className="mt-6 text-slate-500">
          No clients found. Run the Supabase seed SQL from <code className="rounded bg-slate-100 px-1">supabase/seed.sql</code>.
        </p>
      )}
    </main>
  );
}
