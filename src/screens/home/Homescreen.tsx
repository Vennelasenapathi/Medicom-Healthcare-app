import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import { colors } from "@/constants/colors";
import { doctors } from "@/data/doctors";

import HomeHeader from "@/components/home/HomeHeader";
import QuickActions from "@/components/home/QuickActions";
import CareBanner from "@/components/home/CareBanner";
import AppointmentCard from "@/components/home/AppointmentCard";
import DoctorCard from "@/components/home/DoctorCard";
import BottomTabBar from "@/components/home/BottomBar";

export default function HomeScreen({ navigation }: any) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <HomeHeader
          onSearch={() => navigation.navigate("Search")}
        />

        <View
          style={[
            styles.content,
            isTablet && styles.tabletContent,
          ]}
        >
          <QuickActions
            onDoctorPress={() =>
              navigation.navigate("TopDoctors")
            }
          />

          <CareBanner />

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Your Next Appointment
            </Text>
          </View>

          <AppointmentCard />

          <View style={styles.sectionHeader}>
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

      <BottomTabBar navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  seeAll: {
    width: 73,
    height: 26,
    fontSize: 12,
    color: colors.primaryDark,
    fontWeight: "600",
    backgroundColor: "#EAF0FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});