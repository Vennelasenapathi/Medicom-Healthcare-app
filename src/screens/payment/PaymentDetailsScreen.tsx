import React, { useState } from "react";
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
import SuccessModal from "@/components/common/SuccessModal";

export default function PaymentDetails({
  navigation,
  route,
}: any) {
  const { doctor, consultation } = route.params;

  const [successVisible, setSuccessVisible] = useState(false);

  const handleContinue = () => {
  if (consultation.type === "Video Consultation") {
    navigation.replace("VideoCall", {
      doctor,
      consultation,
    });
  } else if (consultation.type === "Chat Consultation") {
    navigation.replace("Chat", {
      doctor,
      consultation,
    });
  } else if (consultation.type === "In-Person Consultation") {
    navigation.replace("AudioCall", {
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
          <BackButton
            onPress={() => navigation.goBack()}
          />

          <Text style={styles.title}>
            Payment Details
          </Text>

          <View style={{ width: 40 }} />
        </View>

        {/* SELECTED DOCTOR */}
        <View style={styles.doctorCard}>

          <Image
            source={doctor.image}
            style={styles.doctorImage}
          />

          <View style={styles.doctorInfo}>

            <Text style={styles.doctorName}>
              {doctor.name}
            </Text>

            <Text style={styles.specialty}>
              {doctor.specialty}
            </Text>

            <Text style={styles.experience}>
              {doctor.experience}
            </Text>

            <View style={styles.doctorBottom}>

              <View style={styles.rating}>
                <Ionicons
                  name="star"
                  size={10}
                  color="#20B486"
                />

                <Text style={styles.ratingText}>
                  {doctor.rating}
                </Text>
              </View>

              <Text style={styles.location}>
                📍 {doctor.location}
              </Text>

            </View>

          </View>
        </View>

        {/* CONSULTATION SUMMARY */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Consultation Summary
          </Text>

          <Pressable>
            <Text style={styles.edit}>
              Edit
            </Text>
          </Pressable>
        </View>

        <View style={styles.summaryCard}>

          <View style={styles.row}>
            <Text style={styles.label}>
              Date & Time
            </Text>

            <Text style={styles.value}>
              {consultation.date},{" "}
              {consultation.time}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Consultation Type
            </Text>

            <Text style={styles.value}>
              {consultation.type}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Consultation Reason
            </Text>

            <Text style={styles.value}>
              {consultation.reason}
            </Text>
          </View>

        </View>

        {/* PAYMENT SUMMARY */}
        <Text style={styles.sectionTitle}>
          Payment Summary
        </Text>

        <View style={styles.summaryCard}>

          <View style={styles.row}>
            <Text style={styles.label}>
              Consultation Fee
            </Text>

            <Text style={styles.value}>
              ₹800
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Taxes & Service Charges
            </Text>

            <Text style={styles.value}>
              ₹199
            </Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>
              Total Amount
            </Text>

            <Text style={styles.totalAmount}>
              ₹999
            </Text>
          </View>

        </View>

        {/* PAYMENT METHOD */}
        <Text style={styles.sectionTitle}>
          Payment Method
        </Text>

        <Pressable style={styles.paymentCard}>

          <Text style={styles.visa}>
            VISA
          </Text>

          <Text style={styles.change}>
            Change
          </Text>

        </Pressable>

        {/* PROCEED */}
        <View style={styles.buttonContainer}>
          <AppButton
            title="Proceed to Pay"
            onPress={() =>
              setSuccessVisible(true)
            }
          />
        </View>

      </ScrollView>

      {/* SUCCESS MODAL */}
      {successVisible && (
     <SuccessModal
        visible={successVisible}
  title="Payment Successful"
  description="Your payment has been confirmed. You can now continue your consultation with doctor."
  buttonTitle={
    consultation.type === "Video Consultation"
      ? "Join Video Consultation"
      : consultation.type === "Chat Consultation"
      ? "Chat with Doctor"
      : "Continue"
  }
  onPress={handleContinue}
/>
      )}  
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

  /* DOCTOR CARD */

  doctorCard: {
    flexDirection: "row",
    padding: 10,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
    backgroundColor: colors.white,
  },

  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: colors.background,
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },

  doctorName: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  specialty: {
    fontSize: 9,
    marginTop: 3,
    color: colors.textSecondary,
  },

  experience: {
    fontSize: 9,
    marginTop: 2,
    color: colors.textSecondary,
  },

  doctorBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F8F3",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 4,
  },

  ratingText: {
    fontSize: 8,
    marginLeft: 2,
    color: "#20B486",
    fontWeight: "600",
  },

  location: {
    fontSize: 8,
    marginLeft: 10,
    color: colors.textSecondary,
  },

  /* SECTIONS */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  edit: {
    fontSize: 9,
    color: colors.primaryDark,
    backgroundColor: "#EAF0FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },

  /* SUMMARY */

  summaryCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 9,
    padding: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  label: {
    flex: 1,
    fontSize: 9,
    color: colors.textPrimary,
  },

  value: {
    flex: 1,
    textAlign: "right",
    fontSize: 8,
    color: colors.textSecondary,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },

  totalLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  totalAmount: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  /* PAYMENT */

  paymentCard: {
    height: 48,
    paddingHorizontal: 12,
    borderRadius: 9,
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  visa: {
    fontSize: 12,
    fontWeight: "800",
    fontStyle: "italic",
    color: "#243B80",
  },

  change: {
    fontSize: 9,
    color: colors.textSecondary,
  },

  buttonContainer: {
    marginTop: 25,
    marginBottom: 10,
  },
});