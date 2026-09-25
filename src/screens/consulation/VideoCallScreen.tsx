import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

export default function VideoCallScreen({navigation, route,}: any) {
  const doctor = route?.params?.doctor;
  const [muted, setMuted] = useState(false);
  const [speaker, setSpeaker] = useState(true);
  const [cameraOff, setCameraOff] = useState(false);
  const [seconds, setSeconds] = useState(0);

  /* CALL TIMER */

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");

  const remainingSeconds = (seconds % 60)
    .toString()
    .padStart(2, "0");

  /* END CALL */

  const endCall = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={[globalStyles.container, styles.container]}>
      {/* DOCTOR VIDEO AREA */}

      <View style={styles.videoContainer}>
        {doctor?.image ? (
          <Image
            source={doctor.image}
            style={styles.doctorVideo}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.videoPlaceholder}>
            <Ionicons
              name="person"
              size={80}
              color="#AAB4C8"
            />
          </View>
        )}

        {/* DARK OVERLAY */}

        <View style={styles.overlay} />

        {/* TOP AREA */}

        <View style={styles.topBar}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={colors.white}
            />
          </Pressable>

          <View style={styles.callInfo}>
            <Text style={styles.doctorName}>
              {doctor?.name || "Dr. Eshan Khan"}
            </Text>

            <View style={globalStyles.row}>
              <View style={styles.liveDot} />

              <Text style={styles.callStatus}>
                Connected
              </Text>
            </View>
          </View>

          <View style={styles.timer}>
            <Text style={styles.timerText}>
              {minutes}:{remainingSeconds}
            </Text>
          </View>
        </View>

        {/* SELF CAMERA */}

        <View style={styles.selfCamera}>
          {cameraOff ? (
            <View style={styles.cameraOff}>
              <Ionicons
                name="videocam-off"
                size={24}
                color={colors.white}
              />
            </View>
          ) : (
            <View style={styles.selfCameraPlaceholder}>
              <Ionicons
                name="person"
                size={35}
                color="#AAB4C8"
              />
            </View>
          )}
        </View>

        {/* DOCTOR NAME */}

        <View style={styles.doctorLabel}>
          <Text style={styles.doctorLabelText}>
            {doctor?.name || "Dr. Eshan Khan"}
          </Text>

          <Text style={styles.specialty}>
            {doctor?.specialty ||
              "Brain & Spine Specialist"}
          </Text>
        </View>

        {/* CONTROLS */}

        <View style={[globalStyles.row, styles.controls]}>
          {/* MUTE */}

          <Pressable
            style={[
              styles.controlButton,
              muted && styles.activeControl,
            ]}
            onPress={() => setMuted(!muted)}
          >
            <Ionicons
              name={muted ? "mic-off" : "mic"}
              size={23}
              color={colors.white}
            />
          </Pressable>

          {/* CAMERA */}

          <Pressable
            style={[
              styles.controlButton,
              cameraOff && styles.activeControl,
            ]}
            onPress={() => setCameraOff(!cameraOff)}
          >
            <Ionicons
              name={
                cameraOff
                  ? "videocam-off"
                  : "videocam"
              }
              size={23}
              color={colors.white}
            />
          </Pressable>

          {/* SPEAKER */}

          <Pressable
            style={[
              styles.controlButton,
              speaker && styles.activeControl,
            ]}
            onPress={() => setSpeaker(!speaker)}
          >
            <Ionicons
              name={
                speaker
                  ? "volume-high"
                  : "volume-mute"
              }
              size={23}
              color={colors.white}
            />
          </Pressable>

          {/* END CALL */}

          <Pressable
            style={styles.endCallButton}
            onPress={endCall}
          >
            <Ionicons
              name="call"
              size={25}
              color={colors.white}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#101522",
  },

  /* VIDEO */

  videoContainer: {
    flex: 1,
    position: "relative",
    backgroundColor: "#182033",
  },

  doctorVideo: {
    width: "100%",
    height: "100%",
  },

  videoPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202A3D",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.20)",
  },

  /* TOP BAR */

  topBar: {
    position: "absolute",
    top: 45,
    left: 16,
    right: 16,
    ...globalStyles.row,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },

  callInfo: {
    flex: 1,
    marginLeft: 12,
  },

  doctorName: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.white,
  },

  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 5,
  },

  callStatus: {
    fontSize: 11,
    color: colors.white,
  },

  timer: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.40)",
  },

  timerText: {
    fontSize: 11,
    fontWeight: "600",
    color: colors.white,
  },

  /* SELF CAMERA */

  selfCamera: {
    position: "absolute",
    top: 105,
    right: 16,
    width: 95,
    height: 125,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: colors.white,
    backgroundColor: "#202A3D",
  },

  selfCameraPlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D9E0EA",
  },

  cameraOff: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#202A3D",
  },

  /* DOCTOR LABEL */

  doctorLabel: {
    position: "absolute",
    left: 18,
    bottom: 155,
  },

  doctorLabelText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },

  specialty: {
    marginTop: 4,
    fontSize: 11,
    color: "#E2E7F0",
  },

  /* CONTROLS */

  controls: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 35,
    justifyContent: "center",
    gap: 14,
  },

  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },

  activeControl: {
    backgroundColor: colors.primaryDark,
  },

  endCallButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
    transform: [
      {
        rotate: "135deg",
      },
    ],
  },
});