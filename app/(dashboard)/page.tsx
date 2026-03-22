import { ClientList } from "@/components/client-list";
import { HomeHero } from "@/components/home-hero";
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
      <main className="relative px-4 py-10 md:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-8 text-destructive">
          <p className="font-medium">Could not load clients</p>
          <p className="mt-1 text-sm opacity-90">{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative px-4 py-10 md:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl space-y-10">
        <HomeHero />
        <ClientList clients={clients ?? []} />
      </div>
    </main>
  );
}
