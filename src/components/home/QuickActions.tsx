import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

interface Props {
  onDoctorPress: () => void;
}

const actions = [
  {
    icon: "medkit-outline" as const,
    title: "Doctor",
  },
  {
    icon: "car-outline" as const,
    title: "Ambulance",
  },
  {
    icon: "business-outline" as const,
    title: "Hospital",
  },
  {
    icon: "bandage-outline" as const,
    title: "Pharmacy",
  },
];

export default function QuickActions({
  onDoctorPress,
}: Props) {
  return (
    <View style={styles.container}>
      {actions.map((item) => (
        <Pressable
          key={item.title}
          style={styles.item}
          onPress={
            item.title === "Doctor"
              ? onDoctorPress
              : undefined
          }
        >
          <View style={styles.iconBox}>
            <Ionicons
              name={item.icon}
              size={32}
              color={colors.primaryDark}
            />
          </View>

          <Text style={styles.text}>{item.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  item: {
    alignItems: "center",
    width: "23%",
    paddingTop: 26,
  },

  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 9,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.borderLight,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: 6,
  },
});