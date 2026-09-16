import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";

export default function DoctorProfileCard({ doctor }: any) {
  return (
    <>
      <View style={styles.card}>
        <Image source={doctor.image} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{doctor.name}</Text>
          <Text style={styles.specialty}>{doctor.specialty}</Text>
          <Text style={styles.experience}>{doctor.experience}</Text>
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.value}>10+</Text>
          <Text style={styles.label}>Experience</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.value}>5000+</Text>
          <Text style={styles.label}>Patients</Text>
        </View>

        <View style={styles.stat}>
          <Text style={styles.value}>⭐ 4.4</Text>
          <Text style={styles.label}>Ratings</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#E7EBF2",
    borderRadius: 16,
    flexDirection: "row",
    backgroundColor: colors.white,
  },

  image: {
    width: 105,
    height: 105,
    borderRadius: 14,
  },

  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  specialty: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textSecondary,
  },

  experience: {
    marginTop: 8,
    fontSize: 13,
    color: colors.textSecondary,
  },

  stats: {
    marginTop: 18,
    paddingVertical: 16,
    borderRadius: 14,
    backgroundColor: "#F7F9FC",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  stat: {
    alignItems: "center",
  },

  value: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  label: {
    marginTop: 5,
    fontSize: 12,
    color: colors.textSecondary,
  },
});