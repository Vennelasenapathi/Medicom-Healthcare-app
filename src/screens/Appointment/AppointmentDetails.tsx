import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AppButton from "@/components/common/AppButton";
import BackButton from "@/components/home/BackButton";
import { colors } from "@/constants/colors";

export default function AppointmentDetails({
  appointment,
  onBack,
  onDelete,
  onReschedule,
}: any) {
  const [deleteVisible, setDeleteVisible] = useState(false);

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <BackButton onPress={onBack} />

        <Text style={styles.title}>
          Appointment Details
        </Text>

        <View style={{ width: 40 }} />
      </View>

      {/* DOCTOR */}
      <View style={styles.doctor}>
        <Image
          source={appointment.image}
          style={styles.image}
        />

        <View>
          <Text style={styles.name}>
            {appointment.doctor}
          </Text>

          <Text style={styles.specialty}>
            {appointment.specialty}
          </Text>
        </View>
      </View>

      {/* INFORMATION */}
      <View style={styles.infoBox}>
        <Info
          label="Date & Time"
          value={`${appointment.date}, ${appointment.time}`}
        />

        <Info
          label="Consultation Type"
          value={appointment.type}
        />

        <Info
          label="Status"
          value={appointment.status}
        />
      </View>

      {/* REPORT */}
      <View style={styles.report}>
        <Ionicons
          name="document-text-outline"
          size={25}
          color={colors.primaryDark}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.reportName}>
            MRI_Report.pdf
          </Text>

          <Text style={styles.uploaded}>
            Uploaded successfully
          </Text>
        </View>
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>

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

        <Pressable
          style={styles.iconButton}
          onPress={() => setDeleteVisible(true)}
        >
          <Ionicons
            name="trash-outline"
            size={21}
            color={colors.white}
          />
        </Pressable>

      </View>

      {/* DELETE CONFIRMATION POPUP */}
      <Modal
        visible={deleteVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setDeleteVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>

            <View style={styles.alert}>
              <Ionicons
                name="alert-outline"
                size={40}
                color={colors.error}
              />
            </View>

            <Text style={styles.modalTitle}>
              Delete Appointment?
            </Text>

            <Text style={styles.modalText}>
              This appointment will be permanently
              removed from your schedule. This
              action cannot be undone.
            </Text>

            <View style={styles.modalButton}>
              <AppButton
                title="Back"
                onPress={() => setDeleteVisible(false)}
              />
            </View>

            <Pressable
              style={styles.deleteButton}
              onPress={() => {
                setDeleteVisible(false);
                onDelete();
              }}
            >
              <Text style={styles.deleteText}>
                Delete Appointment
              </Text>
            </Pressable>

          </View>
        </View>
      </Modal>

    </View>
  );
}

function Info({ label, value }: any) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>
        {label}
      </Text>

      <Text style={styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
  },

  header: {
    height: 95,
    paddingTop: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  doctor: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 9,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  specialty: {
    fontSize: 11,
    marginTop: 5,
    color: colors.textSecondary,
  },

  infoBox: {
    marginTop: 22,
    padding: 15,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: colors.borderLight,
  },

  infoRow: {
    marginBottom: 15,
  },

  label: {
    fontSize: 10,
    color: colors.textSecondary,
  },

  value: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  report: {
    marginTop: 15,
    padding: 13,
    borderWidth: 1,
    borderRadius: 9,
    borderColor: colors.borderLight,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  reportName: {
    fontSize: 12,
    fontWeight: "600",
  },

  uploaded: {
    fontSize: 10,
    marginTop: 3,
    color: colors.primaryDark,
  },

  actions: {
    marginTop: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  joinButton: {
    flex: 1,
    height: 47,
    borderRadius: 8,
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

  iconButton: {
    width: 47,
    height: 47,
    borderRadius: 8,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.28)",
    alignItems: "center",
    justifyContent: "center",
  },

  modal: {
    width: "85%",
    height: 400,
    padding: 25,
    borderRadius: 14,
    backgroundColor: colors.white,
    alignItems: "center",
  },

  alert: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#FFF2F2",
    alignItems: "center",
    justifyContent: "center",
  },

  modalTitle: {
    marginTop: 18,
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  modalText: {
    marginTop: 10,
    marginBottom: 18,
    paddingHorizontal: 8,
    paddingBottom: 15,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 15,
    color: colors.textSecondary,
  },

  modalButton: {
    width: "100%",
  },

  deleteButton: {
    width: "100%",
    height: 44,
    marginTop: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  deleteText: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: "600",
  },
});