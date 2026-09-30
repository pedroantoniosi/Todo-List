import prisma from "../lib/prisma.js";

interface CreateTaskData {
  title: string;
  description: string;
  userId: string;
}

interface UpdateTaskData {
  title?: string | undefined;
  description?: string | undefined;
  completed?: boolean | undefined;
}

export async function createTask({
  title,
  description,
  userId,
}: CreateTaskData) {
  return prisma.task.create({
    data: {
      title,
      description,
      userId,
    },
  });
}

export async function getTasks(userId: string) {
  return prisma.task.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getTaskById(taskId: string, userId: string) {
  return prisma.task.findFirst({
    where: {
      id: taskId,
      userId,
    },
  });
}

export async function updateTask(
  taskId: string,
  userId: string,
  data: UpdateTaskData,
) {
  const task = await getTaskById(taskId, userId);

  if (!task) {
    return null;
  }

  const updateData: {
    title?: string;
    description?: string;
    completed?: boolean;
  } = {};

  if (data.title !== undefined) {
    updateData.title = data.title;
  }

  if (data.description !== undefined) {
    updateData.description = data.description;
  }

  if (data.completed !== undefined) {
    updateData.completed = data.completed;
  }

  return prisma.task.update({
    where: {
      id: task.id,
    },
    data: updateData,
  });
}

export async function deleteTask(taskId: string, userId: string) {
  const task = await getTaskById(taskId, userId);

  if (!task) {
    return null;
  }

  await prisma.task.delete({
    where: {
      id: task.id,
    },
  });

  return true;
}
