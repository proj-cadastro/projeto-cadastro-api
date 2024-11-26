import * as yup from "yup";
import { titrationEnum } from "../../types/titrationEnum";
import { ObjectId } from "mongodb";
import { activityStatusEnum } from "../../types/activityStatusEnum";

export const professorSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  titration: yup
    .mixed()
    .oneOf(Object.values(titrationEnum), "Invalid titration value")
    .required("Titration is required"),

  coursesId: yup
    .array()
    .of(
      yup
        .string()
        .test(
          "is-object-id",
          "Each course ID must be a valid ObjectId",
          (value) => ObjectId.isValid(value || "")
        )
        .required("Course ID is required")
    ),
    
  unitId: yup
    .string()
    .matches(/^\d{3}$/, "Unit ID must contain exactly 3 digits")
    .required("Unit ID is required"),

  reference: yup
    .string()
    .matches(
      /^PES (I|II|III) - [A-H]$/,
      "Reference must be in the format 'PES I - A', 'PES II - B', etc."
    )
    .required("Reference is required"),

  lattes: yup
    .string()
    .url("Invalid Lattes URL")
    .required("Lattes URL is required"),

  activityStatus: yup
    .mixed()
    .oneOf(Object.values(activityStatusEnum), "Invalid activity status")
    .required("Activity status is required"),

  notes: yup.string(),
});
