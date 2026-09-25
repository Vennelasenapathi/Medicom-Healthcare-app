import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";

import AppButton from "@/components/common/AppButton";
import InputField from "@/components/common/InputField";
import DateOfBirthField from "@/components/signupcomponents/DateofBirthField";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { profileSchema } from "@/validations/profilevalidation";

export default function EditProfileScreen({ navigation }: any) {
  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.header, styles.header]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={22} color={colors.white} />
        </Pressable>

        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.headerSpace} />
      </View>

      <Formik
        initialValues={{
          fullName: "Vennela",
          phone: "+123 567 89000",
          email: "vennela@example.com",
          dob: "",
        }}
        validationSchema={profileSchema}
        onSubmit={(values) => {
          console.log("Updated Profile:", values);
          navigation.navigate("Profile", { updatedProfile: values });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
        }) => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scroll}
          >
            <View style={styles.profileSection}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../../../assets/images/medicom/Image.png")}
                  style={styles.avatar}
                />

                <Pressable style={styles.editIcon}>
                  <Ionicons name="camera" size={15} color={colors.white} />
                </Pressable>
              </View>

              <Text style={styles.profileName}>{values.fullName}</Text>
              <Text style={globalStyles.smallText}>
                Edit your personal information
              </Text>
            </View>

            <ProfileField label="Full Name">
              <InputField
                icon="person-outline"
                value={values.fullName}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                placeholder="Enter your full name"
                error={errors.fullName}
                touched={touched.fullName}
              />
            </ProfileField>

            <ProfileField label="Phone Number">
              <InputField
                icon="call-outline"
                value={values.phone}
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                error={errors.phone}
                touched={touched.phone}
              />
            </ProfileField>

            <ProfileField label="Email">
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
            </ProfileField>

            <ProfileField label="Date of Birth">
              <DateOfBirthField
                value={values.dob}
                touched={touched.dob}
                error={errors.dob}
                onChange={(date) => setFieldValue("dob", date)}
                onBlur={() => setFieldTouched("dob", true)}
              />
            </ProfileField>

            <View style={styles.buttonContainer}>
              <AppButton
                title="Update Profile"
                onPress={() => {
                  ["fullName", "phone", "email", "dob"].forEach((field) =>
                    setFieldTouched(field, true)
                  );
                  handleSubmit();
                }}
              />
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

function ProfileField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 95,
    paddingHorizontal: 18,
    paddingTop: 30,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 9,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  headerSpace: {
    width: 42,
  },

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  profileSection: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 30,
  },

  imageContainer: {
    position: "relative",
  },

  avatar: {
    width: 105,
    height: 105,
    borderRadius: 53,
    backgroundColor: "#EAF0F2",
  },

  editIcon: {
    position: "absolute",
    right: 2,
    bottom: 3,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  profileName: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  buttonContainer: {
    marginTop: 8,
  },
});