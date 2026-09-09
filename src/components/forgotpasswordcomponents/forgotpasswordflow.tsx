import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Ionicons } from "@expo/vector-icons";
import PasswordField from "@/components/common/PasswordField";
import AppButton from "@/components/common/AppButton";
import InputField from "@/components/common/InputField";
import ScreenHeader from "@/components/common/ScreenHeader";
import SuccessModal from "@/components/common/SuccessModal";
import ModeToggle from "@/components/common/ModeToggle";

import { colors } from "@/constants/colors";

type Step = "forgot" | "otp" | "password";
type Mode = "email" | "phone";

interface Props {
  visible: boolean;
  onClose: () => void;
}

const forgotSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  phone: Yup.string()
    .matches(
      /^[0-9+\s()-]{10,15}$/,
      "Enter a valid phone number"
    )
    .required("Phone number is required"),
});

const passwordSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "Passwords do not match"
    )
    .required("Confirm password is required"),
});

export default function ForgotPasswordFlow({
  visible,
  onClose,
}: Props) {
  const [step, setStep] = useState<Step>("forgot");
  const [mode, setMode] = useState<Mode>("email");

  const [timer, setTimer] = useState(15);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [success, setSuccess] = useState(false);

  const otpRefs = useRef<(TextInput | null)[]>([]);

  /* TIMER */

  useEffect(() => {
    if (step !== "otp" || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [step, timer]);

  /* RESET */

  const resetFlow = () => {
    setStep("forgot");
    setMode("email");
    setTimer(15);
    setOtp("");
    setOtpError(false);
    setSuccess(false);
  };

  /* CLOSE */

  const handleClose = () => {
    resetFlow();
    onClose();
  };

  /* OTP */

  const updateOTP = (index: number, text: string) => {
    // Keep only numbers
    const digits = text.replace(/[^0-9]/g, "");

    // If user pastes the complete OTP
    if (digits.length > 1) {
      const pastedOTP = digits.slice(0, 6);
      setOtp(pastedOTP);
      setOtpError(false);

      // Focus the last filled box
      const nextIndex = Math.min(pastedOTP.length, 5);
      setTimeout(() => {
        if (pastedOTP.length === 6) {
          Keyboard.dismiss();
        } else {
          otpRefs.current[nextIndex]?.focus();
        }
      }, 50);
      return;
    }

    // Normal single digit typing
    const values = otp.split("");
    values[index] = digits;
    const newOTP = values.join("").slice(0, 6);
    setOtp(newOTP);
    setOtpError(false);

    // Move to next box
    if (digits && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }

    // OTP completed
    if (digits && index === 5) {
      Keyboard.dismiss();
    }
  };

  /* SUBMIT OTP */

  const submitOTP = () => {
    if (otp.length !== 6) {
      setOtpError(true);
      return;
    }
    setOtpError(false);
    setStep("password");
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios"  ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
        >

          {/* ================= FORGOT ================= */}

          {step === "forgot" && (
            <Formik
              initialValues={{ email: "",phone: "", }}
              onSubmit={() => {
                setTimer(15);
                setOtp("");
                setStep("otp");
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <View style={styles.content}>

                  <Pressable
                    style={styles.backButton}
                    onPress={handleClose}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={22}
                      color={colors.white}
                    />
                  </Pressable>

                  <ScreenHeader
                    title="Forgot Password?"
                    subtitle="Enter your details to reset your password"
                  />

                  <ModeToggle
                    mode={mode}
                    onChange={setMode}
                  />

                  {mode === "email" && (
                    <View style={styles.field}>
                      <Text style={styles.label}>
                        Email
                      </Text>
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
                    </View>
                  )}

                  {mode === "phone" && (
                    <View style={styles.field}>
                      <Text style={styles.label}>
                        Phone Number
                      </Text>
                      <InputField
                        icon="call-outline"
                        value={values.phone}
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                        placeholder="Enter your phone number"
                        keyboardType="phone-pad"
                        error={errors.phone}
                        touched={touched.phone}
                      />
                    </View>
                  )}

                  <View style={styles.button}>
                    <AppButton
                      title="Send OTP"
                      onPress={() => handleSubmit()}
                    />
                  </View>
                </View>
              )}
            </Formik>
          )}

          {/* ================= OTP ================= */}

          {step === "otp" && (
            <View style={styles.content}>
              <Pressable
                style={styles.backButton}
                onPress={() => setStep("forgot")}
              >
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={colors.white}
                />
              </Pressable>

              <ScreenHeader
                title="Confirm OTP"
                subtitle={`Code has been sent to your registered ${mode}`}
              />

              <View style={styles.otpContainer}>
                {Array.from({ length: 6 }).map(
                  (_, index) => {
                    const digit = otp[index] || "";

                    return (
                      <TextInput
                        key={index}
                        ref={(ref) => { otpRefs.current[index] = ref; }}
                        value={otp[index] || ""}
                        onChangeText={(text) => updateOTP(index, text) }
                        onKeyPress={({ nativeEvent, }) => {
                          if ( nativeEvent.key === "Backspace" && !digit &&  index > 0 ) {
                            otpRefs.current[ index - 1 ]?.focus();
                          }
                        }}
                        keyboardType="number-pad"
                        maxLength={6}
                        selectTextOnFocus
                        textAlign="center"
                        style={[
                          styles.otpInput,
                          {
                            borderColor: otpError
                              ? colors.error
                              : digit
                                ? colors.primaryLight
                                : colors.borderLight,
                          },
                        ]}
                      />
                    );
                  }
                )}
              </View>

              {otpError && (
                <Text style={styles.error}>
                  Incorrect OTP. Please try again.
                </Text>
              )}

              <View style={styles.button}>
                <AppButton
                  title="Submit"
                  onPress={submitOTP}
                />
              </View>

              <View style={styles.resend}>
                <Text style={styles.resendText}>
                  Didn't receive code?{" "}
                </Text>

                {timer > 0 ? (
                  <Text style={styles.resendText}>
                    Resend in {timer}s
                  </Text>
                ) : (
                  <Pressable
                    onPress={() => setTimer(15)}
                  >
                    <Text style={styles.resendButton}>
                      Resend
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}

          {/* ================= PASSWORD ================= */}

          {step === "password" && (
            <Formik
              initialValues={{
                password: "",
                confirmPassword: "",
              }}
              validationSchema={passwordSchema}
              onSubmit={() => {
                setSuccess(true);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
              }) => (
                <View style={styles.content}>

                  <Pressable
                    style={styles.backButton}
                    onPress={() => setStep("otp")}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={22}
                      color={colors.white}
                    />
                  </Pressable>

                  <ScreenHeader
                    title="Create New Password"
                    subtitle="Create a strong password for your account"
                  />

                  <View style={styles.field}>
                    <PasswordField
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      placeholder="Enter new password"
                      error={errors.password}
                      touched={touched.password}
                    />
                  </View>

                  <View style={styles.field}>
                    <PasswordField
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      placeholder="Confirm password"
                      error={errors.confirmPassword}
                      touched={touched.confirmPassword}
                    />
                  </View>

                  <View style={styles.button}>
                    <AppButton
                      title="Update Password"
                      onPress={() => handleSubmit()}
                    />
                  </View>
                </View>
              )}
            </Formik>
          )}
        </ScrollView>

        {/* SUCCESS */}

        {success && (
          <SuccessModal
            title="Password Updated"
            description="Your new password is ready to use."
            buttonTitle="Done"
            onPress={handleClose}
          />
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scroll: {
    flexGrow: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 9,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  field: {
    marginTop: 25,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },

  button: {
    marginTop: 30,
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
});