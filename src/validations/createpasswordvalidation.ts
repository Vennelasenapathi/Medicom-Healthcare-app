import * as Yup from "yup";

export const createPasswordSchema = Yup.object({
  password: Yup.string()
    .required("Password is required")
    .min(
      8,
      "Password must be at least 8 characters"
    )
    .matches(
      /[A-Z]/,
      "Password must contain one uppercase letter"
    )
    .matches(
      /[0-9]/,
      "Password must contain one number"
    ),

  confirmPassword: Yup.string()
    .required("Please confirm your password")
    .oneOf(
      [Yup.ref("password")],
      "Passwords do not match"
    ),
});