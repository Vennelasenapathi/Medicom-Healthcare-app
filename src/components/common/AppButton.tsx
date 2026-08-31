import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import {colors} from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  showArrow?: boolean;
};

export default function AppButton({
  title,
  onPress,
  showArrow = true,
}: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.button}
    >
      <Text style={styles.text}>
        {title}
      </Text>

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