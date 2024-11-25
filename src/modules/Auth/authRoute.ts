import { Router } from "express";
import * as AuthController from "./authController";
import { Request, Response } from "express";

const authRouter = Router();

authRouter.post("/login", (req: Request, res: Response) => {
    AuthController.login(req, res);
});

export { authRouter };
