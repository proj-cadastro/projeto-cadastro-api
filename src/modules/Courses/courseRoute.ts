import { Router } from "express";
import * as courseController from "./courseController";
import { Request, Response } from "express";
import { validateSchema } from "../../middlewares/validateSchema";
import { courseSchema } from './../../middlewares/validation/courseValidation';
import { authenticateToken } from "../../middlewares/authMiddleware";

const courseRouter = Router();

courseRouter.get("/", authenticateToken, (req: Request, res: Response) => {
  courseController.findAllCourses(req, res);
});

courseRouter.get("/:id", authenticateToken, (req: Request, res: Response) => {
  courseController.findCourseById(req, res);
});

courseRouter.post("/", authenticateToken, validateSchema(courseSchema), (req: Request, res: Response) => {
  courseController.createCourse(req, res);
});

courseRouter.put("/:id", authenticateToken, validateSchema(courseSchema), (req: Request, res: Response) => {
  courseController.updateCourse(req, res);
});

courseRouter.delete("/:id", authenticateToken, (req: Request, res: Response) => {
  courseController.deleteCourse(req, res);
});

export { courseRouter };
