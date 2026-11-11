import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  Platform,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as ImagePicker from "expo-image-picker";
import SuccessModal from "@/components/common/SuccessModal";
import AppButton from "@/components/common/AppButton";
import InputField from "@/components/common/InputField";
import DateOfBirthField from "@/components/signupcomponents/DateofBirthField";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { profileSchema } from "@/validations/profilevalidation";

export default function EditProfileScreen({ navigation }: any) {
  const [user, setUser] = useState<any>(null);
  const [successVisible, setSuccessVisible] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem("user");

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    };

    loadUser();
  }, []);

  if (!user) return null;

  const pickProfileImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const imageUri = result.assets[0].uri;

      const storedUser = await AsyncStorage.getItem("user");
      const currentUser =storedUser ? JSON.parse(storedUser) : {};

      const updatedUser = {
        ...currentUser,
        profileImage: imageUri,
      };

      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error selecting profile photo:", error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <View style={globalStyles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
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
            fullName: user.name || "",
            phone: user.phone || "",
            email: user.email || "",
            dob: user.dob || "",
          }}
          validationSchema={profileSchema}
          onSubmit={async (values) => {
            const updatedUser = {
              ...user,
              name: values.fullName,
              phone: values.phone,
              email: values.email,
              dob: values.dob,
            };

            await AsyncStorage.setItem("user", JSON.stringify(updatedUser));

            setUser(updatedUser);
            setSuccessVisible(true);
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
              style={globalStyles.scroll}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={globalStyles.messages}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="interactive"
            >
              <View style={styles.profileSection}>
                <View style={styles.imageContainer}>
                  <Image
                    source={
                      user.profileImage
                        ? { uri: user.profileImage }
                        : require("../../../assets/images/medicom/Image.png")
                    }
                    style={styles.avatar}
                  />

                  <Pressable
                    style={styles.editIcon}
                    onPress={pickProfileImage}
                  >
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
                  error={typeof errors.fullName === "string" ? errors.fullName : undefined}
                  touched={!!touched.fullName}
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
                  error={typeof errors.phone === "string" ? errors.phone : undefined}
                  touched={!!touched.phone}
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
                  error={typeof errors.email === "string" ? errors.email : undefined}
                  touched={!!touched.email}
                />
              </ProfileField>

              <ProfileField label="Date of Birth">
                <DateOfBirthField
                  value={values.dob}
                  touched={!!touched.dob}
                  error={typeof errors.dob === "string" ? errors.dob : undefined}
                  onValueChange={(date) => setFieldValue("dob", date)}
                  onBlur={() => setFieldTouched("dob", true)}
                />
              </ProfileField>

              <View style={styles.buttonContainer}>
                <AppButton
                  title="Update Profile"
                  onPress={() => {
                    ["fullName", "phone", "email", "dob"].forEach(
                      (field) => setFieldTouched(field, true)
                    );

                    handleSubmit();
                  }}
                />
              </View>
            </ScrollView>
          )}
        </Formik>
        {successVisible && (
          <SuccessModal
            visible={successVisible}
            title="Profile Updated!"
            description="Your profile details have been updated successfully."
            buttonTitle="Continue"
            onPress={() => {
              setSuccessVisible(false);
              navigation.navigate("Profile");
            }}
          />
        )}
      </View>
    </KeyboardAvoidingView>
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