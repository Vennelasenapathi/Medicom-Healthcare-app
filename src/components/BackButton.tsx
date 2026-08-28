import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type BackButtonProps = {
  onPress: () => void;
};

export default function BackButton({
  onPress,
}: BackButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="h-[46px] w-[46px] items-center justify-center rounded-lg bg-[#2867FF]"
    >
      <Ionicons
        name="chevron-back"
        size={21}
        color="#FFFFFF"
      />
    </Pressable>
  );
}