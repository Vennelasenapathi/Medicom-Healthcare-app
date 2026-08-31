import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { Formik } from "formik";

import BackButton from "@/components/forgotpasswordcomponents/BackButton";
import ScreenHeader from "@/components/common/ScreenHeader";
import AppButton from "@/components/common/AppButton";
import InputField from "@/components/common/InputField";
import ModeToggle from "@/components/forgotpasswordcomponents/ModeToggle";

import {
  emailValidationSchema,
  phoneValidationSchema,
} from "@/validations/forgotpassword";

type ForgotPasswordMode = "email" | "phone";

export default function ForgotPassword({
  navigation,
}: any) {
  const [mode, setMode] =
    useState<ForgotPasswordMode>("email");

  const initialValues = {
    email: "",
    phone: "",
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
        initialValues={initialValues}
        validationSchema={
          mode === "email"
            ? emailValidationSchema
            : phoneValidationSchema
        }
        onSubmit={(values) => {
          console.log(
            mode === "email"
              ? `Email: ${values.email}`
              : `Phone: ${values.phone}`
          );

          navigation.navigate("otp");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          resetForm,
        }) => {
          const changeMode = (
            newMode: ForgotPasswordMode
          ) => {
            setMode(newMode);

            resetForm({
              values: {
                email: "",
                phone: "",
              },
            });
          };

          return (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <View className="flex-1 px-8 pt-[60px]">

                {/* BACK */}
                <BackButton
                  onPress={() =>
                    navigation.goBack()
                  }
                />

                {/* HEADER */}
                <ScreenHeader
                  title="Forgot Password?"
                  subtitle={
                    mode === "email"
                      ? "Enter your registered email to continue"
                      : "Enter your registered phone number to continue"
                  }
                />

                {/* EMAIL / PHONE */}
                <ModeToggle
                  mode={mode}
                  onChange={changeMode}
                />

                {/* EMAIL */}
                {mode === "email" && (
                  <View className="mt-5 ">
                    <InputField
                      icon="mail-outline"
                      value={values.email}
                      onChangeText={handleChange(
                        "email"
                      )}
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

                {/* PHONE */}
                {mode === "phone" && (
                  <View className="mt-5 ">
                    <InputField
                      icon="call-outline"
                      value={values.phone}
                      onChangeText={(text) => {
                        const numbers =
                          text.replace(
                            /[^0-9]/g,
                            ""
                          );

                        if (numbers.length <= 10) {
                          handleChange("phone")(
                            numbers
                          );
                        }
                      }}
                      onBlur={handleBlur("phone")}
                      placeholder="Enter your phone number"
                      keyboardType="phone-pad"
                      maxLength={10}
                      prefix="+91"
                      error={errors.phone}
                      touched={touched.phone}
                    />
                  </View>
                )}

                {/* RESET PASSWORD */}
                <View style={{marginTop:30}}>
                <AppButton
                  title="Reset Password"
                  onPress={() => handleSubmit()}
                />
                </View>
              </View>
            </ScrollView>
          );
        }}
      </Formik>
    </KeyboardAvoidingView>
  );
}