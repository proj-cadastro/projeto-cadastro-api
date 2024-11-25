import * as yup from "yup";
import { CourseEnum } from "../../types/courseEnum";

export const courseSchema = yup.object().shape({
  name: yup.string().required("Course name is required"),
  codCourse: yup.string().required("Course code is required"),
  initialism: yup.string().required("Course initialism is required"),
  model: yup
    .mixed()
    .oneOf(Object.values(CourseEnum), "Invalid course model")
    .required("Course model is required"),
  subjects: yup.array().of(yup.string().required("Subject must be a string")),
  professors: yup.array().of(
    yup.object().shape({
      id: yup.string().required("Professor ID is required"),
      name: yup.string().required("Professor name is required"),
    })
  ),
  coordinator: yup.object().shape({
    id: yup.string().required("Coordinator ID is required"),
    name: yup.string().required("Coordinator name is required"),
  }),
});
