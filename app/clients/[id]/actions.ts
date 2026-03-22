"use server";

import { revalidatePath } from "next/cache";
import { getSupabase } from "@/lib/supabase";
import type { TaskPriority, TaskStatus } from "@/types";

const STATUSES: TaskStatus[] = ["Pending", "In Progress", "Completed"];
const PRIORITIES: TaskPriority[] = ["Low", "Medium", "High"];

function parseStatus(value: string | null): TaskStatus {
  if (value && STATUSES.includes(value as TaskStatus)) {
    return value as TaskStatus;
  }
  return "Pending";
}

function parsePriority(value: string | null): TaskPriority {
  if (value && PRIORITIES.includes(value as TaskPriority)) {
    return value as TaskPriority;
  }
  return "Medium";
}

export async function createTask(formData: FormData) {
  const clientId = String(formData.get("clientId") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const descriptionRaw = formData.get("description");
  const description =
    descriptionRaw === null || String(descriptionRaw).trim() === ""
      ? null
      : String(descriptionRaw).trim();
  const category = String(formData.get("category") ?? "").trim();
  const dueDate = String(formData.get("due_date") ?? "");
  const priority = parsePriority(String(formData.get("priority")));

  if (!clientId || !title || !category || !dueDate) {
    return { error: "Title, category, and due date are required." };
  }

  const due = new Date(dueDate);
  if (Number.isNaN(due.getTime())) {
    return { error: "Invalid due date." };
  }

  const supabase = getSupabase();
  const { error } = await supabase.from("compliance_tasks").insert({
    client_id: clientId,
    title,
    description,
    category,
    due_date: due.toISOString(),
    status: "Pending",
    priority,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/clients/${clientId}`);
  return { ok: true as const };
}

export async function updateTaskStatus(
  taskId: string,
  clientId: string,
  status: string
) {
  const next = parseStatus(status);
  const supabase = getSupabase();
  const { error } = await supabase
    .from("compliance_tasks")
    .update({ status: next })
    .eq("id", taskId)
    .eq("client_id", clientId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath(`/clients/${clientId}`);
  return { ok: true as const };
}
