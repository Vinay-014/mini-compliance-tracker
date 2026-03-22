import type { TaskRow, TaskStatus, StatusFilter } from "@/types";

export function isOverdue(dueDate: string, status: TaskStatus): boolean {
  if (status !== "Pending") return false;
  const due = new Date(dueDate);
  const today = new Date();
  due.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return due < today;
}

export function applyTaskFilters(
  tasks: TaskRow[],
  statusFilter: StatusFilter,
  categoryFilter: string
): TaskRow[] {
  let result = tasks;

  if (categoryFilter && categoryFilter !== "All") {
    result = result.filter((t) => t.category === categoryFilter);
  }

  if (statusFilter === "All") return result;

  if (statusFilter === "Overdue") {
    return result.filter((t) => isOverdue(t.due_date, t.status));
  }

  if (statusFilter === "Pending") {
    return result.filter((t) => t.status === "Pending");
  }

  if (statusFilter === "Completed") {
    return result.filter((t) => t.status === "Completed");
  }

  return result;
}
