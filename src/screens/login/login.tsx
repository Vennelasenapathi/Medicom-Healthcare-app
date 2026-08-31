import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Formik } from "formik";
import AppButton from "@/components/common/AppButton";
import InputField from "@/components/common/InputField";
import PasswordField from "@/components/common/PasswordField";
import SuccessModal from "@/components/common/SuccessModal";
import { loginValidationSchema } from "@/validations/loginvalidation";
import { colors } from "@/constants/colors";

export default function Login({ navigation }: any) {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [success, setSuccess] = useState(false);

  const login = (email: string, password: string) => {
    const correctEmail = "vennela@medicom.com";
    const correctPassword = "12345678";

    const validEmail = email.trim().toLowerCase() === correctEmail;
    const validPassword = password === correctPassword;

    setEmailError(!validEmail);
    setPasswordError(!validPassword);

    if (validEmail && validPassword) {
      setSuccess(true);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) =>
          login(values.email, values.password)
        }
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
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View className="flex-1 px-6 pt-[125px]">

              {/* LOGO */}
              <View className="items-center">
                <Image
                  source={require("../../../assets/images/medicom/Logo2.png")}
                  className="h-[68px] w-[68px]"
                  resizeMode="contain"
                />
              </View>

              {/* HEADING */}
              <View className="mt-8 items-center">
                <Text className="text-[22px] font-bold " style={{color:colors.textPrimary}}>
                  Log in to your account
                </Text>

                <Text className="mt-1 text-[14px] " style={{color:colors.textSecondary}}>
                  Your journey to better health starts here!
                </Text>
              </View>

              {/* EMAIL */}
              <View className="mt-10">
                <InputField
                  icon="mail-outline"
                  value={values.email}
                  onChangeText={(text) => {
                    handleChange("email")(text);
                    setEmailError(false);
                  }}
                  onBlur={handleBlur("email")}
                  placeholder="Enter your email"
                  touched={touched.email}
                  error={errors.email}
                  loginError={emailError}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                {emailError && !errors.email && (
                  <Text className="mt-1 text-[12px] " style={{color:colors.error}}>
                    *That email isn't correct
                  </Text>
                )}
              </View>

              {/* PASSWORD */}
              <View className="mt-4">
                <PasswordField
                  value={values.password}
                  onChangeText={(text) => {
                    handleChange("password")(text);
                    setPasswordError(false);
                  }}
                  onBlur={handleBlur("password")}
                  touched={touched.password}
                  error={errors.password}
                  loginError={passwordError}
                />

                {passwordError && !errors.password && (
                  <Text className="mt-1 text-[12px]" style={{color:colors.error}}>
                    *That password isn't correct
                  </Text>
                )}

                {!passwordError && (
                  <Pressable
                    onPress={() => navigation.navigate("forgotpassword")  } >
                    <Text className="mt-7 mb-5 text-right text-[16px] font-medium " style={{color:colors.primaryDark}}>
                      Forgot Password?
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* LOGIN */}
              <AppButton
                title="Login"
                onPress={() => {
                  setFieldTouched("email", true);
                  setFieldTouched("password", true);
                  handleSubmit();
                }}
              />

              {/* SIGN UP */}
              <View className="mt-7 flex-row justify-center">
                <Text className="text-[13px]" style={{color:colors.textGray}}>
                  Don't have an account?{" "}
                </Text>

                <Pressable onPress={() => navigation.navigate("Signup") } >
                  <Text className="text-[13px] font-medium " style={{color:colors.primaryDark}}>
                    Sign Up
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>

      {/* SUCCESS */}
      {success && (
        <SuccessModal
          title="Welcome back!"
          description={ "You've successfully logged into the\nMedicom app." }
          buttonTitle="Go to Home"
          onPress={() => navigation.replace("SplashScreen") }
        />
      )}
    </KeyboardAvoidingView>
  );
}