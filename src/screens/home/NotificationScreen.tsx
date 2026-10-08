import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ScreenHeader from "@/components/common/ScreenHeader";
import BackButton from "@/components/home/BackButton";
import { colors } from "@/constants/colors";

type Notification = {
  id: string;
  title: string;
  message: string;
  icon: keyof typeof Ionicons.glyphMap;
};

type Props = {
  onClose: () => void;
};

const notifications: Notification[] = [
  {
    id: "1",
    title: "Appointment Reminder",
    message:
      "You have an appointment with Dr. Priya tomorrow at 10:00 AM.",
    icon: "calendar-outline",
  },
  {
    id: "2",
    title: "Medicine Reminder",
    message: "It's time to take your prescribed medicine.",
    icon: "medkit-outline",
  },
  {
    id: "3",
    title: "Health Update",
    message: "Your latest health information is available.",
    icon: "heart-outline",
  },
];

export default function NotificationScreen({ onClose }: Props) {
    const [showNotifications, setShowNotifications] = useState(false);
  return (
    <View style={styles.container}>
         <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      <BackButton onPress={onClose} />

      <ScreenHeader
        title="Notifications"
        subtitle="Stay updated with your health"
      />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <View style={styles.icon}>
              <Ionicons
                name={item.icon}
                size={22}
                color={colors.primaryDark}
              />
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>{item.title}</Text>

              <Text style={styles.message}>{item.message}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  list: {
    paddingTop: 25,
    paddingBottom: 30,
  },

  notification: {
    flexDirection: "row",
    padding: 15,
    marginBottom: 12,
    borderRadius: 12,
    backgroundColor: "#F7F9FC",
  },

  icon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EAF0FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },

  message: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },
});