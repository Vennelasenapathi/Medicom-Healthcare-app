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
import PasswordField from "@/components/common/PasswordField";
import SuccessModal from "@/components/common/SuccessModal";
import { createPasswordSchema } from "@/validations/createpasswordvalidation";

export default function CreatePassword({ navigation }: any) {
  const [passwordSaved, setPasswordSaved] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={createPasswordSchema}
        onSubmit={(values) => {
          console.log("New password:", values.password);
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
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.content}>

              {/* HEADER */}
              <BackButton
                onPress={() => navigation.goBack()}
              />

              <ScreenHeader
                title="Create new Password"
                subtitle="Create a new password to login"
              />

              {/* NEW PASSWORD */}
              <View style={styles.newPassword}>
                <PasswordField
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  placeholder="Enter new password"
                  error={errors.password}
                  touched={touched.password}
                />
              </View>

              {/* CONFIRM PASSWORD */}
              <View style={styles.confirmPassword}>
                <PasswordField
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  placeholder="Confirm password"
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                />
              </View>

              {/* SAVE */}
              <View style={styles.saveButton}>
                <AppButton
                  title="Save"
                  onPress={() => {
                    setFieldTouched("password", true);
                    setFieldTouched("confirmPassword", true);
                    handleSubmit();
                  }}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </Formik>

      {/* SUCCESS POPUP */}
      {passwordSaved && (
        <SuccessModal
          title="Password Updated"
          description="Your new password is ready to use."
          buttonTitle="Proceed to Login"
          onPress={() => navigation.navigate("Login")}
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
    paddingHorizontal: 32,
    paddingTop: 60,
  },

  newPassword: {
    marginTop: 36,
  },

  confirmPassword: {
    marginTop: 20,
  },

  saveButton: {
    marginTop: 20,
  },
});