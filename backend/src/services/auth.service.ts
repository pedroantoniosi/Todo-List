import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import prisma from "../lib/prisma.js";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

function generateToken(userId: string) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET não configurado");
  }

  return jwt.sign(
    {
      userId,
    },
    secret,
    {
      expiresIn: "7d",
    },
  );
}

export async function registerUser({ name, email, password }: RegisterData) {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email já cadastrado");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
  });

  const token = generateToken(user.id);

  return {
    user,
    token,
  };
}

export async function loginUser({ email, password }: LoginData) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Email ou senha inválidos");
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);

  if (!passwordMatches) {
    throw new Error("Email ou senha inválidos");
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
}
