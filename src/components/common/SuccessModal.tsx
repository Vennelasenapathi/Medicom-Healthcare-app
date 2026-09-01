import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppButton from "./AppButton";
import { colors } from "@/constants/colors";

interface Props {
  title: string;
  description: string;
  buttonTitle: string;
  onPress: () => void;
}

export default function SuccessModal({
  title,
  description,
  buttonTitle,
  onPress,
}: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.modal}>

        {/* SUCCESS ICON */}
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Ionicons
              name="checkmark"
              size={60}
              color={colors.primaryDark}
            />
          </View>
        </View>

        {/* TITLE */}
        <Text style={styles.title}>
          {title}
        </Text>

        {/* DESCRIPTION */}
        <Text style={styles.description}>
          {description}
        </Text>

        {/* BUTTON */}
        <AppButton
          title={buttonTitle}
          onPress={onPress}
        />

      </View>
    </View>
  );
}

const styles = {
  overlay: {
    position: "absolute" as const,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    backgroundColor: "rgba(0,0,0,0.20)",
  },

  modal: {
    width: "90%" as const,
    height: 377,
    marginHorizontal: 40,
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
  },

  outerCircle: {
    alignSelf: "center" as const,
    marginBottom: 20,
    padding: 20,
    borderRadius: 999,
    backgroundColor: colors.backgroundselected,
  },

  innerCircle: {
    width: 102,
    height: 102,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    borderRadius: 999,
    backgroundColor: "#E7EEFF",
  },

  title: {
    textAlign: "center" as const,
    fontSize: 22,
    fontWeight: "700" as const,
    color: colors.textPrimary,
  },

  description: {
    marginTop: 16,
    marginBottom: 36,
    textAlign: "center" as const,
    fontSize: 13,
    lineHeight: 16,
    color: colors.textSecondary,
  },
};