
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import {Appointment} from "@/data/Appointments";

type AppointmentCardProps = {
  appointment: Appointment;
  press: () => void;
  onDelete: () => void;
  onEdit: () => void;
};

export default function AppointmentCard({
  appointment,
  press,
  onDelete,
  onEdit,
}: AppointmentCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card1} />
      <View style={styles.card2} />

      <View style={styles.card}>
        <View style={styles.info}>
          <Image
            source={appointment.image}
            style={styles.image}
          />

          <View style={styles.details}>
            <Text style={styles.name}>
              {appointment.doctor}
            </Text>

            <Text style={styles.specialty}>
              {appointment.specialty} 
            </Text>
            <Text style={styles.specialty}>
              {appointment.date} | {appointment.time}
            </Text>
            <Text style={styles.specialty}>
              {appointment.type}
            </Text>
          </View>
        </View>

        <View style={styles.buttons}>
          <Pressable onPress={press} style={styles.joinButton}>
            <Text style={styles.joinText}>
              Join Consultation
            </Text>
            <Ionicons
              name="chevron-forward"
              size={15}
              color={colors.white}
            />
          </Pressable>

          <Pressable onPress={onEdit} style={styles.smallButton}>
            <Ionicons
              name="create-outline"
              size={24}
              color={colors.white}
            />
          </Pressable>

          <Pressable
            onPress={onDelete}
            style={styles.smallButton}
          >
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
    marginBottom: 20,
    marginTop: 10,
  },
  card1: {
    position: "absolute",
    top: 0,
    width: 345,
    height: 67,
    borderRadius: 10,
    backgroundColor: "#E4EDFF",
    borderColor: colors.borderGray,
   
  },
  card2: {
    position: "absolute",
    bottom: 110,
    width: 320,
    height: 67,
    borderRadius: 10,
    backgroundColor: "#E4EDFF",
    borderColor: colors.borderGray,
    
  },
  card: {
    position: "absolute",
    top: 14,
    left: 10,
    right: 0,
    width: 355,
    height: 175,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
    zIndex: 3,
  },
  info: {
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
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
    fontSize: 12,
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
