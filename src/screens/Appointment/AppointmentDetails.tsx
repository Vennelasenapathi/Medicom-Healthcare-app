import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import BackButton from "@/components/home/BackButton";
import AppButton from "@/components/common/AppButton";
import { colors } from "@/constants/colors";

export default function AppointmentDetails({
  appointment,
  navigation,
  onBack,
  onDelete,
  onReschedule,
}: any) {
  const doctor = {
    name: appointment.doctor,
    specialty: appointment.specialty,
    image: appointment.image,
  };

  const consultation = {
    type: appointment.type,
    date: appointment.date,
    time: appointment.time,
    reason: appointment.reason || "General Consultation",
  };

  const handleJoin = () => {
    if (appointment.type === "Chat Consultation") {
      navigation.navigate("Chat", {
        doctor,
        consultation,
      });
    } else if (appointment.type === "Video Consultation") {
      navigation.navigate("VideoCall", {
        doctor,
        consultation,
      });
    } else {
      navigation.navigate("AudioCall", {
        doctor,
        consultation,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <BackButton onPress={onBack} />

          <Text style={styles.title}>
            Appointment Details
          </Text>

          <View style={{ width: 40 }} />
        </View>

        {/* DOCTOR */}
        <View style={styles.doctorCard}>
          <Image
            source={appointment.image}
            style={styles.doctorImage}
          />

          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>
              {appointment.doctor}
            </Text>

            <Text style={styles.specialty}>
              {appointment.specialty}
            </Text>

            <View style={styles.statusRow}>
              <Ionicons
                name="checkmark-circle"
                size={15}
                color="#20B486"
              />

              <Text style={styles.status}>
                {appointment.status}
              </Text>
            </View>
          </View>
        </View>

        {/* APPOINTMENT INFORMATION */}
        <Text style={styles.sectionTitle}>
          Appointment Information
        </Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={colors.primaryDark}
              />
            </View>

            <View style={styles.rowInfo}>
              <Text style={styles.label}>Date</Text>

              <Text style={styles.value}>
                {appointment.date}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons
                name="time-outline"
                size={20}
                color={colors.primaryDark}
              />
            </View>

            <View style={styles.rowInfo}>
              <Text style={styles.label}>Time</Text>

              <Text style={styles.value}>
                {appointment.time}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons
                name="videocam-outline"
                size={20}
                color={colors.primaryDark}
              />
            </View>

            <View style={styles.rowInfo}>
              <Text style={styles.label}>
                Consultation Type
              </Text>

              <Text style={styles.value}>
                {appointment.type}
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color={colors.primaryDark}
              />
            </View>

            <View style={styles.rowInfo}>
              <Text style={styles.label}>
                Consultation Reason
              </Text>

              <Text style={styles.value}>
                {appointment.reason ||
                  "General Consultation"}
              </Text>
            </View>
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <AppButton
            title="Join Consultation"
            onPress={handleJoin}
          />

          <View style={styles.secondaryActions}>
            <Pressable
              style={styles.actionButton}
              onPress={onReschedule}
            >
              <Ionicons
                name="create-outline"
                size={20}
                color={colors.primaryDark}
              />

              <Text style={styles.actionText}>
                Reschedule
              </Text>
            </Pressable>

            <Pressable
              style={styles.actionButton}
              onPress={onDelete}
            >
              <Ionicons
                name="trash-outline"
                size={20}
                color="#FF4D4F"
              />

              <Text style={styles.deleteText}>
                Cancel Appointment
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 14,
  },

  scroll: {
    paddingBottom: 30,
  },

  header: {
    height: 92,
    paddingTop: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  doctorCard: {
    flexDirection: "row",
    padding: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 12,
  },

  doctorImage: {
    width: 75,
    height: 75,
    borderRadius: 10,
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },

  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  specialty: {
    marginTop: 5,
    fontSize: 11,
    color: colors.textSecondary,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  status: {
    marginLeft: 5,
    fontSize: 10,
    color: "#20B486",
    fontWeight: "600",
  },

  sectionTitle: {
    marginTop: 22,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  card: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#F8FAFC",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
  },

  rowInfo: {
    flex: 1,
    marginLeft: 12,
  },

  label: {
    fontSize: 10,
    color: colors.textSecondary,
  },

  value: {
    marginTop: 3,
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  actions: {
    marginTop: 20,
  },

  secondaryActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },

  actionButton: {
    flex: 1,
    height: 45,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  actionText: {
    marginLeft: 6,
    fontSize: 11,
    fontWeight: "600",
    color: colors.primaryDark,
  },

  deleteText: {
    marginLeft: 6,
    fontSize: 11,
    fontWeight: "600",
    color: "#FF4D4F",
  },
});