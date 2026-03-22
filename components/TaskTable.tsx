"use client";

import { useTransition } from "react";
import { updateTaskStatus } from "@/app/clients/[id]/actions";
import { isOverdue } from "@/lib/task-utils";
import type { TaskRow, TaskStatus } from "@/types";

const STATUS_OPTIONS: TaskStatus[] = ["Pending", "In Progress", "Completed"];

type Props = {
  clientId: string;
  tasks: TaskRow[];
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function TaskTable({ clientId, tasks }: Props) {
  const [pending, startTransition] = useTransition();

  function onStatusChange(taskId: string, value: string) {
    startTransition(async () => {
      await updateTaskStatus(taskId, clientId, value);
    });
  }

  if (tasks.length === 0) {
    return (
      <p className="rounded-lg border border-dashed border-slate-200 bg-white p-8 text-center text-slate-500">
        No tasks match the current filters.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 font-semibold text-slate-700">Title</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Category</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Due</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Status</th>
            <th className="px-4 py-3 font-semibold text-slate-700">Priority</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {tasks.map((task) => {
            const overdue = isOverdue(task.due_date, task.status);
            return (
              <tr
                key={task.id}
                className={
                  overdue
                    ? "bg-red-50 hover:bg-red-100/80"
                    : "hover:bg-slate-50/80"
                }
              >
                <td className="px-4 py-3 align-top">
                  <div className="font-medium text-slate-900">{task.title}</div>
                  {task.description && (
                    <div className="mt-1 max-w-md text-xs text-slate-500">
                      {task.description}
                    </div>
                  )}
                  {overdue && (
                    <span className="mt-2 inline-flex rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white">
                      Overdue
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-slate-700">{task.category}</td>
                <td className="px-4 py-3 whitespace-nowrap text-slate-700">
                  {formatDate(task.due_date)}
                </td>
                <td className="px-4 py-3">
                  <select
                    disabled={pending}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 disabled:opacity-50"
                    value={task.status}
                    onChange={(e) => onStatusChange(task.id, e.target.value)}
                    aria-label={`Status for ${task.title}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3 text-slate-700">{task.priority}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
