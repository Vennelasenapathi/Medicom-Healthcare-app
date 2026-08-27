import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email"),

  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});


export const signupValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),

  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email"),

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

  dob: Yup.string()
    .required("Date of birth is required")
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Use DD/MM/YYYY"
    ),

  gender: Yup.string()
    .required("Please select your gender"),

  height: Yup.string()
    .required("Height is required")
    .matches(
      /^[0-9]+(\.[0-9]+)?$/,
      "Enter a valid height"
    )
    .test(
      "height-range",
      "Height must be between 50 and 250 cm",
      (value) => {
        if (!value) return false;

        const height = Number(value);

        return height >= 50 && height <= 250;
      }
    ),

  weight: Yup.string()
    .required("Weight is required")
    .matches(
      /^[0-9]+(\.[0-9]+)?$/,
      "Enter a valid weight"
    )
    .test(
      "weight-range",
      "Weight must be between 2 and 500 kg",
      (value) => {
        if (!value) return false;

        const weight = Number(value);

        return weight >= 2 && weight <= 500;
      }
    ),

  terms: Yup.boolean().oneOf(
    [true],
    "Please accept the Terms of Service and Privacy Policy"
  ),
});