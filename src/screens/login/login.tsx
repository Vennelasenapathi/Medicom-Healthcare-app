import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import AppButton from "@/components/common/AppButton";
import InputField from "@/components/common/InputField";
import PasswordField from "@/components/common/PasswordField";
import SuccessModal from "@/components/common/SuccessModal";
import ForgotPasswordFlow from "@/screens/forgot-password/forgotpasswordflow";
import { loginValidationSchema } from "@/validations/loginvalidation";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

export default function Login({ navigation }: any) {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);

  const login = async (email: string, password: string) => {
    const savedUser = await AsyncStorage.getItem("user");

    if (!savedUser) {
      setEmailError(true);
      setPasswordError(true);
      return;
    }

    const user = JSON.parse(savedUser);

    const validEmail =
      email.trim().toLowerCase() === user.email.trim().toLowerCase();

    const validPassword = password === user.password;

    setEmailError(!validEmail);
    setPasswordError(!validPassword);

    if (validEmail && validPassword) {
      setSuccess(true);
      setSuccessVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginValidationSchema}
        onSubmit={(values) => login(values.email, values.password)}
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
            style={globalStyles.chatList}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={globalStyles.messages}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
          >
            
            <View style={styles.content}>
              <Image
                source={require("../../../assets/images/medicom/Logo2.png")}
                style={styles.logo}
                resizeMode="contain"
              />

              <View style={styles.heading}>
                <Text style={globalStyles.title}>
                  Log in to your account
                </Text>
                <Text style={globalStyles.subtitle}>
                  Your journey to better health starts here!
                </Text>
              </View>

              <View style={styles.email}>
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
                  <Text style={globalStyles.errorText}>
                    *That email isn't correct
                  </Text>
                )}
              </View>

              <View style={styles.password}>
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
                  <Text style={globalStyles.errorText}>
                    *That password isn't correct
                  </Text>
                )}

                {!passwordError && (
                  <Pressable
                    onPress={() => setForgotPasswordVisible(true)}
                  >
                    <Text style={styles.forgot}>Forgot Password?</Text>
                  </Pressable>
                )}
              </View>

              <AppButton
                title="Login"
                onPress={() => {
                  setFieldTouched("email", true);
                  setFieldTouched("password", true);
                  handleSubmit();
                }}
              />

              <View style={[globalStyles.row, styles.signup]}>
                <Text style={styles.signupText}>
                  Don't have an account?{" "}
                </Text>

                <Pressable
                  onPress={() => navigation.navigate("Signup")}
                >
                  <Text style={styles.signupButton}>Sign Up</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>

      {success && (
        <SuccessModal
          visible={successVisible}
          title="Welcome back!"
          description={
            "You've successfully logged into the\nMedicom app."
          }
          buttonTitle="Go to Home"
          onPress={() => navigation.replace("Home")}
        />
      )}

      <ForgotPasswordFlow
        visible={forgotPasswordVisible}
        onClose={() => setForgotPasswordVisible(false)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 125,
  },

  logo: {
    width: 68,
    height: 68,
    alignSelf: "center",
  },

  heading: {
    marginTop: 32,
    alignItems: "center",
  },

  email: {
    marginTop: 40,
  },

  password: {
    marginTop: 16,
  },

  forgot: {
    marginTop: 28,
    marginBottom: 20,
    textAlign: "right",
    fontSize: 16,
    fontWeight: "500",
    color: colors.primaryDark,
  },

  signup: {
    justifyContent: "center",
    marginTop: 28,
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