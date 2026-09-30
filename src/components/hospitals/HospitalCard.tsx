import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

export default function HospitalCard({
  hospital,
  onPress,
}: {
  hospital: any;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={hospital.image} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name}>{hospital.name}</Text>
        <Text style={styles.type}>{hospital.type}</Text>

        <View style={styles.rating}>
          <Ionicons name="star" size={15} color={colors.success} />
          <Text style={styles.ratingText}>{hospital.rating}</Text>
        </View>

        <View style={[globalStyles.row, styles.distance]}>
          <Ionicons
            name="location-outline"
            size={17}
            color={colors.textSecondary}
          />
          <Text style={styles.distanceText}>{hospital.distance}</Text>
        </View>

        {hospital.emergency && (
          <View style={[globalStyles.row, styles.emergency]}>
            <View style={styles.dot} />
            <Text style={styles.emergencyText}>Emergency Available</Text>
          </View>
        )}
      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#A0A6AF"
        style={styles.arrow}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 145,
    padding: 11,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: colors.white,
    elevation: 2,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 11,
  },
  info: {
    flex: 1,
    marginLeft: 15,
    paddingTop: 3,
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  type: {
    marginTop: 5,
    fontSize: 12,
    color: colors.textSecondary,
  },
  rating: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 9,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: "#E7F8F1",
  },
  ratingText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: "600",
  },
  distance: {
    marginTop: 8,
  },
  distanceText: {
    marginLeft: 5,
    fontSize: 11,
    color: colors.textSecondary,
  },
  emergency: {
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.error,
  },
  emergencyText: {
    marginLeft: 7,
    fontSize: 11,
    color: colors.error,
  },
  arrow: {
    alignSelf: "center",
    marginLeft: 4,
  },
});