import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";

/* =====================================================
   VALIDATION
===================================================== */

const otpValidationSchema = Yup.object({
  otp: Yup.string()
    .required("OTP is required")
    .matches(
      /^[0-9]{6}$/,
      "Please enter a valid 6-digit OTP"
    ),
});

/* =====================================================
   COMPONENT
===================================================== */

export default function ConfirmOTP() {
  const router = useRouter();

  /* =====================================================
     OTP INPUT REFS
  ===================================================== */

  const inputRefs = useRef<
    Array<TextInput | null>
  >([]);

  /* =====================================================
     TIMER
  ===================================================== */

  const [timer, setTimer] = useState(30);

  /* =====================================================
     OTP ERROR
  ===================================================== */

  const [otpError, setOtpError] =
    useState(false);

  /* =====================================================
     DEMO OTP
  ===================================================== */

  const correctOTP = "123456";

  /* =====================================================
     RESEND TIMER
  ===================================================== */

  useEffect(() => {
    if (timer === 0) {
      return;
    }

    const interval = setInterval(() => {
      setTimer((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* =====================================================
     RESEND OTP
  ===================================================== */

  const handleResend = () => {
    if (timer > 0) {
      return;
    }

    setTimer(30);
    setOtpError(false);

    console.log("OTP resent");

    /*
      Later:
      Call your API here to send a new OTP.
    */
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : undefined
      }
    >
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={
          otpValidationSchema
        }
        onSubmit={(values) => {
          /* =========================================
             CHECK OTP
          ========================================= */

          if (values.otp.length !== 6) {
            setOtpError(true);
            return;
          }
          setOtpError(false);

          Keyboard.dismiss();

          router.push(
            "/forgot-password/create-password"
          );
        }}
      >
        {({
          values,
          errors,
          touched,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
        }) => (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <View className="flex-1 px-8 pt-[60px]">

              {/* =================================================
                  BACK BUTTON
              ================================================= */}

              <Pressable
                onPress={() =>
                  router.back()
                }
                className="h-[46px] w-[46px] items-center justify-center rounded-lg bg-[#2867FF]"
              >
                <Ionicons
                  name="chevron-back"
                  size={21}
                  color="#FFFFFF"
                />
              </Pressable>

              {/* =================================================
                  HEADING
              ================================================= */}

              <View className="mt-9">

                <Text className="text-[21px] font-bold text-[#011133]">
                  Confirm OTP
                </Text>

                <Text className="mt-3 text-[13px] text-[#989898]">
                   Code has been sent {/*23to{" "}
                  <Text className="font-medium text-[#246AFD]">
                    +91 9889877665
                  </Text> */}
                </Text>

              </View>

              {/* =================================================
                  OTP BOXES
              ================================================= */}

              <View className="mt-9 flex-row justify-between">

                {Array.from({
                  length: 6,
                }).map((_, index) => {

                  const digit =
                    values.otp[index] || "";

                  const hasError =
                    otpError ||
                    (touched.otp &&
                      !!errors.otp);

                  return (
                    <TextInput
                      key={index}
                      ref={(ref) => {
                        inputRefs.current[
                          index
                        ] = ref;
                      }}
                      value={digit}
                      onChangeText={(text) => {

                        /* =================================
                           ONLY ALLOW NUMBERS
                        ================================= */

                        const number =
                          text.replace(
                            /[^0-9]/g,
                            ""
                          );

                        if (!number) {
                          const newOTP =
                            values.otp
                              .split("");

                          newOTP[index] = "";

                          setFieldValue(
                            "otp",
                            newOTP.join("")
                          );

                          return;
                        }

                        /* =================================
                           UPDATE OTP
                        ================================= */

                        const newOTP =
                          values.otp
                            .split("");

                        newOTP[index] =
                          number[number.length - 1];

                        const finalOTP =
                          newOTP.join("");

                        setFieldValue(
                          "otp",
                          finalOTP
                        );

                        setOtpError(false);

                        /* =================================
                           MOVE TO NEXT BOX
                        ================================= */

                        if (
                          index < 5
                        ) {
                          inputRefs.current[
                            index + 1
                          ]?.focus();
                        }

                        /* =================================
                           LAST DIGIT
                        ================================= */

                        if (
                          index === 5
                        ) {
                          Keyboard.dismiss();
                        }
                      }}
                      onKeyPress={({
                        nativeEvent,
                      }) => {

                        /* =================================
                           BACKSPACE
                        ================================= */

                        if (
                          nativeEvent.key ===
                            "Backspace" &&
                          !digit &&
                          index > 0
                        ) {
                          inputRefs.current[
                            index - 1
                          ]?.focus();
                        }
                      }}
                      keyboardType="number-pad"
                      maxLength={1}
                      textAlign="center"
                      selectTextOnFocus
                      className="h-[56px] w-[56px] rounded-xl bg-[#F9FAFB] text-[16px] font-semibold text-[#011133]"
                      style={{
                        borderWidth: 1,
                        borderColor:
                          hasError
                            ? "#FF4D4F"
                            : digit
                            ? "#8DB2FF"
                            : "#EEEEEE",
                      }}
                    />
                  );
                })}

              </View>

              {/* =================================================
                  ERROR MESSAGE
              ================================================= */}

              {(otpError ||
                (touched.otp &&
                  errors.otp)) && (
                <Text className="mt-2 text-center text-[12px] text-[#FF4D4F]">
                  {otpError
                    ? "Incorrect OTP. Please try again."
                    : errors.otp}
                </Text>
              )}

              {/* =================================================
                  SUBMIT BUTTON
              ================================================= */}

              <Pressable
                onPress={() => {
                  setFieldTouched(
                    "otp",
                    true
                  );

                  handleSubmit();
                }}
                className="mt-9 h-[56px] flex-row items-center justify-center rounded-lg bg-[#2867FF]"
              >
                <Text className="text-[16px] font-semibold text-white">
                  Submit
                </Text>

                <Ionicons
                  name="chevron-forward"
                  size={16}
                  color="#FFFFFF"
                  style={{
                    marginLeft: 3,
                  }}
                />
              </Pressable>

              {/* =================================================
                  RESEND OTP
              ================================================= */}

              <View className="mt-7 flex-row justify-center">

                <Text className="text-[14px] text-[#989898]">
                  Didn't receive code?{" "}
                </Text>

                {timer > 0 ? (
                  <Text className="text-[4px] text-[#989898]">
                    Resend in {timer}s
                  </Text>
                ) : (
                  <Pressable
                    onPress={handleResend}
                  >
                    <Text className="text-[14px] font-medium text-[#246AFD]">
                      Resend
                    </Text>
                  </Pressable>
                )}

              </View>

            </View>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}