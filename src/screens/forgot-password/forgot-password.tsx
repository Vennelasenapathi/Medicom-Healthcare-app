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
import { Formik } from "formik";
import BackButton from "@/components/BackButton";
import ScreenHeader from "@/components/ScreenHeader";
import { emailValidationSchema,phoneValidationSchema } from "@/validations/forgotpassword";

type ForgotPasswordMode = "email" | "phone";


export default function ForgotPassword({navigation}:any) {
  const [mode, setMode] = useState<ForgotPasswordMode>("email");

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
            email: "", phone: "",
          }
          : {
            email: "", phone: "",
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
          }) => (
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <View className="flex-1 px-8 pt-[60px]">
                <BackButton onPress={() => navigation.back()} />
                <ScreenHeader title="Forgot Password?" subtitle="Enter your registered email to continue" />
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
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      placeholder="Enter your email"
                      placeholderTextColor="#989898"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      className="ml-2 flex-1 text-[14px] text-[#011133]"
                    />

                    {/* CHECKMARK */}

                    {values.email.length > 0 &&
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
                  onPress={() => handleSubmit()}
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
              <BackButton onPress={() => navigation.back()} />
              <ScreenHeader title="Forgot Password" subtitle="Enter your registered phone number to continue" />

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

              <View className="mt-5">
                <View className="h-[56px] flex-row items-center rounded-lg bg-[#F9FAFB] px-3"
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
                        handleChange("phone")(numbersOnly);
                      }
                    }}
                    onBlur={handleBlur("phone")}
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
                onPress={() => handleSubmit()}
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