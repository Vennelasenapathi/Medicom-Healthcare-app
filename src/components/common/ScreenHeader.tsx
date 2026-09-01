import { colors } from "@/constants/colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function ScreenHeader({
  title,
  subtitle,
}: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      {subtitle && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  subtitle: {
    marginTop: 12,
    fontSize: 13,
    color: colors.textSecondary,
  },
});