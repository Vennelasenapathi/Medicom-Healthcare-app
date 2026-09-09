import React, { useRef } from "react";
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Formik } from "formik";
import BackButton from "@/components/common/BackButton";
import ScreenHeader from "@/components/common/ScreenHeader";
import AppButton from "@/components/common/AppButton";
import InputField from "@/components/common/InputField";
import PasswordField from "@/components/common/PasswordField";
import ModeToggle from "@/components/common/ModeToggle";
import {emailValidationSchema,phoneValidationSchema,otpValidationSchema,} from "@/validations/forgotpassword";
import { createPasswordSchema } from "@/validations/createpasswordvalidation";
import { colors } from "@/constants/colors";

type Step = "forgot" | "otp" | "password";
type Mode = "email" | "phone";

type Props = {
  step: Step;
  mode: Mode;
  timer: number;
  otpError: boolean;
  onModeChange: (mode: Mode) => void;
  onForgotNext: () => void;
  onOtpNext: () => void;
  onBack: () => void;
  onOtpChange: (otp: string) => void;
  onResend: () => void;
  onPasswordSuccess: () => void;
};

export default function ForgotPasswordSteps({
  step,
  mode,
  timer,
  otpError,
  onModeChange,
  onForgotNext,
  onOtpNext,
  onBack,
  onOtpChange,
  onResend,
  onPasswordSuccess,
}: Props) {
  if (step === "forgot") {
    return (
      <Formik
        initialValues={{ email: "", phone: "" }}
        validationSchema={ mode === "email"  ? emailValidationSchema  : phoneValidationSchema  }
        onSubmit={onForgotNext}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
        }) => (
          <View style={styles.container}>
            <BackButton onPress={onBack} />

            <ScreenHeader
              title="Forgot Password?"
              subtitle={
                mode === "email"
                  ? "Enter your registered email to continue"  : "Enter your registered phone number to continue"
              }
            />

            <ModeToggle
              mode={mode}
              onChange={(newMode) => {
                onModeChange(newMode);
                resetForm();
              }}
            />

            <View style={styles.field}>
              {mode === "email" ? (
                <InputField
                  icon="mail-outline"
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  error={errors.email}
                  touched={touched.email}
                />
              ) : (
                <InputField
                  icon="call-outline"
                  value={values.phone}
                  onChangeText={(text) => handleChange("phone")( text.replace(/[^0-9]/g, "").slice(0, 10)  )}
                  onBlur={handleBlur("phone")}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  prefix="+91"
                  error={errors.phone}
                  touched={touched.phone}
                />
              )}
            </View>

            <View style={styles.button}>
              <AppButton
                title="Reset Password"
                onPress={() => handleSubmit()}
              />
            </View>
          </View>
        )}
      </Formik>
    );
  }

  if (step === "otp") {
    return (
      <Formik
        initialValues={{ otp: "" }}
        validationSchema={otpValidationSchema}
        onSubmit={(values) => {
          if (values.otp.length === 6) onOtpNext();
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <View style={styles.container}>
            <BackButton onPress={onBack} />
            <ScreenHeader
              title="Confirm OTP"
              subtitle="Code has been sent to your registered number"
            />

            <OTPInput
              otp={values.otp}
              error={otpError}
              onChange={(value) => {
                setFieldValue("otp", value);
                onOtpChange(value);
              }}
            />

            <View style={styles.button}>
              <AppButton
                title="Submit"
                onPress={() => handleSubmit()}
              />
            </View>

            <View style={styles.resend}>
              <Text style={styles.resendText}> Didn't receive code?{" "} </Text>

              {timer > 0 ? (
                <Text style={styles.resendText}> Resend in {timer}s</Text>
              ) : (
                <Pressable onPress={onResend}>
                  <Text style={styles.resendButton}> Resend </Text>
                </Pressable>
              )}
            </View>
          </View>
        )}
      </Formik>
    );
  }
if (step === "password") {
  return (
    <Formik
      initialValues={{  password: "", confirmPassword: "", }}
      validationSchema={createPasswordSchema}
      onSubmit={() => {
        Keyboard.dismiss();
        onPasswordSuccess();
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldTouched,
      }) => (
        <View style={styles.container}>
          <BackButton onPress={onBack} />

          <ScreenHeader
            title="Create new password"
            subtitle="Create a new password to login"
          />

          <View style={styles.field}>
            <PasswordField
              value={values.password || ""}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="Enter new password"
              error={errors.password}
              touched={touched.password}
            />
          </View>

          <View style={styles.field}>
            <PasswordField
              value={values.confirmPassword || ""}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              placeholder="Confirm password"
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
          </View>

          <View style={styles.button}>
            <AppButton
              title="Save"
              onPress={() => {
                setFieldTouched("password", true);
                setFieldTouched("confirmPassword", true);
                handleSubmit();
              }}
            />
          </View>
        </View>
      )}
    </Formik>
  );
}
}

function OTPInput({  otp, error, onChange,}: {
  otp?: string;
  error?: boolean;
  onChange: (otp: string) => void; }) {
  const refs = useRef<(TextInput | null)[]>([]);
  // Prevent undefined error
  const currentOtp = otp ?? "";

  const updateOTP = (index: number, text: string) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const values = currentOtp.split("");
    values[index] = digit;
    onChange(values.join(""));

    if (digit && index < 5) {
      refs.current[index + 1]?.focus();
    }

    if (digit && index === 5) {
      Keyboard.dismiss();
    }
  };

  return (
    <View>
      <View style={styles.otpContainer}>
        {Array.from({ length: 6 }).map((_, index) => {
          const digit = currentOtp[index] || "";
          return (
            <TextInput
              key={index}
              ref={(ref) => { refs.current[index] = ref;  }}
              value={digit}
              onChangeText={(text) => updateOTP(index, text)}
              onKeyPress={({ nativeEvent }) => {
                if ( nativeEvent.key === "Backspace" && !digit &&  index > 0 ) {
                  refs.current[index - 1]?.focus();
                }
              }}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              textAlign="center"
              style={[ styles.otpInput,
                {
                  borderColor: error
                    ? colors.error
                    : digit
                    ? colors.primaryLight  : colors.borderLight,
                },
              ]}
            />
          );
        })}
      </View>

      {error && (
        <Text style={styles.error}>
          Incorrect OTP. Please try again.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  field: {
    marginTop: 22,
  },

  button: {
    marginTop: 30,
  },

  resend: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "center",
  },

  resendText: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  resendButton: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryDark,
  },

  otpContainer: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.background,
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  error: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 12,
    color: colors.error,
  },
});