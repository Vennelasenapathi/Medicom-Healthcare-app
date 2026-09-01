import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  StyleSheet,
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

export default function ForgotPassword({ navigation }: any) {
  const [mode, setMode] =
    useState<ForgotPasswordMode>("email");

  const initialValues = {
    email: "",
    phone: "",
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
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
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.content}>

                {/* BACK */}
                <BackButton
                  onPress={() => navigation.goBack()}
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
                  <View style={styles.inputContainer}>
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

                {/* PHONE */}
                {mode === "phone" && (
                  <View style={styles.inputContainer}>
                    <InputField
                      icon="call-outline"
                      value={values.phone}
                      onChangeText={(text) => {
                        const numbers = text.replace(
                          /[^0-9]/g,
                          ""
                        );

                        if (numbers.length <= 10) {
                          handleChange("phone")(numbers);
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
                <View style={styles.buttonContainer}>
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

  inputContainer: {
    marginTop: 20,
  },

  buttonContainer: {
    marginTop: 30,
  },
});