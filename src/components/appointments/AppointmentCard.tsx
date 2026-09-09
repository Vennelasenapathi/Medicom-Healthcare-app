import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

export default function AppointmentCard({
  appointment,
  onPress,
  onReschedule,
}: any) {
  const cancelled =
    appointment.status === "Cancelled";

  return (
    <View style={styles.card}>
      {/* TOP CONTENT */}
      <Pressable
        style={styles.topContent}
        onPress={onPress}
      >
        <Image
          source={appointment.image}
          style={styles.image}
        />

        <View style={styles.info}>
          <Text style={styles.name}>
            {appointment.doctor}
          </Text>

          <Text style={styles.specialty}>
            {appointment.specialty}
          </Text>

          <Text style={styles.text}>
            {appointment.date}
          </Text>

          <Text style={styles.text}>
            {appointment.time} • {appointment.type}
          </Text>

          <Text
            style={[
              styles.status,
              cancelled && styles.cancelled,
            ]}
          >
            {appointment.status}
          </Text>
        </View>

        {/* ARROW */}
        {!cancelled && (
          <View style={styles.arrow}>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.primaryDark}
            />
          </View>
        )}
      </Pressable>

      {/* BOTTOM ACTIONS */}
      {!cancelled && (
        <View style={styles.actions}>
          <Pressable
            style={styles.joinButton}
            onPress={() => {}}
          >
            <Text style={styles.joinText}>
              Join Consultation
            </Text>

            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.white}
            />
          </Pressable>

          <Pressable
            style={styles.iconButton}
            onPress={onReschedule}
          >
            <Ionicons
              name="create-outline"
              size={21}
              color={colors.white}
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
  },

  /* IMAGE + INFORMATION */
  topContent: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  image: {
    width: 82,
    height: 82,
    borderRadius: 9,
  },

  info: {
    flex: 1,
    marginLeft: 14,
    paddingRight: 25,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  specialty: {
    fontSize: 11,
    marginTop: 4,
    color: colors.textSecondary,
  },

  text: {
    fontSize: 10,
    marginTop: 6,
    color: colors.textSecondary,
  },

  status: {
    fontSize: 10,
    marginTop: 6,
    color: colors.primaryDark,
    fontWeight: "700",
  },

  cancelled: {
    color: "#D9534F",
  },

  /* RIGHT ARROW */
  arrow: {
    position: "absolute",
    right: 0,
    top: 0,
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: "#EEF3FF",
    alignItems: "center",
    justifyContent: "center",
  },

  /* BOTTOM BUTTONS */
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
    marginLeft: 96,
  },

  joinButton: {
    flex: 1,
    height: 43,
    borderRadius: 8,
    backgroundColor: colors.primaryDark,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  joinText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: "600",
  },

  iconButton: {
    width: 43,
    height: 43,
    borderRadius: 8,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },
});