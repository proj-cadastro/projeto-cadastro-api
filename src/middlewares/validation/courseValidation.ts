import * as yup from "yup";
import { CourseEnum } from "../../types/courseEnum";

export const courseSchema = yup.object().shape({
  name: yup
    .string()
    .required("Course name is required"),

  codCourse: yup
    .string()
    .matches(/^\d{3,5}$/, "Course code must contain 3 to 5 numeric digits")
    .required("Course code is required"),

  initialism: yup
    .string()
    .matches(/^[A-Za-z]{2,4}$/, "Initialism must contain 2 to 4 alphabetical characters")
    .notRequired(),

  model: yup
    .mixed()
    .oneOf(Object.values(CourseEnum), "Invalid course model")
    .required("Course model is required"),

  subjects: yup
    .array()
    .of(yup.string().required("Subject must be a string")),

  professors: yup
    .array()
    .of(
      yup.object().shape({
        id: yup
          .string()
          .notRequired()
      })
    )
    .notRequired(),

  coordinator: yup
    .object()
    .shape({
      id: yup
        .string()
        .notRequired(),
    })
    .required("Coordinator is required"),
});
