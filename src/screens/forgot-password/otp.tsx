import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Formik } from "formik";

import BackButton from "@/components/forgotpasswordcomponents/BackButton";
import ScreenHeader from "@/components/common/ScreenHeader";
import AppButton from "@/components/common/AppButton";
import { otpValidationSchema } from "@/validations/forgotpassword";
import { colors } from "@/constants/colors";

export default function ConfirmOTP({ navigation }: any) {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [timer, setTimer] = useState(1);
  const [otpError, setOtpError] = useState(false);

  useEffect(() => {
    if (!timer) return;

    const interval = setInterval(
      () => setTimer((prev) => prev - 1),
      1000
    );

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (timer > 0) return;

    setTimer(15);
    setOtpError(false);

    console.log("OTP resent");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <Formik
        initialValues={{ otp: "" }}
        validationSchema={otpValidationSchema}
        onSubmit={(values) => {
          if (values.otp.length !== 6) {
            setOtpError(true);
            return;
          }

          setOtpError(false);
          Keyboard.dismiss();
          navigation.navigate("createpassword");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
        }) => {
          const hasError =
            otpError ||
            (touched.otp && !!errors.otp);

          const updateOTP = (
            index: number,
            text: string
          ) => {
            const number = text.replace(
              /[^0-9]/g,
              "" );

            const otp = values.otp.split("");

            if (!number) {
              otp[index] = "";
              setFieldValue( "otp", otp.join("") );
              return;
            }

            otp[index] = number[number.length - 1];

            setFieldValue( "otp", otp.join("")  );
            setOtpError(false);

            if (index < 5) {
              inputRefs.current[ index + 1 ]?.focus();
            } else {
              Keyboard.dismiss();
            }
          };

          return (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                styles.scrollContent
              }
            >
              <View style={styles.content}>

                {/* BACK */}
                <BackButton onPress={() =>  navigation.goBack()  } />

                {/* HEADER */}
                <ScreenHeader
                  title="Confirm OTP"
                  subtitle="Code has been sent"
                />

                {/* OTP INPUTS */}
                <View style={styles.otpContainer}>
                  {Array.from({ length: 6, }).map((_, index) => {
                    const digit = values.otp[index] || "";

                    return (
                      <TextInput
                        key={index}
                        ref={(ref) => { inputRefs.current[  index ] = ref;  }}
                        value={digit}
                        onChangeText={(text) => updateOTP(index, text) }
                        onKeyPress={({ nativeEvent, }) => {
                          if (
                            nativeEvent.key === "Backspace" &&
                            !digit &&
                            index > 0
                          ) {
                            inputRefs.current[ index - 1 ]?.focus();
                          }
                        }}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                        selectTextOnFocus
                        style={[
                          styles.otpInput,
                          {
                            backgroundColor: colors.background,
                            color:  colors.textPrimary,
                            borderColor: hasError
                              ? colors.error
                              : digit
                              ? colors.primaryLight  : colors.borderLight,
                          },
                        ]}
                      />
                    );
                  })}
                </View>

                {/* ERROR */}
                {hasError && (
                  <Text style={[  styles.errorText,  { color: colors.error, }, ]}  >
                    {otpError
                      ? "Incorrect OTP. Please try again."
                      : errors.otp}
                  </Text>
                )}

                {/* SUBMIT */}
                <View style={styles.submitContainer}>
                  <AppButton
                    title="Submit"
                    onPress={() => { setFieldTouched( "otp", true  );
                      handleSubmit();
                    }}
                  />
                </View>

                {/* RESEND */}
                <View style={styles.resendContainer}>
                  <Text
                    style={[
                      styles.resendText,
                      { color: colors.textSecondary, }, ]}
                  >
                    Didn't receive code?{" "}
                  </Text>

                  {timer > 0 ? (
                    <Text
                      style={[
                        styles.resendText,
                        { color: colors.textSecondary, }, ]}
                    >
                      Resend in {timer}s
                    </Text>
                  ) : (
                    <Pressable  onPress={handleResend} >
                      <Text
                        style={[
                          styles.resendText,
                          styles.resendButton,
                          { color: colors.primaryDark,  },
                        ]}
                      >
                        Resend
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </ScrollView>
          );
        }}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  scrollContent: {
    flexGrow: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
  },

  otpContainer: {
    marginTop: 36,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  otpInput: {
    width: 56,
    height: 56,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    fontWeight: "600",
  },

  errorText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 12,
  },

  submitContainer: {
    marginTop: 20,
  },

  resendContainer: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "center",
  },

  resendText: {
    fontSize: 14,
  },

  resendButton: {
    fontWeight: "500",
  },
});