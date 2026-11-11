
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

type Props = {
  muted: boolean;
  speaker: boolean;
  cameraOff: boolean;
  onMute: () => void;
  onSpeaker: () => void;
  onCamera: () => void;
  onEnd: () => void;
};

export default function CallControls({
  muted,
  speaker,
  cameraOff,
  onMute,
  onSpeaker,
  onCamera,
  onEnd,
}: Props) {
  const controls = [
    { icon: muted ? "mic-off" : "mic", active: muted, onPress: onMute },
    {
      icon: cameraOff ? "videocam-off" : "videocam",
      active: cameraOff,
      onPress: onCamera,
    },
    {
      icon: speaker ? "volume-high" : "volume-mute",
      active: speaker,
      onPress: onSpeaker,
    },
  ] as const;

  return (
    <View style={styles.row}>
      {controls.map((item, index) => (
        <Pressable
          key={index}
          style={[styles.button, item.active && styles.active]}
          onPress={item.onPress}
        >
          <Ionicons name={item.icon} size={23} color={colors.white} />
        </Pressable>
      ))}

      <Pressable style={styles.end} onPress={onEnd}>
        <Ionicons
          name="call"
          size={25}
          color={colors.white}
          style={{ transform: [{ rotate: "135deg" }] }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    position: "absolute",
    bottom: 35,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 14,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  active: { backgroundColor: colors.primaryDark },
  end: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#EF4444",
    alignItems: "center",
    justifyContent: "center",
  },
});
