export type TaskStatus = "Pending" | "In Progress" | "Completed";
export type TaskPriority = "Low" | "Medium" | "High";

export type ClientRow = {
  id: string;
  company_name: string;
  country: string;
  entity_type: string;
};

export type TaskRow = {
  id: string;
  client_id: string;
  title: string;
  description: string | null;
  category: string;
  due_date: string;
  status: TaskStatus;
  priority: TaskPriority;
};

export type StatusFilter = "All" | "Pending" | "Completed" | "Overdue";
