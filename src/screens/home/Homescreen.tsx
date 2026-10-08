import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import NotificationScreen from "./NotificationScreen";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { doctors } from "@/data/doctors";
import HomeHeader from "@/components/home/HomeHeader";
import QuickActions from "@/components/home/QuickActions";
import CareBanner from "@/components/home/CareBanner";
import AppointmentCard from "@/components/home/AppointmentCard";
import DoctorCard from "@/components/home/DoctorCard";
import BottomTabBar from "@/components/Bottombar/BottomBar";

export default function HomeScreen({ navigation }: any) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const [showNotifications, setShowNotifications] = useState(false);
  return (
    <View style={[globalStyles.container, styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <HomeHeader
          onProfilePress={() => navigation.navigate("Profile")}
          onSearch={() => navigation.navigate("Search")}
          onNotificationPress={() => setShowNotifications(true)}
        />

        <View
          style={[
            styles.content,
            isTablet && styles.tabletContent,
          ]}
        >
          <QuickActions
            onDoctorPress={() => navigation.navigate("Doctors")}
            onAmbulancePress={() =>
              navigation.navigate("Ambulance")
            }
            onHospitalPress={() =>
              navigation.navigate("Hospitals")
            }
            onPharmacyPress={() =>
              navigation.navigate("Pharmacy")
            }
          />

          <CareBanner />

          <View
            style={[
              globalStyles.spaceBetween,
              styles.sectionHeader,
            ]}
          >
            <Text style={styles.sectionTitle}>
              Your Next Appointment
            </Text>
          </View>

          <AppointmentCard
            press={() =>
              navigation.navigate("Chat", {
                doctor: {
                  name: "Dr. Azim Khan",
                  specialty: "Dermatologist",
                  image: require("../../../assets/images/medicom/doctors3.png"),
                },
                consultation: {
                  type: "Chat Consultation",
                  date: "10 January 2026",
                  time: "5:00 PM IST",
                  reason: "General Consultation",
                },
              })
            }
          />

          <View
            style={[
              globalStyles.spaceBetween,
              styles.sectionHeader,
            ]}
          >
            <Text style={styles.sectionTitle}>
              Top Doctors
            </Text>

            <Text
              onPress={() =>
                navigation.navigate("TopDoctors")
              }
              style={styles.seeAll}
            >
              See All
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.name}
                doctor={doctor}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <BottomTabBar
        navigation={navigation}
        activeTab="Home"
      />

      {showNotifications && (
      <View style={styles.notificationOverlay}>
        <NotificationScreen
          onClose={() => setShowNotifications(false)}
        />
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },

  scroll: {
    paddingBottom: 90,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  tabletContent: {
    maxWidth: 700,
    alignSelf: "center",
    width: "100%",
  },

  notificationOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },

  sectionHeader: {
    marginTop: 25,
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  seeAll: {
    fontSize: 12,
    color: colors.primaryDark,
    fontWeight: "600",
    backgroundColor: "#EAF0FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
});