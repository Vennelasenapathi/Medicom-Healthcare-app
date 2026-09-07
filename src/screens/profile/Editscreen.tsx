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
import * as Yup from "yup";

import AppButton from "@/components/common/AppButton";
import InputField from "@/components/common/InputField";
import DateOfBirthField from "@/components/signupcomponents/DateofBirthField";
import { colors } from "@/constants/colors";
import {profileSchema} from "@/validations/profilevalidation";


export default function EditProfileScreen({
  navigation,
}: any) {
  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={22}
            color={colors.white}
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Profile
        </Text>
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

          navigation.navigate("Profile", {
            updatedProfile: values,
          });
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

            {/* PROFILE IMAGE */}
            <View style={styles.profileSection}>
              <View style={styles.imageContainer}>

                <Image
                  source={require(
                    "../../../assets/images/medicom/Image.png"
                  )}
                  style={styles.avatar}
                />

                <Pressable style={styles.editIcon}>
                  <Ionicons
                    name="camera"
                    size={15}
                    color={colors.white}
                  />
                </Pressable>

              </View>

              {/* NAME CHANGES WHILE TYPING */}
              <Text style={styles.profileName}>
                {values.fullName}
              </Text>

              <Text style={styles.profileSubText}>
                Edit your personal information
              </Text>
            </View>

            {/* FULL NAME */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Full Name
              </Text>

              <InputField
                icon="person-outline"
                value={values.fullName}
                onChangeText={handleChange("fullName")}
                onBlur={handleBlur("fullName")}
                placeholder="Enter your full name"
                error={errors.fullName}
                touched={touched.fullName}
              />
            </View>

            {/* PHONE */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Phone Number
              </Text>

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
            </View>

            {/* EMAIL */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Email
              </Text>

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
            </View>

            {/* DATE OF BIRTH */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>
                Date of Birth
              </Text>
              <DateOfBirthField
                value={values.dob}
                touched={touched.dob}
                error={errors.dob}
                onChange={(date) => setFieldValue("dob", date) }
                onBlur={() => setFieldTouched("dob", true) }
              />
            </View>

            {/* UPDATE BUTTON */}
            <View style={styles.buttonContainer}>
              <AppButton
                title="Update Profile"
                onPress={() => {
                  setFieldTouched("fullName", true);
                  setFieldTouched("phone", true);
                  setFieldTouched("email", true);
                  setFieldTouched("dob", true);
                  handleSubmit();
                }}
              />
            </View>
            <View style={styles.bottomSpace} />
          </ScrollView>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  /* HEADER */

  header: {
    height: 95,
    paddingHorizontal: 18,
    paddingTop: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  /* SCROLL */

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },

  /* PROFILE */

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
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.white,
  },

  profileName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 12,
  },

  profileSubText: {
    fontSize: 13,
    color: "#999",
    marginTop: 4,
  },

  /* FIELDS */

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },

  /* BUTTON */

  buttonContainer: {
    marginTop: 8,
  },

  bottomSpace: {
    height: 30,
  },
});