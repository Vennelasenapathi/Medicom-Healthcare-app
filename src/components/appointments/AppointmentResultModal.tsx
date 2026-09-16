import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import AppButton from "@/components/common/AppButton";
import { colors } from "@/constants/colors";

type Props = {
  visible: boolean;
  type: "cancelled" | "rescheduled";
  onViewAppointments: () => void;
  onBack: () => void;
};

export default function AppointmentResultModal({
  visible,
  type,
  onViewAppointments,
  onBack,
}: Props) {
  const cancelled = type === "cancelled";

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>

          {/* ICON */}
          <View
            style={[
              styles.iconCircle,
              cancelled && styles.cancelledCircle,
            ]}
          >
            <Ionicons
              name="checkmark"
              size={42}
              color={colors.primaryDark}
            />
          </View>

          {/* TITLE */}
          <Text style={styles.title}>
            {cancelled
              ? "Appointment Cancelled"
              : "Appointment Rescheduled"}
          </Text>

          {/* MESSAGE */}
          <Text style={styles.message}>
            {cancelled
              ? "Your appointment has been successfully cancelled. Any applicable refund will be processed as per our policy."
              : "Your appointment has been successfully rescheduled. Please check the updated date and time in your appointments."}
          </Text>

          {/* BACK */}
          <Pressable
            style={styles.outlineButton}
            onPress={onBack}
          >
            <Text style={styles.outlineText}>
              Back
            </Text>
          </Pressable>

          {/* VIEW APPOINTMENTS */}
          <View style={styles.primaryButton}>
            <AppButton
              title="View Appointments"
              onPress={onViewAppointments}
            />
          </View>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.28)",
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    width: "85%",
    height: 400,
    paddingHorizontal: 20,
    paddingVertical: 28,
    borderRadius: 15,
    backgroundColor: colors.white,
    alignItems: "center",
  },

  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#F2F6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 17,
  },

  cancelledCircle: {
    backgroundColor: "#F2F6FF",
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
  },

  message: {
    marginTop: 8,
    marginBottom: 17,
    paddingHorizontal: 9,
    paddingBottom: 15,
    fontSize: 13,
    lineHeight: 15,
    color: colors.textSecondary,
    textAlign: "center",
  },

  outlineButton: {
    width: "100%",
    height: 42,
    borderWidth: 1,
    marginTop: 25,
    borderColor: colors.primaryDark,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  outlineText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryDark,
  },

  primaryButton: {
    width: "100%",
    marginTop: 10,
  },
});