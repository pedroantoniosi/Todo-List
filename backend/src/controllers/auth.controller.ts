import type { Request, Response } from "express";
import { z } from "zod";

import { loginUser, registerUser } from "../services/auth.service.js";

const registerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  email: z.string().trim().email("Email inválido").max(254, "Email inválido"),

  password: z
    .string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(128, "Senha deve ter no máximo 128 caracteres"),
});

const loginSchema = z.object({
  email: z.string().trim().email("Email inválido").max(254, "Email inválido"),

  password: z.string().min(1, "Senha é obrigatória").max(128, "Senha inválida"),
});

export async function register(req: Request, res: Response) {
  try {
    const data = registerSchema.parse(req.body);

    const result = await registerUser(data);

    return res.status(201).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.issues,
      });
    }

    if (error instanceof Error && error.message === "Email já cadastrado") {
      return res.status(409).json({
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const data = loginSchema.parse(req.body);

    const result = await loginUser(data);

    return res.status(200).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Dados inválidos",
        errors: error.issues,
      });
    }

    if (
      error instanceof Error &&
      error.message === "Email ou senha inválidos"
    ) {
      return res.status(401).json({
        message: error.message,
      });
    }

    console.error(error);

    return res.status(500).json({
      message: "Erro interno do servidor",
    });
  }
}
