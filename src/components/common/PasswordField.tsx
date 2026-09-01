import React, { useState } from "react";
import {
  Text,
  Pressable,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

type PasswordFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  placeholder?: string;
  error?: string;
  touched?: boolean;
  loginError?: boolean;
};

export default function PasswordField({
  value,
  onChangeText,
  onBlur,
  placeholder = "Enter password",
  error,
  touched,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  const hasError = !!touched && !!error;

  return (
    <View>
      {/* PASSWORD CONTAINER */}
      <View
        style={[
          styles.container,
          {
            borderColor: hasError
              ? colors.error
              : value.length > 0
              ? colors.primaryLight
              : colors.border,
          },
        ]}
      >
        {/* LOCK ICON */}
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color={
            hasError
              ? colors.error
              : colors.textSecondary
          }
        />

        {/* PASSWORD INPUT */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          style={styles.input}
        />

        {/* SHOW / HIDE PASSWORD */}
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeButton}
        >
          <Ionicons
            name={
              showPassword
                ? "eye-outline"
                : "eye-off-outline"
            }
            size={18}
            color={colors.textSecondary}
          />
        </Pressable>
      </View>

      {/* ERROR */}
      {hasError && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    borderWidth: 1,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.textPrimary,
  },

  eyeButton: {
    padding: 4,
  },

  error: {
    marginTop: 4,
    fontSize: 12,
    color: colors.error,
  },
});