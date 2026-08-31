import React, { useEffect, useRef, useState } from "react";
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
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
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
            otpError || (touched.otp && !!errors.otp);

          const updateOTP = (index: number, text: string) => {
            const number = text.replace(/[^0-9]/g, "");
            const otp = values.otp.split("");

            if (!number) {
              otp[index] = "";
              setFieldValue("otp", otp.join(""));
              return;
            }

            otp[index] = number[number.length - 1];
            setFieldValue("otp", otp.join(""));
            setOtpError(false);

            if (index < 5) {
              inputRefs.current[index + 1]?.focus();
            } else {
              Keyboard.dismiss();
            }
          };

          return (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View className="flex-1 px-8 pt-[60px]">
                <BackButton
                  onPress={() => navigation.goBack()}
                />

                <ScreenHeader
                  title="Confirm OTP"
                  subtitle="Code has been sent"
                />

                <View className="mt-9 flex-row justify-between">
                  {Array.from({ length: 6 }).map((_, index) => {
                    const digit = values.otp[index] || "";

                    return (
                      <TextInput
                        key={index}
                        ref={(ref) => {
                          inputRefs.current[index] = ref;
                        }}
                        value={digit}
                        onChangeText={(text) =>
                          updateOTP(index, text)
                        }
                        onKeyPress={({ nativeEvent }) => {
                          if (
                            nativeEvent.key === "Backspace" &&
                            !digit &&
                            index > 0
                          ) {
                            inputRefs.current[index - 1]?.focus();
                          }
                        }}
                        keyboardType="number-pad"
                        maxLength={1}
                        textAlign="center"
                        selectTextOnFocus
                        className="h-[56px] w-[56px] rounded-xl  text-[16px] font-semibold "
                        style={{
                          backgroundColor:colors.background,
                          color:colors.textPrimary,
                          borderWidth: 1,
                          borderColor: hasError
                            ? colors.error
                            : digit
                            ? colors.primaryLight
                            : colors.borderLight,
                        }}
                      />
                    );
                  })}
                </View>

                {hasError && (
                  <Text className="mt-2 text-center text-[12px] " style={{color:colors.error}}>
                    {otpError
                      ? "Incorrect OTP. Please try again."
                      : errors.otp}
                  </Text>
                )}

                <View className="mt-5">
                  <AppButton
                    title="Submit"
                    onPress={() => {
                      setFieldTouched("otp", true);
                      handleSubmit();
                    }}
                  />
                </View>

                <View className="mt-7 flex-row justify-center">
                  <Text className="text-[14px] " style={{color:colors.textSecondary}}>
                    Didn't receive code?{" "}
                  </Text>

                  {timer > 0 ? (
                    <Text className="text-[14px] " style={{color:colors.textSecondary}}>
                      Resend in {timer}s
                    </Text>
                  ) : (
                    <Pressable onPress={handleResend}>
                      <Text className="text-[14px] font-medium " style={{color:colors.primaryDark}}>
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