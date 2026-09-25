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

import { doctors } from "@/data/doctordata";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

export default function HospitalDetailsScreen({
  navigation,
  route,
}: any) {
  const hospital = route?.params?.hospital;

  return (
    <View style={[globalStyles.container, styles.container]}>
      {/* HEADER */}
      <View style={[globalStyles.header, styles.header]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={colors.white}
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          About Hospital
        </Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* HOSPITAL PROFILE */}
        <View style={styles.profileCard}>
          <Image
            source={
              hospital?.image ||
              require("../../../assets/images/medicom/hospital3.png")
            }
            style={styles.hospitalImage}
          />

          <View style={styles.profileInfo}>
            <Text style={styles.hospitalName}>
              {hospital?.name || "City Neuro Hospital"}
            </Text>

            <Text style={globalStyles.smallText}>
              Multi-specialty Hospital
            </Text>

            <View style={[globalStyles.row, styles.profileRow]}>
              <View
                style={[
                  globalStyles.row,
                  styles.rating,
                ]}
              >
                <Ionicons
                  name="star"
                  size={15}
                  color="#15936A"
                />

                <Text style={styles.ratingText}>
                  4.2
                </Text>
              </View>

              <Ionicons
                name="location-outline"
                size={17}
                color="#777F8C"
              />

              <Text style={globalStyles.smallText}>
                800m away
              </Text>
            </View>

            <View
              style={[
                globalStyles.row,
                styles.emergency,
              ]}
            >
              <View style={styles.redDot} />

              <Text style={styles.emergencyText}>
                Emergency Available
              </Text>
            </View>
          </View>
        </View>

        {/* SPECIALTIES */}
        <Text style={styles.sectionTitle}>
          Specialties
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specialties}
        >
          <Specialty
            icon="fitness-outline"
            title="Neurology"
          />

          <Specialty
            icon="body-outline"
            title="Spine Care"
          />

          <Specialty
            icon="medical-outline"
            title="General Medicine"
          />
        </ScrollView>

        {/* DOCTORS */}
        <View
          style={[
            globalStyles.spaceBetween,
            styles.doctorHeader,
          ]}
        >
          <Text style={styles.sectionTitle}>
            Doctors At This Hospital
          </Text>

          <Pressable
            onPress={() =>
              navigation.navigate("TopDoctors")
            }
          >
            <Text style={styles.viewAll}>
              View All
            </Text>
          </Pressable>
        </View>

        <View style={styles.doctorList}>
          {doctors.map((doctor) => (
            <Pressable
              key={doctor.id}
              style={styles.doctorCard}
              onPress={() =>
                navigation.navigate(
                  "DoctorDetails",
                  { doctor }
                )
              }
            >
              <Image
                source={doctor.image}
                style={styles.doctorImage}
              />

              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>
                  {doctor.name}
                </Text>

                <Text style={styles.doctorSpecialty}>
                  {doctor.specialty} |{" "}
                  {doctor.experience}
                </Text>
              </View>

              <View
                style={[
                  globalStyles.row,
                  styles.doctorRating,
                ]}
              >
                <Ionicons
                  name="star"
                  size={15}
                  color="#F5B400"
                />

                <Text style={styles.doctorRatingText}>
                  {doctor.rating}
                </Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#A0A6AF"
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* BOTTOM BUTTONS */}
      <View style={styles.bottomActions}>
        <Pressable style={styles.callButton}>
          <Ionicons
            name="call-outline"
            size={19}
            color={colors.primaryDark}
          />

          <Text style={styles.callText}>
            Call Hospital
          </Text>
        </Pressable>

        <Pressable
          style={[
            globalStyles.button,
            styles.bookButton,
          ]}
          onPress={() =>
            navigation.navigate("TopDoctors")
          }
        >
          <Text style={globalStyles.buttonText}>
            Book Appointment
          </Text>

          <Ionicons
            name="arrow-forward"
            size={19}
            color={colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
}

function Specialty({
  icon,
  title,
}: {
  icon: any;
  title: string;
}) {
  return (
    <View
      style={[
        globalStyles.row,
        styles.specialty,
      ]}
    >
      <Ionicons
        name={icon}
        size={20}
        color={colors.primaryDark}
      />

      <Text style={styles.specialtyText}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },

  header: {
    height: 115,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 11,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  headerSpace: {
    width: 46,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 135,
  },

  /* HOSPITAL */
  profileCard: {
    minHeight: 145,
    borderWidth: 1,
    borderColor: "#DEE2E7",
    borderRadius: 15,
    padding: 11,
    flexDirection: "row",
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  hospitalImage: {
    width: 120,
    height: 120,
    borderRadius: 11,
    resizeMode: "cover",
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

  profileRow: {
    marginTop: 10,
  },

  rating: {
    backgroundColor: "#E8F7F1",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    marginRight: 9,
  },

  ratingText: {
    fontSize: 11,
    color: "#15936A",
    marginLeft: 4,
    fontWeight: "600",
  },

  emergency: {
    marginTop: 10,
  },

  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4D4F",
  },

  emergencyText: {
    fontSize: 11,
    color: "#FF4D4F",
    marginLeft: 7,
  },

  /* SECTION */
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 24,
  },

  /* SPECIALTIES */
  specialties: {
    gap: 10,
    paddingTop: 11,
  },

  specialty: {
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#F7F8FA",
    borderWidth: 1,
    borderColor: "#E4E8ED",
    gap: 8,
  },

  specialtyText: {
    fontSize: 12,
    color: "#737B88",
    fontWeight: "500",
  },

  /* DOCTORS */
  doctorHeader: {
    marginTop: 0,
  },

  viewAll: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primaryDark,
    backgroundColor: "#EAF0FF",
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 7,
    marginTop: 24,
  },

  doctorList: {
    gap: 12,
    marginTop: 12,
  },

  doctorCard: {
    minHeight: 92,
    borderRadius: 13,
    backgroundColor: colors.white,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  doctorImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    resizeMode: "cover",
  },

  doctorInfo: {
    flex: 1,
    marginLeft: 13,
  },

  doctorName: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  doctorSpecialty: {
    fontSize: 10,
    color: "#858C97",
    marginTop: 6,
  },

  doctorRating: {
    marginRight: 10,
    alignSelf: "flex-start",
    marginTop: 16,
    gap: 4,
  },

  doctorRatingText: {
    fontSize: 11,
    color: "#777F8C",
  },

  /* BOTTOM */
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
    height: 58,
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

  bookButton: {
    flex: 1.2,
    height: 58,
    borderRadius: 12,
    gap: 8,
    flexDirection: "row",
  },
});