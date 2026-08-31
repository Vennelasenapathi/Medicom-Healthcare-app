import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {colors} from "@/constants/colors";

type BackButtonProps = {
  onPress: () => void;
};

export default function BackButton({
  onPress,
}: BackButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="h-[46px] w-[46px] items-center justify-center rounded-lg "
      style={{backgroundColor:colors.primaryDark}}
    >
      <Ionicons
        name="chevron-back"
        size={21}
        color={colors.white}
      />
    </Pressable>
  );
}