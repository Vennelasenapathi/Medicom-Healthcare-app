import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
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
      className="flex-1 bg-white"
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
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View className="flex-1 px-8 pt-[60px]">

              {/* HEADER */}
              <BackButton
                onPress={() => navigation.goBack()}
              />

              <ScreenHeader
                title="Create new Password"
                subtitle="Create a new password to login"
              />

              {/* NEW PASSWORD */}
              <View className="mt-9">
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
              <View className="mt-5">
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
              <View className="mt-5">
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