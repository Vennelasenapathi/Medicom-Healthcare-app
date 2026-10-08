import React, { useState } from "react";
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
import SuccessModal from "@/components/common/SuccessModal";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

export default function PaymentDetails({ navigation, route }: any) {
  const { doctor, consultation } = route.params;
  const [successVisible, setSuccessVisible] = useState(false);

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
        <View style={[globalStyles.header, styles.header]}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={globalStyles.title}>Payment Details</Text>
          <View style={styles.spacer} />
        </View>

        <View style={styles.doctorCard}>
          <Image source={doctor.image} style={styles.doctorImage} />

          <View style={styles.doctorInfo}>
            <Text style={globalStyles.boldText}>{doctor.name}</Text>
            <Text style={globalStyles.smallText}>{doctor.specialty}</Text>
            <Text style={styles.experience}>{doctor.experience}</Text>

            <View style={[globalStyles.row, styles.doctorBottom]}>
              <View style={styles.rating}>
                <Ionicons name="star" size={14} color={colors.success} />
                <Text style={styles.ratingText}>{doctor.rating}</Text>
              </View>
              <Text style={styles.location}>{doctor.location}</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={globalStyles.sectionTitle}>
            Consultation Summary
          </Text>
          <Text style={styles.edit}>Edit</Text>
        </View>

        <View style={globalStyles.summaryCard}>
          <InfoRow
            label="Date & Time"
            value={`${consultation.date}, ${consultation.time}`}
          />
          <InfoRow
            label="Consultation Type"
            value={consultation.type}
          />
          <InfoRow
            label="Consultation Reason"
            value={consultation.reason || "General Consultation"}
          />
        </View>

        <Text style={styles.heading}>Payment Summary</Text>

        <View style={globalStyles.summaryCard}>
          <InfoRow label="Consultation Fee" value="₹800" />
          <InfoRow label="Taxes & Service Charges" value="₹199" />

          <View style={globalStyles.totalRow}>
            <Text style={globalStyles.totalLabel}>Total Amount</Text>
            <Text style={globalStyles.totalAmount}>₹999</Text>
          </View>
        </View>

        <Text style={styles.heading}>Payment Method</Text>

        <Pressable style={styles.paymentCard}>
          <View style={globalStyles.row}>
            <View style={styles.cardIcon}>
              <Ionicons
                name="card-outline"
                size={23}
                color={colors.primaryDark}
              />
            </View>

            <View>
              <Text style={styles.cardTitle}>Visa</Text>
              <Text style={globalStyles.smallText}>•••• 4242</Text>
            </View>
          </View>

          <Text style={styles.change}>Change</Text>
        </Pressable>

        <View style={styles.secureBox}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color={colors.success}
          />

          <View style={styles.secureText}>
            <Text style={styles.secureTitle}>Secure Payment</Text>
            <Text style={globalStyles.smallText}>
              Your payment information is encrypted and secure.
            </Text>
          </View>
        </View>

        <View style={styles.button}>
          <AppButton
            title="Proceed to Pay"
            onPress={() => setSuccessVisible(true)}
          />
        </View>
      </ScrollView>

      {successVisible && (
        <SuccessModal
          visible={successVisible}
          title="Payment Successful"
          description="Your payment has been confirmed. Your appointment has been booked successfully."
          buttonTitle="Go to My Appointments"
          onPress={handleContinue}
        />
      )}
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={globalStyles.detailRow}>
      <Text style={globalStyles.detailLabel}>{label}</Text>
      <Text style={globalStyles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 0,
    height: 105,
    paddingTop: 38,
  },
  spacer: {
    width: 40,
  },

  doctorCard: {
    flexDirection: "row",
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 16,
    backgroundColor: colors.white,
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
  experience: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textSecondary,
  },
  doctorBottom: {
    marginTop: 9,
  },
  rating: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#E8F8F3",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: "600",
    color: colors.success,
  },
  location: {
    flex: 1,
    marginLeft: 12,
    fontSize: 11,
    color: colors.textSecondary,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
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
  heading: {
    marginTop: 25,
    marginBottom: 12,
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  paymentCard: {
    minHeight: 76,
    padding: 12,
    borderRadius: 14,
    backgroundColor: "#F8FAFC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardIcon: {
    width: 46,
    height: 46,
    marginRight: 12,
    borderRadius: 10,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
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
  secureText: {
    flex: 1,
    marginLeft: 11,
  },
  secureTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#168A68",
  },
  button: {
    marginTop: 28,
    marginBottom: 10,
  },
});