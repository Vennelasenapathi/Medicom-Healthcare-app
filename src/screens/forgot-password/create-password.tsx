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
import { createPasswordSchema } from "@/validations/createpasswordvalidation";
import BackButton from "@/components/BackButton";
import ScreenHeader from "@/components/ScreenHeader";

export default function CreatePassword({navigation}:any) {

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

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
          password: "",
          confirmPassword: "",
        }}
        validationSchema={createPasswordSchema}
        onSubmit={(values) => {
          console.log( "New password:", values.password );
          setPasswordSaved(true);
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <View className="flex-1 px-8 pt-[60px]">

              <BackButton onPress={() =>navigation.back()} />

              <ScreenHeader title="Create new Password" subtitle="Create a new password to login"/>


              {/* =================================================
                  NEW PASSWORD
              ================================================= */}

              <View className="mt-9">

                <View
                  className="h-[56px] flex-row items-center rounded-xl bg-[#F9FAFB] px-3"
                  style={{
                    borderWidth: 1,

                    borderColor:
                      touched.password &&
                      errors.password
                        ? "#FF4D4F"
                        : values.password.length > 0
                        ? "#8DB2FF"
                        : "#E5E7EB",
                  }}
                >

                  {/* LOCK ICON */}

                  <Ionicons
                    name="lock-closed-outline"
                    size={24}
                    color={
                      touched.password &&
                      errors.password
                        ? "#FF4D4F"
                        : "#246AFD"
                    }
                  />

                  {/* PASSWORD */}

                  <TextInput
                    value={values.password}
                    onChangeText={handleChange( "password" )}
                    onBlur={handleBlur( "password" )}
                    placeholder="Enter new password"
                    placeholderTextColor="#989898"
                    secureTextEntry={ !showPassword }
                    autoCapitalize="none"
                    className="ml-2 flex-1 text-[16px] text-[#011133]"
                  />

                  {/* EYE */}

                  <Pressable
                    onPress={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    <Ionicons
                      name={ showPassword ? "eye-outline" : "eye-off-outline" }
                      size={18}
                      color="#989898"
                    />
                  </Pressable>
                </View>

                {/* PASSWORD ERROR */}

                {touched.password && errors.password && (
                    <Text className="mt-1 text-[12px] text-[#FF4D4F]">
                      {errors.password}
                    </Text>
                  )}
              </View>

              {/* =================================================
                  CONFIRM PASSWORD
              ================================================= */}

              <View className="mt-5">

                <View
                  className="h-[56px] flex-row items-center rounded-xl bg-[#F9FAFB] px-3"
                  style={{
                    borderWidth: 1,

                    borderColor:
                      touched.confirmPassword &&
                      errors.confirmPassword
                        ? "#FF4D4F"
                        : values.confirmPassword.length >
                          0
                        ? "#8DB2FF"
                        : "#E5E7EB",
                  }}
                >

                  {/* LOCK ICON */}

                  <Ionicons
                    name="lock-closed-outline"
                    size={24}
                    color={
                      touched.confirmPassword &&
                      errors.confirmPassword
                        ? "#FF4D4F"
                        : "#989898"
                    }
                  />

                  {/* CONFIRM PASSWORD */}

                  <TextInput
                    value={
                      values.confirmPassword
                    }
                    onChangeText={handleChange(
                      "confirmPassword"
                    )}
                    onBlur={handleBlur(
                      "confirmPassword"
                    )}
                    placeholder="Confirm password"
                    placeholderTextColor="#989898"
                    secureTextEntry={
                      !showConfirmPassword
                    }
                    autoCapitalize="none"
                    className="ml-2 flex-1 text-[16px] text-[#011133]"
                  />

                  {/* EYE */}

                  <Pressable
                    onPress={() => setShowConfirmPassword( !showConfirmPassword ) }
                  >
                    <Ionicons
                      name={ showConfirmPassword ? "eye-outline" : "eye-off-outline" }
                      size={18}
                      color="#989898"
                    />
                  </Pressable>
                </View>

                {/* CONFIRM PASSWORD ERROR */}

                {touched.confirmPassword && errors.confirmPassword && (
                    <Text className="mt-1 text-[12px] text-[#FF4D4F]">
                      { errors.confirmPassword }
                    </Text>
                  )}
              </View>              

              {/* =================================================
                  SAVE BUTTON
              ================================================= */}

              <Pressable
                onPress={() => {
                  setFieldTouched( "password", true  );
                  setFieldTouched(  "confirmPassword", true );
                  handleSubmit();
                }}
                className="mt-9 h-[56px] flex-row items-center justify-center rounded-xl bg-[#2867FF]"
              >
                <Text className="text-[16px] font-semibold text-white">
                  Save
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

      {/* =====================================================
          PASSWORD UPDATED POPUP
      ===================================================== */}

      {passwordSaved && (
        <View className="absolute inset-0 items-center justify-center bg-black/20">
          <View className="mx-8 w-[90%] h-[360px] rounded-xl bg-white px-6 py-6">
            {/* ================================================= SUCCESS ICON  ================================================= */}

            <View className="mb-5 self-center rounded-full bg-[#F0F4FF] p-5">
              <View className="h-[102px] w-[102px] items-center justify-center rounded-full bg-[#E7EEFF]">
                <Ionicons
                  name="checkmark"
                  size={60}
                  color="#246AFD"
                />
              </View>
            </View>

            {/* ================================================= TITLE ================================================= */}

            <Text className="text-center text-[22px] font-bold text-[#011133]">
              Password Updated
            </Text>

            <Text className="mt-4 text-center text-[13px] leading-4 text-[#989898]">
              Your new password is ready to use.
            </Text>

            {/* =================================================
                PROCEED TO LOGIN
            ================================================= */}

            <Pressable
              onPress={() => navigation.navigate("Login")  }
              className="mt-9 h-[56px] flex-row items-center justify-center rounded-lg bg-[#2867FF]"
            >
              <Text className="text-[16px] font-semibold text-white">
                Proceed to Login
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
        </View>
      )}
    </KeyboardAvoidingView>
  );
}