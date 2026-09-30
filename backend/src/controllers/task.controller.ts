import type { Request, Response } from "express";
import { z } from "zod";

import type { AuthenticatedRequest } from "../middlewares/auth.middleware.js";

import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask,
} from "../services/task.service.js";

const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Título é obrigatório")
    .max(200, "Título deve ter no máximo 200 caracteres"),

  description: z
    .string()
    .trim()
    .min(1, "Descrição é obrigatória")
    .max(2000, "Descrição deve ter no máximo 2000 caracteres"),
});

const updateTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Título é obrigatório")
    .max(200, "Título deve ter no máximo 200 caracteres")
    .optional(),

  description: z
    .string()
    .trim()
    .min(1, "Descrição é obrigatória")
    .max(2000, "Descrição deve ter no máximo 2000 caracteres")
    .optional(),

  completed: z.boolean().optional(),
});

export async function create(req: Request, res: Response) {
  try {
    const data = createTaskSchema.parse(req.body);

    const userId = (req as AuthenticatedRequest).userId;

    const task = await createTask({
      ...data,
      userId,
    });

    return res.status(201).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.issues,
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}

export async function list(req: Request, res: Response) {
  try {
    const userId = (req as AuthenticatedRequest).userId;

    const tasks = await getTasks(userId);

    return res.status(200).json(tasks);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const userId = (req as AuthenticatedRequest).userId;

    const taskId = req.params.id;

    if (typeof taskId !== "string") {
      return res.status(400).json({
        message: "ID da tarefa inválido",
      });
    }

    const task = await getTaskById(taskId, userId);

    if (!task) {
      return res.status(404).json({
        message: "Tarefa não encontrada",
      });
    }

    return res.status(200).json(task);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}

export async function update(req: Request, res: Response) {
  try {
    const userId = (req as AuthenticatedRequest).userId;

    const taskId = req.params.id;

    if (typeof taskId !== "string") {
      return res.status(400).json({
        message: "ID da tarefa inválido",
      });
    }

    const data = updateTaskSchema.parse(req.body);

    const task = await updateTask(taskId, userId, data);

    if (!task) {
      return res.status(404).json({
        message: "Tarefa não encontrada",
      });
    }

    return res.status(200).json(task);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.issues,
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const userId = (req as AuthenticatedRequest).userId;

    const taskId = req.params.id;

    if (typeof taskId !== "string") {
      return res.status(400).json({
        message: "ID da tarefa inválido",
      });
    }

    const deleted = await deleteTask(taskId, userId);

    if (!deleted) {
      return res.status(404).json({
        message: "Tarefa não encontrada",
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}
