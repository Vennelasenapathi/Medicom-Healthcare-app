import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

export default function DoctorCard({
  doctor,
  onPress,
}: {
  doctor: any;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[globalStyles.card, styles.card]}
      onPress={onPress}
    >
      <Image source={doctor.image} style={styles.image} />

      <View style={styles.info}>
        <Text style={globalStyles.boldText}>{doctor.name}</Text>
        <Text style={globalStyles.smallText}>
          {doctor.specialty} | {doctor.experience}
        </Text>
      </View>

      <View style={[globalStyles.row, styles.rating]}>
        <Ionicons name="star" size={15} color="#F5B400" />
        <Text style={styles.ratingText}>{doctor.rating}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 92,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },

  info: {
    flex: 1,
    marginLeft: 13,
  },

  rating: {
    marginTop: 16,
    marginRight: 10,
    gap: 4,
    alignSelf: "flex-start",
  },

  ratingText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
});