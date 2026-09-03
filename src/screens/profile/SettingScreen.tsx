import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

export default function SettingsScreen({ navigation }: any) {
  const settings = [
    {
      title: "Notification Setting",
      icon: "notifications-outline",
      screen: "NotificationSettings",
    },
    {
      title: "Password Manager",
      icon: "key-outline",
    },
    {
      title: "Delete Account",
      icon: "person-remove-outline",
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

        <Text style={styles.title}>Settings</Text>

        <View style={styles.space} />
      </View>

      <View style={styles.list}>
        {settings.map((item) => (
          <Pressable
            key={item.title}
            style={styles.item}
            onPress={() =>
              item.screen &&
              navigation.navigate(item.screen)
            }
          >
            <View style={styles.left}>
              <Ionicons
                name={item.icon as any}
                size={15}
                color={colors.primaryDark}
              />

              <Text style={styles.text}>
                {item.title}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={14}
              color="#999"
            />
          </Pressable>
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
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  space: {
    width: 30,
  },

  list: {
    paddingHorizontal: 15,
  },

  item: {
    height: 38,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  text: {
    fontSize: 8,
    color: "#999",
  },
});