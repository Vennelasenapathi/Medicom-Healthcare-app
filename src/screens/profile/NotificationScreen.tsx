import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

export default function NotificationSettingsScreen({ navigation,}: any) {
  const [general, setGeneral] = useState(true);
  const [sound, setSound] = useState(false);
  const [callSound, setCallSound] = useState(true);
  const [vibrate, setVibrate] = useState(true);

  const rows = [
    {
      title: "General Notification",
      value: general,
      setValue: setGeneral,
    },
    {
      title: "Sound",
      value: sound,
      setValue: setSound,
    },
    {
      title: "Call Sound",
      value: callSound,
      setValue: setCallSound,
    },
    {
      title: "Vibrate",
      value: vibrate,
      setValue: setVibrate,
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={20} color="#fff" />
        </Pressable>

        <Text style={styles.title}>
          Notification Setting
        </Text>

        <View style={styles.space} />
      </View>

      <View style={styles.list}>
        {rows.map((item) => (
          <View style={styles.row} key={item.title}>
            <Text style={styles.text}>{item.title}</Text>

            <Switch
              value={item.value}
              onValueChange={item.setValue}
              trackColor={{
                false: "#DCE8FF",
                true: colors.primaryDark,
              }}
              thumbColor="#fff"
              ios_backgroundColor="#DCE8FF"
              style={styles.switch}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    height: 70,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 30,
    height: 30,
    borderRadius: 7,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  space: {
    width: 30,
  },

  list: {
    paddingHorizontal: 15,
  },

  row: {
    height: 38,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 8,
    color: "#999",
  },

  switch: {
    transform: [{ scaleX: 0.65 }, { scaleY: 0.65 }],
  },
});