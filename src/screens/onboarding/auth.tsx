import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppButton from "@/components/common/AppButton";
import { colors } from "@/constants/colors";

export default function Auth({ navigation }: any) {
  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.logoSection}>
        <Image
          source={require("../../../assets/images/medicom/Logo2.png")}
          resizeMode="contain"
          style={styles.logo}
        />

        {/* Heading */}
        <Text style={styles.heading}>
          Let's get started!
        </Text>

        {/* Description */}
        <Text style={styles.description}>
          Sign in to manage appointments{"\n"}
          and consult doctors anytime
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonSection}>

        {/* Login */}
        <AppButton
          title="Log In"
          onPress={() => navigation.navigate("Login")}
        />

        {/* Sign Up */}
        <Pressable
          onPress={() => navigation.navigate("Signup")}
          style={styles.signupButton}
        >
          <Text style={styles.signupText}>
            Sign Up
          </Text>

          <Ionicons
            name="chevron-forward"
            size={16}
            color={colors.primaryDark}
            style={styles.arrow}
          />
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: colors.background,
  },

  logoSection: {
    flex: 1,
    alignItems: "center",
    paddingTop: 130,
    paddingHorizontal: 24,
  },

  logo: {
    width: 103,
    height: 103,
    paddingTop: 136,
    paddingLeft: 138,
  },

  heading: {
    paddingTop: 30,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "700",
    color: colors.textBlue,
  },

  description: {
    marginTop: 16,
    maxWidth: 280,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    color: colors.textGray,
  },

  buttonSection: {
    paddingHorizontal: 61,
    paddingBottom: 250,
  },

  signupButton: {
    marginTop: 16,
    height: 56,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.background,
  },

  signupText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primaryDark,
  },

  arrow: {
    marginLeft: 3,
  },
});