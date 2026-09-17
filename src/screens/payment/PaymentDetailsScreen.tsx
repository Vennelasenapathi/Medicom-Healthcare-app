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

  /* AFTER CLICKING POPUP BUTTON → HOME */

  const handleContinue = () => {
    setSuccessVisible(false);

    navigation.navigate("Appointments", {
    newAppointment: {
      id: Date.now(),
      doctor: doctor.name,
      specialty: doctor.specialty,
      date: consultation.date,
      time: consultation.time,
      type: consultation.type,
      status: "Confirmed",
      image: doctor.image,
    },
  });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <BackButton onPress={() => navigation.goBack()} />

          <Text style={styles.title}>Payment Details</Text>

          <View style={styles.headerSpacer} />
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
                  size={14}
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
            <Text style={styles.edit}>Edit</Text>
          </Pressable>
        </View>

        <View style={styles.summaryCard}>
          <View style={styles.row}>
            <Text style={styles.label}>
              Date & Time
            </Text>

            <Text style={styles.value}>
              {consultation.date}, {consultation.time}
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
              {consultation.reason || "General Consultation"}
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
          <View style={styles.cardLeft}>
            <View style={styles.cardIcon}>
              <Ionicons
                name="card-outline"
                size={23}
                color={colors.primaryDark}
              />
            </View>

            <View>
              <Text style={styles.cardTitle}>
                Visa
              </Text>

              <Text style={styles.cardNumber}>
                •••• 4242
              </Text>
            </View>
          </View>

          <Text style={styles.change}>
            Change
          </Text>
        </Pressable>

        {/* SECURE PAYMENT */}
        <View style={styles.secureBox}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#20B486"
          />

          <View style={styles.secureTextContainer}>
            <Text style={styles.secureTitle}>
              Secure Payment
            </Text>

            <Text style={styles.secureDescription}>
              Your payment information is encrypted
              and secure.
            </Text>
          </View>
        </View>

        {/* PROCEED TO PAY */}
        <View style={styles.buttonContainer}>
          <AppButton
            title="Proceed to Pay"
            onPress={() => setSuccessVisible(true)}
          />
        </View>
      </ScrollView>

      {/* SUCCESS MODAL */}
      {successVisible && (
        <SuccessModal
          visible={successVisible}
          title="Payment Successful"
          description="Your payment has been confirmed. Your appointment has been booked successfully."
          buttonTitle="Go to Home"
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
    paddingHorizontal: 20,
  },

  scroll: {
    paddingBottom: 40,
  },

  header: {
    height: 105,
    paddingTop: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  headerSpacer: {
    width: 40,
  },

  doctorCard: {
    flexDirection: "row",
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 16,
    backgroundColor: colors.white,
    minHeight: 125,
  },

  doctorImage: {
    width: 92,
    height: 92,
    borderRadius: 12,
    backgroundColor: colors.background,
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },

  doctorName: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  specialty: {
    fontSize: 13,
    marginTop: 5,
    color: colors.textSecondary,
  },

  experience: {
    fontSize: 12,
    marginTop: 4,
    color: colors.textSecondary,
  },

  doctorBottom: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F8F3",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
  },

  ratingText: {
    fontSize: 11,
    marginLeft: 4,
    color: "#20B486",
    fontWeight: "600",
  },

  location: {
    flex: 1,
    fontSize: 11,
    marginLeft: 12,
    color: colors.textSecondary,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 25,
    marginBottom: 12,
  },

  edit: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primaryDark,
    backgroundColor: "#EAF0FF",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 7,
  },

  summaryCard: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 18,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },

  label: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textPrimary,
  },

  value: {
    flex: 1.25,
    textAlign: "right",
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  totalAmount: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  paymentCard: {
    minHeight: 76,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  cardNumber: {
    fontSize: 12,
    marginTop: 3,
    color: colors.textSecondary,
  },

  change: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primaryDark,
  },

  secureBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#F0FBF7",
  },

  secureTextContainer: {
    flex: 1,
    marginLeft: 11,
  },

  secureTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#168A68",
  },

  secureDescription: {
    fontSize: 11,
    marginTop: 3,
    color: colors.textSecondary,
  },

  buttonContainer: {
    marginTop: 28,
    marginBottom: 10,
  },
});