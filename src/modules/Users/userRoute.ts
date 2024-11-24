import { Router } from "express";
import * as UserController from "./userController";
import { Request, Response } from "express";

const userRouter = Router();

userRouter.get("/", (req: Request, res: Response) => {
    UserController.findAllUsers(req, res);
});

userRouter.get("/:id", (req: Request, res: Response) => {
    UserController.findUserById(req, res);
});

userRouter.post("/", (req: Request, res: Response) => {
    UserController.createUser(req, res);
});

userRouter.delete("/:id", (req: Request, res: Response) => {
    UserController.deleteUser(req, res);
});

export { userRouter }