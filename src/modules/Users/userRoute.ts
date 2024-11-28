import { Router } from "express";
import * as UserController from "./userController";
import { Request, Response } from "express";
import { validateSchema } from "../../middlewares/validateSchema";
import { userSchema } from "../../middlewares/validation/userValidation";
import { authenticateToken } from "../../middlewares/authMiddleware";

const userRouter = Router();

userRouter.get("/", /*authenticateToken,*/ (req: Request, res: Response) => {
    UserController.findAllUsers(req, res);
});

userRouter.get("/:id", /*authenticateToken,*/ (req: Request, res: Response) => {
    UserController.findUserById(req, res);
});

userRouter.post("/", validateSchema(userSchema), (req: Request, res: Response) => {
    UserController.createUser(req, res);
});

userRouter.delete("/:id", /*authenticateToken,*/ (req: Request, res: Response) => {
    UserController.deleteUser(req, res);
});

export { userRouter }