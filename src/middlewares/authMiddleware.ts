import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { UserAcess } from "../types/userAcess";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).send({ message: "Token is required" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; email: string; type: UserAcess };
    req.user = decoded; // Adiciona a propriedade `user` ao objeto `req`
    next(); // Passa para o próximo middleware
  } catch (error) {
    res.status(403).send({ message: "Invalid or expired token" });
  }
};
