import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

export default function AudioCallScreen({navigation, }: any) {
  const [seconds, setSeconds] = useState(0);

  /* CALL TIMER */

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* FORMAT TIMER */

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return [ hours, minutes, secs,]
      .map((value) => String(value).padStart(2, "0"))
      .join(":");
  };

  /* END CALL */

  const endCall = () => {
    navigation.navigate("Home");
  };

  return (
    <ImageBackground
      source={require(
        "../../../assets/images/medicom/topdoctor5.png"
      )}
      style={styles.container}
      blurRadius={8}
    >
      <View style={styles.overlay}>

        {/* AVATAR */}

        <View style={styles.avatar}>
          <Ionicons
            name="person"
            size={35}
            color={colors.textSecondary}
          />
        </View>

        {/* DOCTOR NAME */}

        <Text style={styles.name}>
          Dr. Azim Khan
        </Text>

        {/* LIVE TIMER */}

        <Text style={styles.timer}>
          {formatTime(seconds)}
        </Text>

        {/* CONTROLS */}

        <View style={styles.controls}>

          <Pressable style={styles.smallButton}>
            <Ionicons
              name="volume-medium"
              size={18}
              color={colors.white}
            />
          </Pressable>

          {/* END CALL */}

          <Pressable
            style={styles.endCall}
            onPress={endCall}
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
    fontSize: 18,
    fontWeight: "600",
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