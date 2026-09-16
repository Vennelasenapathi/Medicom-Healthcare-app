import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/constants/colors";

export default function ReviewList() {
  const reviews = [
    {
      name: "Gabby Mathew",
      date: "Dec 10, 2025",
      text:
        "Good experience overall. Diagnosis was accurate and the clinic staff was helpful.",
    },
    {
      name: "Chris Doe",
      date: "Jan 10, 2026",
      text:
        "Professional, patient, and reassuring. The consultation felt unhurried.",
    },
    {
      name: "Christy Joan",
      date: "Aug 22, 2025",
      text:
        "Dr. Jazmine carefully examined me and explained everything clearly.",
    },
  ];

  return (
    <View style={styles.container}>
      {reviews.map((review) => (
        <View key={review.name} style={styles.card}>
          <View style={styles.top}>
            <Text style={styles.name}>{review.name}</Text>
            <Text style={styles.date}>{review.date}</Text>
          </View>

          <Text style={styles.stars}>★★★★★</Text>

          <Text style={styles.text}>{review.text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  card: {
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E8ECF2",
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  date: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  stars: {
    marginTop: 8,
    fontSize: 15,
  },

  text: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
  },
});