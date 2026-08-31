import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "./AppButton";
import { colors } from "@/constants/colors";

interface Props {
  title: string;
  description: string;
  buttonTitle: string;
  onPress: () => void;
}

export default function SuccessModal({
  title,
  description,
  buttonTitle,
  onPress,
}: Props) {
  return (
    <View className="absolute inset-0 items-center justify-center bg-black/20">
      <View className="mx-10 h-[377px] w-[90%] rounded-xl bg-white px-6 py-6">

        <View className="mb-5 self-center rounded-full p-5" style={{backgroundColor:colors.backgroundselected}}>
          <View className="h-[102px] w-[102px] items-center justify-center rounded-full bg-[#E7EEFF]">
            <Ionicons
              name="checkmark"
              size={60}
              color={colors.primaryDark}
            />
          </View>
        </View>

        <Text className="text-center text-[22px] font-bold" style={{color:colors.textPrimary}}>
          {title}
        </Text>

        <Text className="mt-4 mb-9 text-center text-[13px] leading-4 " style={{color:colors.textSecondary}}>
          {description}
        </Text>

        <AppButton
          title={buttonTitle}
          onPress={onPress}
        />
      </View>
    </View>
  );
}