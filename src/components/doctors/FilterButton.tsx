import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "@/constants/colors";

type FilterButtonProps = {
  title: string;
  selected: boolean;
  onPress: () => void;
};

export default function FilterButton({
  title,
  selected,
  onPress,
}: FilterButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.filter, selected && styles.activeFilter]}
    >
      <Text
        style={[
          styles.filterText,
          selected && styles.activeFilterText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  filter: {
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: "#F3F5F9",
  },
  activeFilter: {
    backgroundColor: colors.primaryDark,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  activeFilterText: {
    fontWeight: "600",
    color: colors.white,
  },
});