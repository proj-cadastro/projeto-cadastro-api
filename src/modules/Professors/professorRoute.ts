import { Router } from "express";
import * as ProfessorController from "./professorController";
import { Request, Response } from "express";
import { validateSchema } from "../../middlewares/validateSchema";
import { professorSchema } from "../../middlewares/validation/professorValidation";

const professorRouter = Router();

professorRouter.get("/", (req: Request, res: Response) => {
    ProfessorController.findAllProfessors(req, res);
});

professorRouter.get("/:id", (req: Request, res: Response) => {
    ProfessorController.findProfessorById(req, res);
});

professorRouter.post("/", (req: Request, res: Response) => {
    validateSchema(professorSchema),
    ProfessorController.createProfessor(req, res);
});

professorRouter.put("/:id", (req: Request, res: Response) => {
    ProfessorController.updateProfessor(req, res);
});

professorRouter.delete("/:id", (req: Request, res: Response) => {
    ProfessorController.deleteProfessor(req, res);
});

export { professorRouter };
