import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
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

    const validEmail =
      email.trim().toLowerCase() === correctEmail;
    const validPassword = password === correctPassword;

    setEmailError(!validEmail);
    setPasswordError(!validPassword);

    if (validEmail && validPassword) {
      setSuccess(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios" ? "padding" : undefined
      }
    >
      <Formik
        initialValues={{ email: "", password: "" }}
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
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.content}>

              {/* LOGO */}
              <View style={styles.logoContainer}>
                <Image
                  source={require(  "../../../assets/images/medicom/Logo2.png" )}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>

              {/* HEADING */}
              <View style={styles.heading}>
                <Text style={styles.title}>
                  Log in to your account
                </Text>
                <Text style={styles.subtitle}>
                  Your journey to better health starts here!
                </Text>
              </View>

              {/* EMAIL */}
              <View style={styles.emailContainer}>
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
                  <Text style={styles.errorText}>
                    *That email isn't correct
                  </Text>
                )}
              </View>

              {/* PASSWORD */}
              <View style={styles.passwordContainer}>
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
                  <Text style={styles.errorText}>
                    *That password isn't correct
                  </Text>
                )}

                {!passwordError && (
                  <Pressable
                    onPress={() => navigation.navigate("forgotpassword") }
                  >
                    <Text style={styles.forgotPassword}>
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
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  Don't have an account?{" "}
                </Text>

                <Pressable
                  onPress={() => navigation.navigate("Signup")  }
                >
                  <Text style={styles.signupButton}>
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
          onPress={() => navigation.replace("Home") }
        />
      )}
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
    paddingHorizontal: 24,
    paddingTop: 125,
  },

  logoContainer: {
    alignItems: "center",
  },

  logo: {
    width: 68,
    height: 68,
  },

  heading: {
    marginTop: 32,
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: colors.textSecondary,
  },

  emailContainer: {
    marginTop: 40,
  },

  passwordContainer: {
    marginTop: 16,
  },

  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: colors.error,
  },

  forgotPassword: {
    marginTop: 28,
    marginBottom: 20,
    textAlign: "right",
    fontSize: 16,
    fontWeight: "500",
    color: colors.primaryDark,
  },

  signupContainer: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "center",
  },

  signupText: {
    fontSize: 13,
    color: colors.textGray,
  },

  signupButton: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.primaryDark,
  },
});