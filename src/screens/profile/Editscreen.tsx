import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";

import { colors } from "@/constants/colors";

const profileSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Full name is required"),

  phone: Yup.string()
    .matches(
      /^[0-9+\s()-]{10,15}$/,
      "Enter a valid phone number"
    )
    .required("Phone number is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  dateOfBirth: Yup.string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
      "Use DD/MM/YYYY"
    )
    .required("Date of birth is required"),
});

export default function EditProfileScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      {/* Header */}
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

        <Text style={styles.headerTitle}>Profile</Text>

        <View style={styles.headerSpace} />
      </View>

      <Formik
        initialValues={{
          fullName: "Emily Humphrey",
          phone: "+123 567 89000",
          email: "emily@example.com",
          dateOfBirth: "15/08/1998",
        }}
        validationSchema={profileSchema}
        onSubmit={(values) => {
          console.log("Updated Profile:", values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scroll}
          >
            {/* Profile Image */}
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

              <Text style={styles.profileName}>
                {values.fullName}
              </Text>

              <Text style={styles.profileSubText}>
                Edit your personal information
              </Text>
            </View>

            {/* Full Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Full Name</Text>

              <View
                style={[
                  styles.inputContainer,
                  touched.fullName &&
                    errors.fullName &&
                    styles.errorInput,
                ]}
              >
                <Ionicons
                  name="person-outline"
                  size={21}
                  color={colors.primaryDark}
                />

                <TextInput
                  style={styles.input}
                  value={values.fullName}
                  onChangeText={handleChange("fullName")}
                  onBlur={handleBlur("fullName")}
                  placeholder="Enter your full name"
                  placeholderTextColor="#999"
                />
              </View>

              {touched.fullName && errors.fullName && (
                <Text style={styles.errorText}>
                  {errors.fullName}
                </Text>
              )}
            </View>

            {/* Phone */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Phone Number</Text>

              <View
                style={[
                  styles.inputContainer,
                  touched.phone &&
                    errors.phone &&
                    styles.errorInput,
                ]}
              >
                <Ionicons
                  name="call-outline"
                  size={21}
                  color={colors.primaryDark}
                />

                <TextInput
                  style={styles.input}
                  value={values.phone}
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  placeholder="Enter your phone number"
                  placeholderTextColor="#999"
                  keyboardType="phone-pad"
                />
              </View>

              {touched.phone && errors.phone && (
                <Text style={styles.errorText}>
                  {errors.phone}
                </Text>
              )}
            </View>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email</Text>

              <View
                style={[
                  styles.inputContainer,
                  touched.email &&
                    errors.email &&
                    styles.errorInput,
                ]}
              >
                <Ionicons
                  name="mail-outline"
                  size={21}
                  color={colors.primaryDark}
                />

                <TextInput
                  style={styles.input}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {touched.email && errors.email && (
                <Text style={styles.errorText}>
                  {errors.email}
                </Text>
              )}
            </View>

            {/* Date of Birth */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Date of Birth</Text>

              <View
                style={[
                  styles.inputContainer,
                  touched.dateOfBirth &&
                    errors.dateOfBirth &&
                    styles.errorInput,
                ]}
              >
                <Ionicons
                  name="calendar-outline"
                  size={21}
                  color={colors.primaryDark}
                />

                <TextInput
                  style={styles.input}
                  value={values.dateOfBirth}
                  onChangeText={handleChange("dateOfBirth")}
                  onBlur={handleBlur("dateOfBirth")}
                  placeholder="DD/MM/YYYY"
                  placeholderTextColor="#999"
                  keyboardType="number-pad"
                  maxLength={10}
                />
              </View>

              {touched.dateOfBirth && errors.dateOfBirth && (
                <Text style={styles.errorText}>
                  {errors.dateOfBirth}
                </Text>
              )}
            </View>

            {/* Update Button */}
            <Pressable
              style={styles.updateButton}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.updateText}>
                Update Profile
              </Text>

              <Ionicons
                name="arrow-forward"
                size={20}
                color={colors.white}
              />
            </Pressable>

            <View style={styles.bottomSpace} />
          </ScrollView>
        )}
      </Formik>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <Pressable>
          <Ionicons
            name="home-outline"
            size={24}
            color="#777"
          />
        </Pressable>

        <Pressable>
          <Ionicons
            name="calendar-outline"
            size={24}
            color="#777"
          />
        </Pressable>

        <Pressable>
          <Ionicons
            name="chatbubbles-outline"
            size={24}
            color="#777"
          />
        </Pressable>

        <Pressable>
          <Ionicons
            name="person"
            size={24}
            color={colors.primaryDark}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    height: 75,
    paddingHorizontal: 18,
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

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },

  profileSection: {
    alignItems: "center",
    marginTop: 8,
    marginBottom: 32,
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

  fieldContainer: {
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },

  inputContainer: {
    height: 56,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  errorInput: {
    borderColor: "#E53935",
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    marginLeft: 12,
  },

  errorText: {
    fontSize: 12,
    color: "#E53935",
    marginTop: 5,
    marginLeft: 3,
  },

  updateButton: {
    height: 56,
    borderRadius: 10,
    backgroundColor: colors.primaryDark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 8,
  },

  updateText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },

  bottomSpace: {
    height: 30,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEE",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});