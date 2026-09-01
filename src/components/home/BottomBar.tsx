import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

interface Props {
  navigation: any;
}

export default function BottomTabBar({
  navigation,
}: Props) {
  return (
    <View style={styles.bar}>
      <Tab
        icon="home"
        active
        onPress={() => {}}
      />

      <Tab
        icon="calendar-outline"
        onPress={() => {}}
      />

      <Tab
        icon="chatbubble-ellipses-outline"
        onPress={() => {}}
      />

      <Tab
        icon="person-outline"
        onPress={() => {}}
      />
    </View>
  );
}

interface TabProps {
  icon: any;
  active?: boolean;
  onPress: () => void;
}

function Tab({
  icon,
  active,
  onPress,
}: TabProps) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.tab}
    >
      <Ionicons
        name={icon}
        size={32}
        color={
          active
            ? colors.primaryDark
            : colors.textSecondary
        }
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 58,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  tab: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },
});