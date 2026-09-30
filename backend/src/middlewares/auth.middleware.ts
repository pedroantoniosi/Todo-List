import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
  userId: string;
}

interface JwtPayload {
  userId: string;
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({
      message: "Token não informado",
    });
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Token inválido",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      message: "JWT_SECRET não configurado",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (
      typeof decoded !== "object" ||
      decoded === null ||
      !("userId" in decoded) ||
      typeof decoded.userId !== "string"
    ) {
      return res.status(401).json({
        message: "Token inválido",
      });
    }

    const payload = decoded as JwtPayload;

    (req as AuthenticatedRequest).userId = payload.userId;

    next();
  } catch {
    return res.status(401).json({
      message: "Token inválido ou expirado",
    });
  }
}
