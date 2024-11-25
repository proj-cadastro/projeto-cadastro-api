import * as yup from "yup";
import { titrationEnum } from "../../types/titrationEnum";

export const professorSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  titration: yup
    .mixed()
    .oneOf(Object.values(titrationEnum), "Invalid titration value")
    .required("Titration is required"),
  coursesId: yup.array().of(yup.string().required("Course ID must be a string")).required("Courses are required"),
  unitId: yup.string().required("Unit ID is required"),
  reference: yup.string().required("Reference is required"),
  lattes: yup.string().url("Invalid Lattes URL").required("Lattes URL is required"),
  activityStatus: yup.string().required("Activity status is required"),
  notes: yup.string().required("Notes are required"),
});
