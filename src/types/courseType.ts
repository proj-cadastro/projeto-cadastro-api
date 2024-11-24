import { CourseEnum } from './courseEnum';
import { ObjectId } from "mongodb";
import { ProfessorType } from "./professorType";

export type CourseType = {
  id?: ObjectId;
  name: string;
  codCourse: string;
  subjects?: string[];
  initialism: string;
  model: CourseEnum;
  professors?: ProfessorType[];
  coordinator?: ProfessorType;
};
