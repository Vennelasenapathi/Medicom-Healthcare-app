import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForNotifications() {
  try {
    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let status = existingStatus;

    if (existingStatus !== "granted") {
      const { status: newStatus } =
        await Notifications.requestPermissionsAsync();

      status = newStatus;
    }

    if (status !== "granted") {
      console.log("❌ Notification permission denied");
      return null;
    }

    const token = await Notifications.getExpoPushTokenAsync({
      projectId: "59027b8f-2187-4d14-bf48-eeeae404d58a",
    });

    console.log("✅ EXPO PUSH TOKEN:", token.data);

    return token.data;
  } catch (error) {
    console.log("❌ Push registration error:", error);
    return null;
  }
}