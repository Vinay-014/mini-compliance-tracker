import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 text-center">
      <h1 className="text-xl font-semibold text-slate-900">Client not found</h1>
      <p className="mt-2 text-slate-600">
        That client does not exist or was removed.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm font-medium text-slate-700 underline hover:text-slate-900"
      >
        Back to clients
      </Link>
    </main>
  );
}
