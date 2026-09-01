import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";

type BackButtonProps = {
  onPress: () => void;
};

export default function BackButton({
  onPress,
}: BackButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.button}
    >
      <Ionicons
        name="chevron-back"
        size={21}
        color={colors.white}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 46,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: colors.primaryDark,
  },
});