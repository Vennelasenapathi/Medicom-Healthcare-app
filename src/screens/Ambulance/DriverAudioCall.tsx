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

export default function DriverAudioCallScreen({navigation,}: any) {
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
    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );
    const secs = totalSeconds % 60;

    return [hours, minutes, secs].map((value) =>
        String(value).padStart(2, "0")
      )
      .join(":");
  };

  /* END CALL */

  const endCall = () => {navigation.goBack();};

  return (
    <ImageBackground
      source={require( "../../../assets/images/medicom/ambulancebackground.png" )}
      style={styles.container}
      blurRadius={8}
    >
      <View style={styles.overlay}>

        {/* DRIVER AVATAR */}

        <View style={styles.avatar}>
          <Ionicons
            name="car"
            size={38}
            color={colors.primaryDark}
          />
        </View>

        {/* DRIVER NAME */}

        <Text style={styles.name}>
          Ambulance Driver
        </Text>

        <Text style={styles.status}>
          Connected
        </Text>

        {/* CALL TIMER */}

        <Text style={styles.timer}>
          {formatTime(seconds)}
        </Text>

        {/* CONTROLS */}

        <View style={styles.controls}>

          {/* SPEAKER */}

          <Pressable style={styles.smallButton}>
            <Ionicons
              name="volume-medium"
              size={23}
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
              size={27}
              color={colors.white}
            />
          </Pressable>

          {/* MICROPHONE */}

          <Pressable style={styles.smallButton}>
            <Ionicons
              name="mic"
              size={23}
              color={colors.white}
            />
          </Pressable>

        </View>

        <Text style={styles.message}>
          You are connected to your ambulance driver
        </Text>

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
    backgroundColor: "rgba(0,0,0,0.45)",
  },

  /* DRIVER ICON */

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  /* NAME */

  name: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: "700",
    color: colors.white,
  },

  status: {
    marginTop: 7,
    fontSize: 14,
    fontWeight: "500",
    color: "#BFFFC8",
  },

  /* TIMER */

  timer: {
    marginTop: 65,
    fontSize: 22,
    fontWeight: "600",
    color: colors.white,
  },

  /* CONTROLS */

  controls: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 22,
  },

  smallButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor:
      "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  endCall: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#FF3035",
    alignItems: "center",
    justifyContent: "center",
    transform: [
      {
        rotate: "135deg",
      },
    ],
  },

  message: {
    marginTop: 35,
    paddingHorizontal: 30,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 19,
    color: "#FFFFFF",
  },

  swipe: {
    position: "absolute",
    bottom: 28,
    fontSize: 9,
    color: colors.white,
  },
});