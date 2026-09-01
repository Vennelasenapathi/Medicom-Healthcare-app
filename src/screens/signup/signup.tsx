import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import DateOfBirthField from "@/components/signupcomponents/DateofBirthField";
import AppButton from "@/components/common/AppButton";
import InputField from "@/components/common/InputField";
import PasswordField from "@/components/common/PasswordField";
import GenderSelector from "@/components/signupcomponents/Genderselector";
import SuccessModal from "@/components/common/SuccessModal";
import ScreenHeader from "@/components/common/ScreenHeader";
import { signupValidationSchema } from "@/validations/signupvalidation";
import { colors } from "@/constants/colors";

export default function Signup({ navigation }: any) {
  const [success, setSuccess] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    height: "",
    weight: "",
    terms: false,
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={signupValidationSchema}
        onSubmit={(values) => {
          console.log(values);
          setSuccess(true);
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
          const valid = (field: keyof typeof values) =>
            !!touched[field] &&
            !errors[field] &&
            String(values[field]).length > 0;

          return (
            <>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.scrollContent}
              >
                <View style={styles.content}>
                  {/* LOGO */}
                  <View style={styles.logoContainer}>
                    <Image
                      source={require("../../../assets/images/medicom/Logo2.png")}
                      style={styles.logo}
                      resizeMode="contain"
                    />
                  </View>

                  {/* HEADER */}
                  <View style={styles.header}>
                    <ScreenHeader
                      title="Create Your Account"
                      subtitle="Create an account to get started"
                    />
                  </View>

                  {/* NAME */}
                  <View style={styles.field}>
                    <InputField
                      icon="person-outline"
                      value={values.name}
                      onChangeText={(text) => setFieldValue("name", text) }
                      onBlur={() => setFieldTouched("name", true)}
                      placeholder="Enter your name"
                      touched={touched.name}
                      error={errors.name}
                      valid={valid("name")}
                      autoCapitalize="words"
                    />
                  </View>

                  {/* EMAIL */}
                  <View style={styles.field}>
                    <InputField
                      icon="mail-outline"
                      value={values.email}
                      onChangeText={(text) => setFieldValue("email", text)  }
                      onBlur={() => setFieldTouched("email", true)}
                      placeholder="Enter your email"
                      touched={touched.email}
                      error={errors.email}
                      valid={valid("email")}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />
                  </View>

                  {/* PASSWORD */}
                  <View style={styles.field}>
                    <PasswordField
                      value={values.password}
                      onChangeText={(text) => setFieldValue("password", text)  }
                      onBlur={() => setFieldTouched("password", true)}
                      touched={touched.password}
                      error={errors.password}
                    />
                  </View>

                  {/* DATE OF BIRTH */}
                  <View style={styles.field}>
                    <DateOfBirthField
                      value={values.dob}
                      touched={touched.dob}
                      error={errors.dob}
                      onChange={(date) => setFieldValue("dob", date)}
                      onBlur={() => setFieldTouched("dob", true)}
                    />
                  </View>

                  {/* GENDER */}
                  <View style={styles.field}>
                    <GenderSelector
                      value={values.gender}
                      onChange={(value) =>  setFieldValue("gender", value)  }
                      touched={touched.gender}
                      error={errors.gender}
                    />
                  </View>

                  {/* HEIGHT + WEIGHT */}
                  <View style={styles.row}>
                    <View style={styles.half}>
                      <InputField
                        icon="resize-outline"
                        value={values.height}
                        onChangeText={(text) =>
                          setFieldValue( "height",  text.replace(/[^0-9.]/g, "") )
                        }
                        onBlur={() => setFieldTouched("height", true)}
                        placeholder="Height"
                        touched={touched.height}
                        error={errors.height}
                        valid={valid("height")}
                        keyboardType="decimal-pad"
                      />
                    </View>

                    <View style={styles.half}>
                      <InputField
                        icon="scale-outline"
                        value={values.weight}
                        onChangeText={(text) =>
                          setFieldValue( "weight",  text.replace(/[^0-9.]/g, "") )
                        }
                        onBlur={() => setFieldTouched("weight", true)}
                        placeholder="Weight"
                        touched={touched.weight}
                        error={errors.weight}
                        valid={valid("weight")}
                        keyboardType="decimal-pad"
                      />
                    </View>
                  </View>

                  {/* TERMS */}
                  <Pressable
                    onPress={() => setFieldValue("terms", !values.terms) }
                    style={styles.terms}
                  >
                    <View style={[ styles.checkbox,
                        {
                          borderColor: values.terms
                            ? colors.primaryDark
                            : colors.border,
                          backgroundColor: values.terms
                            ? colors.primaryDark
                            : colors.white,
                        },
                      ]}
                    >
                      {values.terms && (
                        <Ionicons
                          name="checkmark"
                          size={13}
                          color={colors.white}
                        />
                      )}
                    </View>

                    <Text style={styles.termsText}>
                      I confirm that the information provided is accurate.
                    </Text>
                  </Pressable>

                  {/* SIGN UP */}
                  <AppButton
                    title="Sign Up"
                    onPress={() => {
                      Object.keys(values).forEach((field) =>
                        setFieldTouched(field as any, true)
                      );
                      handleSubmit();
                    }}
                  />

                  {/* LOGIN */}
                  <View style={styles.loginRow}>
                    <Text style={styles.secondaryText}>
                      Already have an account?{" "}
                    </Text>

                    <Pressable onPress={() => navigation.navigate("Login")} >
                      <Text style={styles.loginText}>Log In</Text>
                    </Pressable>
                  </View>
                </View>
              </ScrollView>

              {/* SUCCESS */}
              {success && (
                <SuccessModal
                  title="All Set!"
                  description="You've successfully created your account."
                  buttonTitle="Get Started"
                  onPress={() => navigation.replace("Home")}
                />
              )}
            </>
          );
        }}
      </Formik>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },

  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 100,
  },

  logoContainer: {
    alignItems: "center",
  },

  logo: {
    width: 68,
    height: 68,
  },

  header: {
    alignItems: "center",
  },

  field: {
    marginTop: 12,
  },

  row: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },

  half: {
    flex: 1,
  },

  terms: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  checkbox: {
    width: 20,
    height: 20,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 1,
  },

  termsText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 12,
    lineHeight: 16,
    color: colors.textSecondary,
  },

  loginRow: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "center",
  },

  secondaryText: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  loginText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primaryDark,
  },
});