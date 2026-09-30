
import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  showArrow?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function AppButton({
  title,
  onPress,
  showArrow = true,
  style,
}: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.button, style]}
    >
      <Text style={styles.text}>{title}</Text>

      {showArrow && (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={colors.white}
          style={styles.icon}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.primaryDark,
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },

  icon: {
    marginLeft: 3,
  },
});