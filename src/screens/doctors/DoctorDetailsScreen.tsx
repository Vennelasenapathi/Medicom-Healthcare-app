import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import BackButton from "@/components/home/BackButton";
import AppButton from "@/components/common/AppButton";
import DoctorProfileCard from "@/components/doctors/DoctorProfileCard";
import AppointmentCalendar from "@/components/doctors/AppointmentCalendar";
import ReviewList from "@/components/doctors/ReviewList";
import { colors } from "@/constants/colors";

export default function DoctorDetailsScreen({
  navigation,
  route,
}: any) {
  const doctor = route.params?.doctor;

  const [tab, setTab] = useState<
    "Consultation" | "Review"
  >("Consultation");

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const handleBook = () => {
    if (!selectedDate || !selectedTime) return;

    navigation.navigate("Consultation", {
      doctor,
      consultation: {
        type: "Video Consultation",
        date: selectedDate,
        time: selectedTime,
        reason: "General Consultation",
      },
    });
  };

  if (!doctor) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>
          Doctor details not found
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={() => navigation.goBack()} />

        <Text style={styles.headerTitle}>
          Doctor's Details
        </Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <DoctorProfileCard doctor={doctor} />

        <View style={styles.tabs}>
          <Text
            onPress={() => setTab("Consultation")}
            style={[
              styles.tab,
              tab === "Consultation" && styles.activeTab,
            ]}
          >
            Consultation
          </Text>

          <Text
            onPress={() => setTab("Review")}
            style={[
              styles.tab,
              tab === "Review" && styles.activeTab,
            ]}
          >
            Reviews
          </Text>
        </View>

        {tab === "Consultation" ? (
          <>
            <AppointmentCalendar
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />

            <View
              style={[
                styles.button,
                (!selectedDate || !selectedTime) &&
                  styles.disabledButton,
              ]}
            >
              <AppButton
                title="Book Appointment ›"
                onPress={handleBook}
              />
            </View>
          </>
        ) : (
          <ReviewList />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: colors.white,
  },

  header: {
    height: 105,
    paddingTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  headerSpace: {
    width: 46,
  },

  content: {
    paddingBottom: 40,
  },

  tabs: {
    marginTop: 24,
    padding: 5,
    borderRadius: 12,
    backgroundColor: "#F1F4F8",
    flexDirection: "row",
  },

  tab: {
    flex: 1,
    paddingVertical: 13,
    textAlign: "center",
    borderRadius: 9,
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },

  activeTab: {
    backgroundColor: colors.white,
    color: colors.primaryDark,
  },

  button: {
    marginTop: 26,
    marginBottom: 20,
  },

  disabledButton: {
    opacity: 0.45,
  },

  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
});