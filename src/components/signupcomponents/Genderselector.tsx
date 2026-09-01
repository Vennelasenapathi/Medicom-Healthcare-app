import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "@/constants/colors";

interface Props {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  touched?: boolean;
}

export default function GenderSelector({
  value,
  onChange,
  error,
  touched,
}: Props) {
  const genders = ["Female", "Male", "Other"];

  return (
    <View>
      {/* LABEL */}
      <Text style={styles.label}>
        Gender
      </Text>

      {/* GENDER OPTIONS */}
      <View style={styles.options}>
        {genders.map((gender) => {
          const selected = value === gender;

          return (
            <Pressable
              key={gender}
              onPress={() => onChange(gender)}
              style={[
                styles.option,
                {
                  borderColor: selected
                    ? colors.primaryDark
                    : colors.border,

                  backgroundColor: selected
                    ? colors.backgroundselected
                    : colors.background,
                },
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: selected
                      ? colors.primaryDark
                      : colors.textGray,

                    fontWeight: selected
                      ? "600"
                      : "400",
                  },
                ]}
              >
                {gender}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* ERROR */}
      {touched && error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },

  options: {
    flexDirection: "row",
    gap: 8,
  },

  option: {
    height: 56,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    borderWidth: 1,
  },

  optionText: {
    fontSize: 14,
  },

  error: {
    marginTop: 4,
    fontSize: 10,
    color: colors.error,
  },
});