import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const params = request.nextUrl.searchParams;
  const where: Record<string, unknown> = {};
  const status = params.get("status");
  if (status) {
    if (!["OPEN", "DONE", "CANCELLED"].includes(status)) return NextResponse.json({ error: "status must be OPEN, DONE, or CANCELLED" }, { status: 422 });
    where.status = status;
  }
  const priority = params.get("priority");
  if (priority) {
    if (!["LOW", "NORMAL", "HIGH"].includes(priority)) return NextResponse.json({ error: "priority must be LOW, NORMAL, or HIGH" }, { status: 422 });
    where.priority = priority;
  }
  const q = (params.get("q") || "").slice(0, 200);
  if (q) where.OR = [{ title: { contains: q, mode: "insensitive" } }, { description: { contains: q, mode: "insensitive" } }];
  const tasks = await prisma.staffTask.findMany({
    where,
    orderBy: [{ status: "asc" }, { dueAt: "asc" }, { createdAt: "desc" }],
    take: 200,
  });
  return NextResponse.json({ tasks, total: tasks.length });
}

export async function POST(request: NextRequest) {
  const user = await requireUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title) return NextResponse.json({ error: "title is required" }, { status: 422 });
  const priority = body.priority === "LOW" || body.priority === "HIGH" ? body.priority : "NORMAL";
  const dueAt = typeof body.dueAt === "string" && !Number.isNaN(Date.parse(body.dueAt)) ? new Date(body.dueAt) : null;
  const task = await prisma.staffTask.create({
    data: { title: title.slice(0, 200), priority, dueAt, createdById: user.id, assigneeId: typeof body.assigneeId === "string" ? body.assigneeId : null },
  });
  await prisma.auditLog.create({ data: { actorId: user.id, actorName: user.name ?? user.email ?? "user", action: "TASK_CREATED", entity: "StaffTask", entityId: task.id, detail: task.title } });
  return NextResponse.json({ task }, { status: 201 });
}
