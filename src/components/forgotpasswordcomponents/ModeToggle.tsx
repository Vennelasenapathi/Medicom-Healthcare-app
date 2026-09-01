import { colors } from "@/constants/colors";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface ModeToggleProps {
  mode: "email" | "phone";
  onChange: (mode: "email" | "phone") => void;
}

export default function ModeToggle({
  mode,
  onChange,
}: ModeToggleProps) {
  return (
    <View style={styles.container}>
      {(["email", "phone"] as const).map((item) => {
        const active = mode === item;

        return (
          <Pressable
            key={item}
            onPress={() => onChange(item)}
            style={[
              styles.button,
              {
                backgroundColor: active
                  ? colors.white
                  : "transparent",
              },
            ]}
          >
            <Text
              style={[
                styles.text,
                {
                  color: active
                    ? colors.primaryDark
                    : colors.textGray,
                  fontWeight: active
                    ? "600"
                    : "400",
                },
              ]}
            >
              {item === "email" ? "Email" : "Phone"}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
    height: 52,
    flexDirection: "row",
    borderRadius: 8,
    padding: 3,
    backgroundColor: colors.togglebackground,
  },

  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
  },

  text: {
    fontSize: 14,
  },
});