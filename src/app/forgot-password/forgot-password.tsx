import React, { useState } from "react";
import {
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
   TYPES
===================================================== */

type ForgotPasswordMode = "email" | "phone";

/* =====================================================
   EMAIL VALIDATION
===================================================== */

const emailValidationSchema = Yup.object({
  email: Yup.string()
    .trim()
    .required("Email is required")
    .email("Please enter a valid email"),
});

/* =====================================================
   PHONE VALIDATION
===================================================== */

const phoneValidationSchema = Yup.object({
  phone: Yup.string()
    .required("Phone number is required")
    .matches(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit phone number"
    ),
});

/* =====================================================
   COMPONENT
===================================================== */

export default function ForgotPassword() {
  const router = useRouter();
  const [mode, setMode] = useState<ForgotPasswordMode>("email");

  /* =====================================================
     SWITCH EMAIL / PHONE
  ===================================================== */

  const handleModeChange = (
    newMode: ForgotPasswordMode,
    resetForm: any
  ) => {
    setMode(newMode);

    // Clear old values and errors
    resetForm({
      values:
        newMode === "email"
          ? {
              email: "",
              phone: "",
            }
          : {
              email: "",
              phone: "",
            },
    });
  };

  /* =====================================================
     EMAIL FORM
  ===================================================== */

  if (mode === "email") {
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
            email: "",
            phone: "",
          }}
          validationSchema={emailValidationSchema}
          onSubmit={(values) => {
            console.log(
              "Email:",
              values.email
            );
            router.push(  "/forgot-password/otp" );
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
          }) => (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <View className="flex-1 px-8 pt-[60px]">

                {/* ================================================BACK BUTTON================================================= */}
                <Pressable
                  onPress={() => router.back() }
                  className="h-[46px] w-[46px] items-center justify-center rounded-xl bg-[#246AFD]"
                >
                  <Ionicons
                    name="chevron-back"
                    size={21}
                    color="#FFFFFF"
                  />
                </Pressable>

                {/* ================================================= HEADING ================================================= */}

                <View className="mt-9">
                  <Text className="text-[21px] font-bold text-[#011133]">
                    Forgot Password?
                  </Text>
                  <Text className="mt-3 text-[13px] text-[#989898]">
                    Enter your registered email to continue
                  </Text>
                </View>

                {/* ================================================= EMAIL / PHONE TOGGLE ================================================= */}

                <View className="mt-9 h-[52px] flex-row rounded-lg bg-[#F1F3F8] p-[3px]">

                  {/* EMAIL TAB */}

                  <Pressable
                    onPress={() =>
                      handleModeChange(
                        "email",
                        resetForm
                      )
                    }
                    className="flex-1 items-center justify-center rounded-md"
                    style={{
                      backgroundColor:
                        mode === "email"
                          ? "#FFFFFF"
                          : "transparent",
                    }}
                  >
                    <Text
                      className="text-[14px]"
                      style={{
                        color:
                          mode === "email"
                            ? "#246AFD"
                            : "#777777",
                        fontWeight:
                          mode === "email"
                            ? "600"
                            : "400",
                      }}
                    >
                      Email
                    </Text>
                  </Pressable>

                  {/* PHONE TAB */}

                  <Pressable
                    onPress={() =>
                      handleModeChange(
                        "phone",
                        resetForm
                      )
                    }
                    className="flex-1 items-center justify-center rounded-md"
                  >
                    <Text className="text-[14px] text-[#777777]">
                      Phone
                    </Text>
                  </Pressable>

                </View>

                {/* ================================================= EMAIL INPUT ================================================= */}

                <View className="mt-5">
                  <View
                    className="h-[56px] flex-row items-center rounded-lg bg-[#F9FAFB] px-3"
                    style={{
                      borderWidth: 1,
                      borderColor:
                        touched.email &&
                        errors.email
                          ? "#FF4D4F"
                          : "#8DB2FF",
                    }}
                  >

                    {/* EMAIL ICON */}
                    <Ionicons
                      name="mail-outline"
                      size={24}
                      color={
                        touched.email &&
                        errors.email
                          ? "#FF4D4F"
                          : "#246AFD"
                      }
                    />

                    {/* EMAIL INPUT */}
                    <TextInput
                      value={values.email}
                      onChangeText={handleChange( "email" )}
                      onBlur={handleBlur( "email" )}
                      placeholder="Enter your email"
                      placeholderTextColor="#989898"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      className="ml-2 flex-1 text-[14px] text-[#011133]"
                    />

                    {/* CHECKMARK */}

                    {values.email.length >  0 &&
                      !errors.email && (
                        <Ionicons
                          name="checkmark"
                          size={18}
                          color="#2867FF"
                        />
                      )}

                  </View>

                  {/* EMAIL ERROR */}

                  {touched.email && errors.email && (
                      <Text className="mt-1 text-[12px] text-[#FF4D4F]">
                        {errors.email}
                      </Text>
                    )}
                </View>

                {/* ================================================= RESET PASSWORD BUTTON ================================================= */}

                <Pressable
                  onPress={() => handleSubmit() }
                  className="mt-4 h-[56px] flex-row items-center justify-center rounded-lg bg-[#246AFD]"
                >

                  <Text className="text-[16px] font-semibold text-white">
                    Reset Password
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
              </View>
            </ScrollView>
          )}
        </Formik>
      </KeyboardAvoidingView>
    );
  }

  /* =====================================================
     PHONE FORM
  ===================================================== */

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
          email: "",
          phone: "",
        }}
        validationSchema={phoneValidationSchema}
        onSubmit={(values) => {
          console.log(
            "Phone:",
            values.phone
          );
          router.push( "/forgot-password/otp" );
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
        }) => (
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <View className="flex-1 px-8 pt-[60px]">

              {/* ================================================= BACK BUTTON ================================================= */}

              <Pressable
                onPress={() =>
                  router.back()
                }
                className="h-[46px] w-[46px] items-center justify-center rounded-xl bg-[#2867FF]"
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
                  Forgot Password?
                </Text>

                <Text className="mt-3 text-[13px] text-[#989898]">
                  Enter your registered phone number to continue
                </Text>

              </View>

              {/* =================================================
                  EMAIL / PHONE TOGGLE
              ================================================= */}

              <View className="mt-9 h-[52px] flex-row rounded-lg bg-[#F1F3F8] p-[3px]">

                {/* EMAIL */}

                <Pressable
                  onPress={() =>
                    handleModeChange(
                      "email",
                      resetForm
                    )
                  }
                  className="flex-1 items-center justify-center rounded-md"
                >
                  <Text className="text-[14px] text-[#777777]">
                    Email
                  </Text>
                </Pressable>

                {/* PHONE */}

                <Pressable
                  onPress={() =>
                    handleModeChange(
                      "phone",
                      resetForm
                    )
                  }
                  className="flex-1 items-center justify-center rounded-md bg-white"
                >
                  <Text className="text-[14px] font-semibold text-[#246AFD]">
                    Phone
                  </Text>
                </Pressable>

              </View>

              {/* =================================================
                  PHONE INPUT
              ================================================= */}

              <View className="mt-5">

                <View
                  className="h-[56px] flex-row items-center rounded-lg bg-[#F9FAFB] px-3"
                  style={{
                    borderWidth: 1,
                    borderColor:
                      touched.phone &&
                      errors.phone
                        ? "#FF4D4F"
                        : "#8DB2FF",
                  }}
                >

                  {/* PHONE ICON */}

                  <Ionicons
                    name="call-outline"
                    size={24}
                    color={
                      touched.phone &&
                      errors.phone
                        ? "#FF4D4F"
                        : "#246AFD"
                    }
                  />

                  {/* +91 */}

                  <Text className="ml-2 text-[16px] text-[#071B44]">
                    +91
                  </Text>

                  {/* PHONE INPUT */}

                  <TextInput
                    value={values.phone}
                    onChangeText={(text) => {
                      const numbersOnly =
                        text.replace(
                          /[^0-9]/g,
                          ""
                        );
                      if (
                        numbersOnly.length <= 10
                      ) {
                        handleChange(  "phone" )(numbersOnly);
                      }
                    }}
                    onBlur={handleBlur( "phone" )}
                    placeholder="Enter your phone number"
                    placeholderTextColor="#989898"
                    keyboardType="phone-pad"
                    maxLength={10}
                    className="ml-2 flex-1 text-[14px] text-[#011133]"
                  />

                  {/* CHECKMARK */}

                  {values.phone.length === 10 &&
                    !errors.phone && (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color="#2867FF"
                      />
                    )}

                </View>

                {/* PHONE ERROR */}

                {touched.phone && errors.phone && (
                    <Text className="mt-1 text-[9px] text-[#FF4D4F]">
                      {errors.phone}
                    </Text>
                  )}

              </View>

              {/* =================================================
                  RESET PASSWORD
              ================================================= */}

              <Pressable
                onPress={() => handleSubmit() }
                className="mt-4 h-[56px] flex-row items-center justify-center rounded-lg bg-[#2867FF]"
              >
                <Text className="text-[16px] font-semibold text-white">
                  Reset Password
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
            </View>
          </ScrollView>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
}