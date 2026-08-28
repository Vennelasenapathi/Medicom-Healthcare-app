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
      <Text className="text-[21px] font-bold text-[#011133]">
        {title}
      </Text>

      {subtitle && (
        <Text className="mt-3 text-[13px] text-[#989898]">
          {subtitle}
        </Text>
      )}
    </View>
  );
}