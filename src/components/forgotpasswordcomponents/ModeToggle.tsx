import { colors } from "@/constants/colors";
import React from "react";
import {
  Pressable,
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
    <View className="mt-9 h-[52px] flex-row rounded-lg p-[3px]" style={{backgroundColor:colors.togglebackground}}>
      {(["email", "phone"] as const).map((item) => {
        const active = mode === item;

        return (
          <Pressable
            key={item}
            onPress={() => onChange(item)}
            className="flex-1 items-center justify-center rounded-md"
            style={{
              backgroundColor: active
                ? colors.white
                : "transparent",
            }}
          >
            <Text
              className="text-[14px]"
              style={{
                color: active
                  ? colors.primaryDark
                  : colors.textGray,
                fontWeight: active
                  ? "600"
                  : "400",
              }}
            >
              {item === "email" ? "Email" : "Phone"}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}