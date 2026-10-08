import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "@/components/home/BackButton";
import AppButton from "@/components/common/AppButton";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

const InfoRow = ({
  icon,
  label,
  value,
  last = false,
}: {
  icon: any;
  label: string;
  value: string;
  last?: boolean;
}) => (
  <View style={[globalStyles.row, !last && styles.infoRow]}>
    <View style={[styles.iconBox, globalStyles.center]}>
      <Ionicons name={icon} size={20} color={colors.primaryDark} />
    </View>
    <View style={styles.rowInfo}>
      <Text style={globalStyles.label}>{label}</Text>
      <Text style={globalStyles.value}>{value}</Text>
    </View>
  </View>
);

const ActionButton = ({
  icon,
  text,
  color,
  onPress,
}: {
  icon: any;
  text: string;
  color: string;
  onPress: () => void;
}) => (
  <Pressable style={styles.actionButton} onPress={onPress}>
    <Ionicons name={icon} size={20} color={color} />
    <Text style={[styles.actionText, { color }]}>{text}</Text>
  </Pressable>
);

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
    const screen =
      appointment.type === "Chat Consultation"
        ? "Chat"
        : appointment.type === "Video Consultation"
        ? "VideoCall"
        : "AudioCall";

    navigation.navigate(screen, { doctor, consultation });
  };

  return (
    <View style={globalStyles.container}>
       <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Header */}
        <View style={[globalStyles.header, styles.header]}>
          <BackButton onPress={onBack} />
          <Text style={globalStyles.title}>Appointment Details</Text>
          <View style={styles.headerSpace} />
        </View>

        {/* Doctor */}
        <View style={[globalStyles.outlinedCard, styles.doctorCard]}>
          <Image source={appointment.image} style={styles.doctorImage} />

          <View style={styles.doctorInfo}>
            <Text style={globalStyles.text}>{appointment.doctor}</Text>
            <Text style={styles.specialty}>
              {appointment.specialty}
            </Text>
            <View style={[globalStyles.row, styles.statusRow]}>
              <Ionicons
                name="checkmark-circle"
                size={15}
                color={colors.success}
              />
              <Text style={styles.status}>{appointment.status}</Text>
            </View>
          </View>
        </View>

        {/* Information */}
        <Text style={[globalStyles.sectionTitle, styles.sectionTitle]}>
          Appointment Information
        </Text>

        <View style={globalStyles.summaryCard}>
          <InfoRow
            icon="calendar-outline"
            label="Date"
            value={appointment.date}
          />

          <InfoRow
            icon="time-outline"
            label="Time"
            value={appointment.time}
          />

          <InfoRow
            icon="videocam-outline"
            label="Consultation Type"
            value={appointment.type}
          />

          <InfoRow
            icon="document-text-outline"
            label="Consultation Reason"
            value={appointment.reason || "General Consultation"}
            last
          />
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <AppButton title="Join Consultation" onPress={handleJoin} />

          <View style={styles.secondaryActions}>
            <ActionButton
              icon="create-outline"
              text="Reschedule"
              color={colors.primaryDark}
              onPress={onReschedule}
            />
            <ActionButton
              icon="trash-outline"
              text="Cancel Appointment"
              color={colors.error}
              onPress={onDelete}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 14,
    paddingBottom: 30,
  },

  header: {
    paddingTop: 45,
  },

  headerSpace: {
    width: 40,
  },

  doctorCard: {
    flexDirection: "row",
    padding: 12,
    marginTop: 20,
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

  specialty: {
    marginTop: 5,
    fontSize: 11,
    color: colors.textSecondary,
  },

  statusRow: {
    marginTop: 7,
  },

  status: {
    marginLeft: 5,
    fontSize: 10,
    fontWeight: "600",
    color: colors.success,
  },

  sectionTitle: {
    marginTop: 22,
    marginBottom: 10,
  },

  infoRow: {
    marginBottom: 18,
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: "#EAF0FF",
  },

  rowInfo: {
    flex: 1,
    marginLeft: 12,
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
  },
});