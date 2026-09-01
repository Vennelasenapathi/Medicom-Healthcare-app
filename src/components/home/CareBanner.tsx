import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

export default function CareBanner() {
  return (
    <View style={styles.banner}>
      <View style={styles.content}>
        <View style={styles.tag}>
          <Text style={styles.tagText}>Ending soon</Text>
        </View>

        <Text style={styles.title}>
          Trusted care for you & your loved ones
        </Text>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            Get Care Now
          </Text>

          <Ionicons
            name="arrow-forward"
            size={12}
            color={colors.white}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    height: 156,
    backgroundColor: "#D3E1FE",
    borderRadius: 12,
    marginTop: 26,
    marginLeft: 10,
    marginRight: 10,
    position: "relative",
    overflow: "hidden",
  },

  content: {
    padding: 20,
    width: 292,
  },

  tag: {
    width: 82,
    height: 19,
    alignSelf: "flex-start",
    backgroundColor: colors.white,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
  },

  tagText: {
    fontSize: 10,
    color: colors.primaryDark,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 5,
  },

  button: {
    marginTop: 12,
    height: 40,
    paddingHorizontal: 9,
    alignSelf: "flex-start",
    borderRadius: 10,
    backgroundColor: colors.primaryDark,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },

  buttonText: {
    fontSize: 12,
    color: colors.white,
    fontWeight: "700",
  },
});