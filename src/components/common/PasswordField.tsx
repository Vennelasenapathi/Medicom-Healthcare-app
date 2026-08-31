import React, { useState } from "react";
import {Text,
  Pressable,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

type PasswordFieldProps = {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e:any) => void;
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

  const hasError = touched && !!error;

  return (
    <View>
      <View
        className="h-[56px] flex-row items-center rounded-xl bg-[#F9FAFB] px-3"
        style={{
          borderWidth: 1,
          borderColor: hasError
            ? colors.error
            : value.length > 0
              ? colors.primaryLight
              : colors.border,
        }}
      >
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color={hasError ? colors.error : colors.textSecondary}
        />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          className="ml-2 flex-1 text-[16px] "
          style={{color:colors.textPrimary}}
        />

        <Pressable
          onPress={() => setShowPassword(!showPassword)}
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

      {hasError && (
        <Text className="mt-1 text-[12px] " style={{color:colors.error}}>
          {error}
        </Text>
      )}
    </View>
  );
}