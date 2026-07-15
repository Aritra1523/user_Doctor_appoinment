import * as yup from "yup";

export const registerSchema = yup.object({
  first_name: yup.string().required("First name is required"),

  last_name: yup.string().required("Last name is required"),

  email: yup
    .string()
    .email("Invalid email")
    .required("Email is required"),

  address: yup.string().required("Address is required"),

  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required(),

  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required(),
});