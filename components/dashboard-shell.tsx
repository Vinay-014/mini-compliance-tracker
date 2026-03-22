import { getSupabase } from "@/lib/supabase";
import { ClientSidebar } from "@/components/client-sidebar";

export async function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = getSupabase();
  const { data: clients } = await supabase
    .from("clients")
    .select("id, company_name, country, entity_type")
    .order("company_name");

  return (
    <div className="relative min-h-screen bg-[#f8fafc] dark:bg-background">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.12),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.08),transparent)]" />
      <ClientSidebar clients={clients ?? []} />
      <div className="relative flex min-h-screen flex-col md:pl-[288px]">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}
