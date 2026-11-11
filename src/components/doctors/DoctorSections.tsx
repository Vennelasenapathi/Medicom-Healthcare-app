import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DoctorCard from "@/components/doctors/DoctorCard";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

type Props = {
  specialties: any[];
  doctors: any[];
  previousDoctors: any[];
  onDoctorPress: (doctor: any) => void;
  onSpecialtyPress: () => void;
  searching: boolean;
};

export function SpecialtySection({
  specialties,
  onSpecialtyPress,
}: Pick<Props, "specialties" | "onSpecialtyPress">) {
  return (
    <>
      <View style={[globalStyles.sectionHeader, styles.sectionHeader]}>
        <Text style={globalStyles.sectionTitle}>Browse By Specialty</Text>
        <Pressable
          style={globalStyles.smallButton}
          onPress={onSpecialtyPress}
        >
          <Text style={styles.seeAll}>See All</Text>
        </Pressable>
      </View>

      <View style={styles.specialtyGrid}>
        {specialties.map((item) => (
          <Pressable
            key={item.title}
            style={styles.specialtyItem}
            onPress={onSpecialtyPress}
          >
            <View style={[styles.specialtyIcon, globalStyles.center]}>
              <MaterialCommunityIcons
                name={item.icon}
                size={31}
                color={colors.primaryDark}
              />
            </View>
            <Text style={styles.specialtyName}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

export function DoctorSection({
  doctors,
  previousDoctors,
  onDoctorPress,
  searching,
}: Pick<Props, "doctors" | "previousDoctors" | "onDoctorPress" | "searching">) {
  return (
    <>
      <Text style={[globalStyles.sectionTitle, styles.recommendedTitle]}>
        {searching ? "Search Results" : "Recommended For You"}
      </Text>

      {searching ? (
        doctors.length ? (
          doctors.map((doctor) => (
            <DoctorCard
              key={doctor.name}
              doctor={doctor}
              onPress={() => onDoctorPress(doctor)}
            />
          ))
        ) : (
          <Text style={styles.noResults}>No doctors found.</Text>
        )
      ) : (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
            decelerationRate="fast"
            snapToInterval={312}
            snapToAlignment="start"
          >
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.name}
                doctor={doctor}
                onPress={() => onDoctorPress(doctor)}
              />
            ))}
          </ScrollView>

          <View style={[globalStyles.row, styles.dots]}>
            <View style={styles.activeDot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>

          <Text style={[globalStyles.sectionTitle, styles.previousTitle]}>
            Previously Consulted
          </Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {previousDoctors.map((doctor) => (
              <Pressable
                key={doctor.name}
                style={styles.previousDoctor}
                onPress={() => onDoctorPress(doctor)}
              >
                <Image source={doctor.image} style={styles.previousImage} />
                <Text style={styles.previousName} numberOfLines={1}>
                  {doctor.name}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: { marginTop: 29 },
  seeAll: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  specialtyGrid: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  specialtyItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 17,
  },
  specialtyIcon: {
    width: 62,
    height: 62,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
    elevation: 1,
  },
  specialtyName: {
    marginTop: 7,
    minHeight: 32,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    textAlign: "center",
    color: colors.textSecondary,
  },
  recommendedTitle: { marginTop: 5, marginBottom: 11 },
  carousel: { paddingRight: 20, paddingBottom: 5 },
  dots: { marginTop: 10, justifyContent: "center" },
  activeDot: {
    width: 20,
    height: 5,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: colors.primaryDark,
  },
  dot: {
    width: 10,
    height: 5,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: "#C9D8FF",
  },
  previousTitle: { marginTop: 15, marginBottom: 11 },
  previousDoctor: { width: 100, marginRight: 10 },
  previousImage: { width: 100, height: 100, borderRadius: 8 },
  previousName: {
    marginTop: 7,
    fontSize: 11,
    color: colors.textSecondary,
  },
  noResults: {
    marginTop: 15,
    marginBottom: 20,
    textAlign: "center",
    color: colors.textSecondary,
    fontSize: 14,
  },
});