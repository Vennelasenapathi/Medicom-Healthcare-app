import React from "react";
import { View, StyleSheet } from "react-native";
import { Formik } from "formik";

import BackButton from "./BackButton";
import ModeToggle from "./ModeToggle";

import ScreenHeader from "@/components/common/ScreenHeader";
import AppButton from "@/components/common/AppButton";
import InputField from "@/components/common/InputField";

import { emailValidationSchema, phoneValidationSchema, } from "@/validations/forgotpassword";

type Mode = "email" | "phone";

type Props = {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
  onNext: () => void;
  onBack: () => void;
};

export default function ForgotPasswordForm({
  mode,
  onModeChange,
  onNext,
  onBack,
}: Props) {
  return (
    <Formik
      initialValues={{ email: "", phone: "" }}
      validationSchema={
        mode === "email"
          ? emailValidationSchema
          : phoneValidationSchema
      }
      onSubmit={onNext}
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
        <View style={styles.container}>
          <BackButton onPress={onBack} />

          <ScreenHeader
            title="Forgot Password?"
            subtitle={
              mode === "email"
                ? "Enter your registered email to continue"
                : "Enter your registered phone number to continue"
            }
          />

          <ModeToggle
            mode={mode}
            onChange={(newMode) => {
              onModeChange(newMode);
              resetForm();
            }}
          />

          <View style={styles.field}>
            {mode === "email" ? (
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
            ) : (
              <InputField
                icon="call-outline"
                value={values.phone}
                onChangeText={(text) =>
                  handleChange("phone")(
                    text.replace(/[^0-9]/g, "").slice(0, 10)
                  )
                }
                onBlur={handleBlur("phone")}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                maxLength={10}
                prefix="+91"
                error={errors.phone}
                touched={touched.phone}
              />
            )}
          </View>

          <View style={styles.button}>
            <AppButton
              title="Reset Password"
              onPress={() => handleSubmit()}
            />
          </View>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  field: {
    marginTop: 25,
  },

  button: {
    marginTop: 30,
  },
});