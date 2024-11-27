import { ObjectId } from "mongodb";
import { AppDataSource } from "../../data-source";
import { CourseType } from "../../types/courseType";
import { CourseEntity } from "./courseEntity";
import { CourseEnum } from "../../types/courseEnum";

const courseRepository = AppDataSource.getRepository(CourseEntity);

export async function findAllCourseService() {
  return await courseRepository.find();
}

export async function createCourseService(courseData: CourseType) {
  const newCourse = courseRepository.create({
    ...courseData,
    model: courseData.model ? courseData.model : CourseEnum.INPERSON,
  });
  return await courseRepository.save(newCourse);
}

export async function updateCourseService(courseId: ObjectId, courseData: CourseType) {
  const course = await courseRepository.findOneBy({ _id: courseId });

  if (!course) return null;

  await courseRepository.update({ _id: courseId }, courseData);
  return await courseRepository.findOneBy({ _id: courseId });
}

export async function deleteCourseService(courseId: ObjectId) {
  const course = await courseRepository.findOneBy({ _id: courseId });

  if (!course) return null;

  await courseRepository.delete({ _id: courseId });
  return course;
}

export async function findCourseByIdService(courseId: ObjectId): Promise<CourseType | null> {
  return await courseRepository.findOneBy({ _id: courseId });
}