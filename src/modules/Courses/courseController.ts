import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as courseService from "./courseService";
import { CourseType } from "../../types/courseType";

export async function findAllCourses(req: Request, res: Response) {
  try {
    const result = await courseService.findAllCourseService();

    if (!result || result.length === 0)
      return res.status(404).send({ message: "No courses found" });

    return res.status(200).send(result);
  } catch (error) {
    return res.status(400).send({ message: "Bad request at function findAllCourses" });
  }
}

export async function createCourse(req: Request, res: Response) {
  try {
    const courseData = req.body;
    const newCourse = await courseService.createCourseService(courseData);

    if (!newCourse)
      return res.status(400).send({ message: "Error creating course" });

    return res.status(201).send({ message: "Course created successfully" });
  } catch (error) {
    return res.status(400).send({ message: "Error creating course" });
  }
}

export async function updateCourse(req: Request, res: Response) {
  try {
    const courseId = req.params.id;
    const courseData = req.body;

    if (!ObjectId.isValid(courseId) || !courseData)
      return res.status(400).send({ message: "Course id or data not provided." });

    const updatedCourse = await courseService.updateCourseService(new ObjectId(courseId), courseData);

    if (!updatedCourse)
      return res.status(404).send({ message: "Course not found or could not be updated" });

    return res.status(200).send({ message: "Course successfully updated.", course: updatedCourse });
  } catch (error) {
    return res.status(500).send({ message: "Error updating the course." });
  }
}

export async function deleteCourse(req: Request, res: Response) {
  try {
    const courseId = req.params.id;

    if (!courseId || !ObjectId.isValid(courseId))
      return res.status(400).send({ message: "Course id not provided." });

    const deletedCourse = await courseService.deleteCourseService(new ObjectId(courseId));

    if (!deletedCourse)
      return res.status(404).send({ message: "Course not found or could not be deleted." });

    return res.status(200).send({ message: "The course has been successfully deleted!" });
  } catch (error) {
    return res.status(500).send({ message: "Error deleting the course." });
  }
}
