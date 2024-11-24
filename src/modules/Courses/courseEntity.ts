import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";
import { ProfessorType } from "../../types/professorType";
import { CourseEnum } from "../../types/courseEnum";

@Entity("Courses")
export class CourseEntity {
  @ObjectIdColumn()
  id!: ObjectId;

  @Column({ unique: true })
  name!: string;

  @Column({ unique: true })
  codCourse!: string;

  @Column("simple-array")
  subjects!: string[];

  @Column({ unique: true })
  initialism!: string;

  @Column({ enum: CourseEnum, default: CourseEnum.INPERSON })
  model!: CourseEnum;

  @Column("simple-json")
  professors!: ProfessorType[];

  @Column("simple-json")
  coordinator!: ProfessorType;
}
