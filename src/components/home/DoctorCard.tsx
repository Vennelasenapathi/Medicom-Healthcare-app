import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

interface Doctor {
  name: string;
  specialty: string;
  image: any;
  rating: string;
}

interface Props {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: Props) {
  return (
    <Pressable style={styles.card}>
      <Image
        source={doctor.image}
        style={styles.image}
      />
      <View style={styles.details}>

      <Text
        numberOfLines={1}
        style={styles.name}
      >
        {doctor.name}
      </Text>

      <View style={styles.rating}>
        <Ionicons
          name="star"
          size={16}
          color="#F5B400"
        />

        <Text style={styles.ratingText}>
          {doctor.rating}
        </Text>
      </View>
      </View>

      <Text style={styles.specialty}>
        {doctor.specialty}
      </Text>

      
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 200,
    marginRight: 8,
    borderRadius: 9,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.borderLight,
    padding: 5,
  },

  image: {
    width: "100%",
    height: 128,
    borderRadius: 7,
    resizeMode: "cover",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },

  name: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 4,
  },

  specialty: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },

  ratingText: {
    fontSize: 10,
    marginLeft: 3,
    color: colors.textSecondary,
  },
});