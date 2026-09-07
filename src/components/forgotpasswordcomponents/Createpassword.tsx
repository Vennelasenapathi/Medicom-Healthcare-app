import React from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import BackButton from "./BackButton";
import ScreenHeader from "@/components/common/ScreenHeader";
import AppButton from "@/components/common/AppButton";
import PasswordField from "@/components/common/PasswordField";
import { createPasswordSchema } from "@/validations/createpasswordvalidation";

type Props = {
  onBack: () => void;
  onSuccess: () => void;
};

export default function CreatePasswordForm({
  onBack,
  onSuccess,
}: Props) {
  return (
    <Formik
      initialValues={{
        password: "",
        confirmPassword: "",
      }}
      validationSchema={createPasswordSchema}
      onSubmit={() => {
        Keyboard.dismiss();
        onSuccess();
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
        <View style={styles.container}>
          <BackButton onPress={onBack} />

          <ScreenHeader
            title="Create new password"
            subtitle="Create a new password to login"
          />

          <View style={styles.field}>
            <PasswordField
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              placeholder="Enter new password"
              error={errors.password}
              touched={touched.password}
            />
          </View>

          <View style={styles.field}>
            <PasswordField
              value={values.confirmPassword}
              onChangeText={handleChange("confirmPassword")}
              onBlur={handleBlur("confirmPassword")}
              placeholder="Confirm password"
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            />
          </View>

          <View style={styles.button}>
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
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  field: {
    marginTop: 22,
  },

  button: {
    marginTop: 30,
  },
});