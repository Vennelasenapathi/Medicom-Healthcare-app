import * as Yup from "yup";

export const profileSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),

  phone: Yup.string()
    .matches(
      /^[0-9+\s()-]{10,15}$/,
      "Enter a valid phone number"
    )
    .required("Phone number is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  dob: Yup.string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Use DD/MM/YYYY"
    )
    .required("Date of birth is required"),
});