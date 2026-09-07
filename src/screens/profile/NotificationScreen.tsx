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

export default function NotificationSettingsScreen({
  navigation,
}: any) {
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
      {/* Header */}
      <View style={styles.header}>
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

        <Text style={styles.title}>
          Notification Setting
        </Text>

        <View style={styles.space} />
      </View>

      {/* Settings */}
      <View style={styles.list}>
        {rows.map((item) => (
          <View style={styles.row} key={item.title}>
            <Text style={styles.text}>
              {item.title}
            </Text>

            <Switch
              value={item.value}
              onValueChange={item.setValue}
              trackColor={{
                false: "#DCE8FF",
                true: colors.primaryDark,
              }}
              thumbColor={colors.white}
              ios_backgroundColor="#DCE8FF"
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
    backgroundColor: colors.white,
  },

  header: {
    height: 95,
    paddingHorizontal: 18,
    paddingTop: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 9,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  space: {
    width: 42,
  },

  list: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  row: {
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },

  text: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },
});