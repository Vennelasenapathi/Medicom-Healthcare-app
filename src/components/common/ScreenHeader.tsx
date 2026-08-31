import { colors } from "@/constants/colors";
import React from "react";
import { Text, View } from "react-native";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function ScreenHeader({
  title,
  subtitle,
}: ScreenHeaderProps) {
  return (
    <View className="mt-9">
      <Text className="text-[21px] font-bold " style={{color:colors.textPrimary}}>
        {title}
      </Text>

      {subtitle && (
        <Text className="mt-3 text-[13px]" style={{color:colors.textSecondary}}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}