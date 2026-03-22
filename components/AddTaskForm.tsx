import { createTask } from "@/app/clients/[id]/actions";

const CATEGORIES = [
  "GST",
  "Income Tax",
  "ROC",
  "TDS",
  "Payroll",
  "Other",
];

type Props = {
  clientId: string;
};

export function AddTaskForm({ clientId }: Props) {
  return (
    <form
      action={createTask}
      className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
    >
      <input type="hidden" name="clientId" value={clientId} />
      <h2 className="text-lg font-semibold text-slate-900">Add task</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Title *</span>
          <input
            name="title"
            required
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            placeholder="e.g. GSTR-3B filing"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          <span className="font-medium text-slate-700">Description</span>
          <textarea
            name="description"
            rows={2}
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            placeholder="Optional notes"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Category *</span>
          <select
            name="category"
            required
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            defaultValue="GST"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Due date *</span>
          <input
            name="due_date"
            type="date"
            required
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-slate-700">Priority</span>
          <select
            name="priority"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
            defaultValue="Medium"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow hover:bg-slate-800"
        >
          Add task
        </button>
      </div>
    </form>
  );
}
