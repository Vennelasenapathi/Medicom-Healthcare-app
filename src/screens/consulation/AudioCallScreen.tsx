import React from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";

export default function AudioCallScreen({
  navigation,
}: any) {
  return (
    <ImageBackground
      source={require(
        "../../../assets/images/medicom/topdoctor5.png"
      )}
      style={styles.container}
      blurRadius={8}
    >

      <View style={styles.overlay}>

        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={35}
            color={colors.textSecondary}
          />
        </View>

        <Text style={styles.name}>
          Dr. Azim Khan
        </Text>

        <Text style={styles.timer}>
          00:05:24
        </Text>

        <View style={styles.controls}>

          <Pressable style={styles.smallButton}>
            <Ionicons
              name="volume-medium"
              size={18}
              color={colors.white}
            />
          </Pressable>

          <Pressable
            style={styles.endCall}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="call"
              size={22}
              color={colors.white}
            />
          </Pressable>

          <Pressable style={styles.smallButton}>
            <Ionicons
              name="mic"
              size={18}
              color={colors.white}
            />
          </Pressable>

        </View>

        <Text style={styles.swipe}>
          Swipe back to menu
        </Text>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 40,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  name: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "700",
    color: colors.white,
  },

  timer: {
    marginTop: 70,
    fontSize: 9,
    color: colors.white,
  },

  controls: {
    marginTop: 18,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },

  smallButton: {
    width: 38,
    height: 38,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.4)",
    alignItems: "center",
    justifyContent: "center",
  },

  endCall: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center",
  },

  swipe: {
    position: "absolute",
    bottom: 25,
    fontSize: 8,
    color: colors.white,
  },
});