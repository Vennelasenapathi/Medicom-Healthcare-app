import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { colors } from "@/constants/colors";

interface Props {
  onDoctorPress: () => void;
}

const actions = [
  {
    icon: "doctor" as const,
    title: "Doctor",
  },
  {
    icon: "ambulance" as const,
    title: "Ambulance",
  },
  {
    icon: "hospital-building" as const,
    title: "Hospital",
  },
  {
    icon: "pill" as const,
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
            <MaterialCommunityIcons
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
    width: "23%",
    alignItems: "center",
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
    marginTop: 6,
    fontSize: 14,
    color: colors.textPrimary,
  },
});