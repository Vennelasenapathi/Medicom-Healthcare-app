import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, TextInput, View } from "react-native";
import { colors } from "@/constants/colors";

interface InputFieldProps {
  icon: any;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (e:any) => void;
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
  const hasError = touched && !!error;
  const hasValue = value.length >0;

  return (
    <View>
      <View
        className="h-[58px] flex-row items-center rounded-lg px-3"
        style={{
          backgroundColor:colors.background,
          borderWidth: 1,
          borderColor: hasError
            ? colors.error
            : valid
              ? colors.primaryLight
              : colors.border,
        }}
      >
        <Ionicons
          name={icon}
          size={22}
          color={hasError ? colors.error : valid ? colors.primaryDark : colors.textSecondary}
        />

        {prefix && (
          <Text className="ml-2 text-[16px] " style={{color:colors.textBlue}}>
            {prefix}
          </Text>
        )}

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
          className="ml-2  flex-1 text-[16px] " style={{color:colors.textBlue}}
        />

        {valid && (
          <Ionicons
            name="checkmark"
            size={20}
            color={colors.primaryDark}
          />
        )}
      </View>

      {hasError && (
        <Text className="mt-1 text-[10px] " style={{color:colors.error}}>
          {error}
        </Text>
      )}
    </View>
  );
}