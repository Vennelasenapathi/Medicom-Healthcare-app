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
import { doctors } from "@/data/doctordata";
import { specialties } from "@/data/Hospitals";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import AppButton from "@/components/common/AppButton";
import DoctorCard from "@/components/doctors/DoctorCard";

export default function HospitalDetailsScreen({ navigation, route, }: any) {
  const hospital = route?.params?.hospital;
  return (
    <View style={[globalStyles.container, styles.container]}>
       <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {/* HEADER */}
      <View style={[globalStyles.header, styles.header]}>
        <Pressable onPress={() => navigation.goBack()} style={styles.back}>
          <Ionicons name="chevron-back" size={28} color={colors.white} />
        </Pressable>
        <Text style={globalStyles.title}>About Hospital</Text>
        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HOSPITAL */}
        <View style={[globalStyles.outlinedCard, styles.profile]}>
          <Image source={hospital?.image} style={styles.hospitalImage} />

          <View style={styles.profileInfo}>
            <Text style={styles.hospitalName}>
              {hospital?.name || "City Neuro Hospital"}
            </Text>
            <Text style={globalStyles.smallText}>Multi-specialty Hospital</Text>
            <View style={[globalStyles.row, styles.profileRow]}>
              <View style={[globalStyles.row, styles.rating]}>
                <Ionicons name="star" size={15} color="#15936A" />
                <Text style={styles.ratingText}>4.2</Text>
              </View>

              <Ionicons
                name="location-outline"
                size={17}
                color={colors.textSecondary}
              />
              <Text style={globalStyles.smallText}>800m away</Text>
            </View>
            <View style={[globalStyles.row, styles.emergency]}>
              <View style={styles.redDot} />
              <Text style={globalStyles.errorText}>Emergency Available</Text>
            </View>
          </View>
        </View>

        {/* SPECIALTIES */}
        <Text style={[globalStyles.sectionTitle, styles.section]}>Specialties</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specialties}
        >
          {specialties.map(([icon, title]) => (
            <View key={title} style={[globalStyles.row, styles.specialty]}>
              <Ionicons
                name={icon as any}
                size={20}
                color={colors.primaryDark}
              />
              <Text style={styles.specialtyText}>{title}</Text>
            </View>
          ))}
        </ScrollView>

        {/* DOCTORS */}
        <View style={[globalStyles.spaceBetween, styles.doctorHeader]}>
          <Text style={[globalStyles.sectionTitle, styles.doctorTitle]}>
            Doctors At This Hospital
          </Text>
          <Pressable onPress={() => navigation.navigate("TopDoctors")}>
            <Text style={styles.viewAll}>View All</Text>
          </Pressable>
        </View>
        <View style={styles.doctorList}>
          {doctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onPress={() => navigation.navigate("DoctorDetails", { doctor })}
            />
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomActions}>
        <Pressable
          style={styles.callButton}
          onPress={() =>
            navigation.navigate("AudioCall", {
              hospital,
              name: hospital?.name || "City Neuro Hospital",
              type: "hospital",
            })
          }
        >
          <Ionicons
            name="call-outline"
            size={19}
            color={colors.primaryDark}
          />
          <Text style={styles.callText}>Call Hospital</Text>
        </Pressable>
        <AppButton
          title="Book Appointment"
          onPress={() => navigation.navigate("TopDoctors")}
          showArrow
          style={styles.bookButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.white },

  header: {
    height: 115,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  back: {
    width: 46,
    height: 46,
    borderRadius: 11,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  headerSpace: { width: 46 },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 135,
  },

  profile: {
    minHeight: 145,
    padding: 11,
    flexDirection: "row",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  hospitalImage: {
    width: 120,
    height: 120,
    borderRadius: 11,
  },

  profileInfo: {
    flex: 1,
    paddingLeft: 15,
    paddingTop: 5,
  },

  hospitalName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  profileRow: { marginTop: 10 },

  rating: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    marginRight: 9,
    borderRadius: 6,
    backgroundColor: "#E8F7F1",
  },

  ratingText: {
    marginLeft: 4,
    fontSize: 11,
    fontWeight: "600",
    color: "#15936A",
  },

  emergency: { marginTop: 10 },

  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 7,
    backgroundColor: colors.error,
  },

  section: { marginTop: 24 },

  specialties: {
    gap: 10,
    paddingTop: 11,
  },

  specialty: {
    height: 48,
    paddingHorizontal: 16,
    gap: 8,
    borderRadius: 10,
    backgroundColor: "#F7F8FA",
    borderWidth: 1,
    borderColor: "#E4E8ED",
  },

  specialtyText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#737B88",
  },

  doctorHeader: { marginTop: 0 },

  doctorTitle: { marginTop: 24 },

  viewAll: {
    marginTop: 24,
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 7,
    fontSize: 12,
    fontWeight: "600",
    color: colors.primaryDark,
    backgroundColor: "#EAF0FF",
  },

  doctorList: {
    gap: 12,
    marginTop: 12,
  },

  bottomActions: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
    flexDirection: "row",
    gap: 10,
  },

  callButton: {
    flex: 0.8,
    height: 56,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: colors.primaryDark,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  callText: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  bookButton: { flex: 1.2 },
});