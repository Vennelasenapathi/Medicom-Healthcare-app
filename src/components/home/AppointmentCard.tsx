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

export default function AppointmentCard() {
  return (
    <View style={styles.container}>

      {/* BACK CARD 1 */}
      <View style={styles.card1} />

      {/* BACK CARD 2 */}
      <View style={styles.card2} />

      {/* FRONT CARD */}
      <View style={styles.card}>
        <View style={styles.info}>
          <Image
            source={require("../../../assets/images/medicom/appointment.png")}
            style={styles.image}
          />

          <View style={styles.details}>
            <Text style={styles.name}>
              Dr. Azim Khan
            </Text>

            <Text style={styles.specialty}>
              Dermatologist | 10 Jan 2026, 5:00 PM IST
            </Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <Pressable style={styles.joinButton}>
            <Text style={styles.joinText}>
              Join Consultation
            </Text>

            <Ionicons
              name="chevron-forward"
              size={15}
              color={colors.white}
            />
          </Pressable>

          <Pressable style={styles.smallButton}>
            <Ionicons
              name="create-outline"
              size={24}
              color={colors.white}
            />
          </Pressable>

          <Pressable style={styles.smallButton}>
            <Ionicons
              name="trash-outline"
              size={24}
              color={colors.white}
            />
          </Pressable>
        </View>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 165,
    position: "relative",
    alignItems: "center",
  },

  /* BACK CARD 1 */
  card1: {
    position: "absolute",
    top: 0,
    width: 315,
    height: 67,
    borderRadius: 10,
    backgroundColor: "#E4EDFF",
  },

  /* BACK CARD 2 */
  card2: {
    position: "absolute",
    top: 7,
    width: 273,
    height: 67,
    borderRadius: 10,
    backgroundColor: "#E4EDFF",
  },

  /* FRONT CARD */
  card: {
    position: "absolute",
    top: 14,
    left: 10,
    right: 0,
    width: 355,
    height: 139,
    backgroundColor: colors.white,

    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,

    padding: 8,

    zIndex: 3,
  },

  info: {
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 48,
    height: 48,
    borderRadius: 10,
    marginRight: 8,
  },

  details: {
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  specialty: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 3,
  },

  buttons: {
    flexDirection: "row",
    marginTop: 18,
    gap: 5,
  },

  joinButton: {
    flex: 1,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.primaryDark,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  joinText: {
    fontSize: 13,
    color: colors.white,
    fontWeight: "600",
  },

  smallButton: {
    width: 40,
    height: 40,
    borderRadius: 5,
    backgroundColor: colors.primaryDark,

    alignItems: "center",
    justifyContent: "center",
  },
});