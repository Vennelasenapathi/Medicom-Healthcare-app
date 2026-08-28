import * as Yup from "yup";

export const emailValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email"),
});

/* =====================================================PHONE VALIDATION===================================================== */

export const phoneValidationSchema = Yup.object({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit phone number"
    ),
});

export const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .matches(
      /^[0-9]{6}$/,
      "Please enter a valid 6-digit OTP"
    ),
});
