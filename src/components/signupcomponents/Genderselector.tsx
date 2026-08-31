import React from "react";
import { Pressable, Text, View } from "react-native";
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
      <Text className="mb-2 text-[16px] font-medium"
      style={{color:colors.textPrimary}}>
        Gender
      </Text>

      <View className="flex-row gap-2">
        {genders.map((gender) => {
          const selected = value === gender;

          return (
            <Pressable
              key={gender}
              onPress={() => onChange(gender)}
              className="h-[56px] flex-1 items-center justify-center rounded-xl"
              style={{
                borderWidth: 1,
                borderColor: selected
                  ? colors.primaryDark
                  : colors.border,
                backgroundColor: selected
                  ? colors.backgroundselected
                  : colors.background,
              }}
            >
              <Text
                className="text-[14px]"
                style={{
                  color: selected
                    ? colors.primaryDark
                    : colors.textGray,
                  fontWeight: selected
                    ? "600"
                    : "400",
                }}
              >
                {gender}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {touched && error && (
        <Text className="mt-1 text-[10px] " style={{color:colors.error}}>
          {error}
        </Text>
      )}
    </View>
  );
}