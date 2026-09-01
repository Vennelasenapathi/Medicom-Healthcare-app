import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";
import { colors } from "@/constants/colors";

interface InputFieldProps {
  icon: any;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e: any) => void;
  placeholder: string;
  error?: string;
  touched?: boolean;
  keyboardType?: any;
  autoCapitalize?: any;
  autoCorrect?: boolean;
  valid?: boolean;
  loginError?: boolean;
  maxLength?: number;
  prefix?: string;
}

export default function InputField({
  icon,
  value,
  onChangeText,
  onBlur,
  placeholder,
  error,
  touched,
  keyboardType,
  autoCapitalize,
  autoCorrect,
  valid,
  loginError,
  maxLength,
  prefix,
}: InputFieldProps) {
  const hasError = !!touched && !!error;

  return (
    <View>
      {/* INPUT CONTAINER */}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.background,
            borderColor: hasError
              ? colors.error
              : valid
              ? colors.primaryLight
              : colors.border,
          },
        ]}
      >
        {/* LEFT ICON */}
        <Ionicons
          name={icon}
          size={22}
          color={
            hasError
              ? colors.error
              : valid
              ? colors.primaryDark
              : colors.textSecondary
          }
        />

        {/* PREFIX */}
        {prefix && (
          <Text style={styles.prefix}>
            {prefix}
          </Text>
        )}

        {/* TEXT INPUT */}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          maxLength={maxLength}
          style={styles.input}
        />

        {/* VALID ICON */}
        {valid && (
          <Ionicons
            name="checkmark"
            size={20}
            color={colors.primaryDark}
          />
        )}
      </View>

      {/* ERROR MESSAGE */}
      {hasError && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
  },

  prefix: {
    marginLeft: 8,
    fontSize: 16,
    color: colors.textBlue,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.textBlue,
  },

  error: {
    marginTop: 4,
    fontSize: 10,
    color: colors.error,
  },
});