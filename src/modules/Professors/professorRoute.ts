import { Router } from "express";
import * as ProfessorController from "./professorController";
import { Request, Response } from "express";
import { validateSchema } from "../../middlewares/validateSchema";
import { professorSchema } from "../../middlewares/validation/professorValidation";
import { authenticateToken } from "../../middlewares/authMiddleware";

const professorRouter = Router();

professorRouter.get("/", /*authenticateToken,*/ (req: Request, res: Response) => {
    ProfessorController.findAllProfessors(req, res);
});

professorRouter.get("/:id", /*authenticateToken,*/ (req: Request, res: Response) => {
    ProfessorController.findProfessorById(req, res);
});

professorRouter.post("/", /*authenticateToken,*/ validateSchema(professorSchema), (req: Request, res: Response) => {
    ProfessorController.createProfessor(req, res);
});

professorRouter.put("/:id", /*authenticateToken,*/ (req: Request, res: Response) => {
    ProfessorController.updateProfessor(req, res);
});

professorRouter.delete("/:id", /*authenticateToken,*/ (req: Request, res: Response) => {
    ProfessorController.deleteProfessor(req, res);
});

export { professorRouter };
