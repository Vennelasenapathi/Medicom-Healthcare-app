import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import BottomTabBar from "@/components/Bottombar/BottomBar";
import { colors } from "@/constants/colors";

const chats = [
  {
    id: 1,
    name: "Dr. Eshan Khan",
    message: "How are you feeling today?",
    time: "10:30 AM",
    image: require("../../../assets/images/medicom/topdoctor1.png"),
    unread: 2,
  },
  {
    id: 2,
    name: "Dr. Siri Sharma",
    message: "Please continue the medication.",
    time: "Yesterday",
    image: require("../../../assets/images/medicom/topdoctor2.png"),
    unread: 1,
  },
  {
    id: 3,
    name: "Dr. Jasmin",
    message: "Your report looks good.",
    time: "Monday",
    image: require("../../../assets/images/medicom/topdoctor5.png"),
    unread: 0,
  },
];

export default function ChatListScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>

        <Pressable style={styles.searchButton}>
          <Ionicons
            name="search-outline"
            size={24}
            color={colors.primaryDark}
          />
        </Pressable>
      </View>

      <Text style={styles.subtitle}>
        Chat with your doctors
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            onPress={() =>
              navigation.navigate("Chat", {
                doctor: chat,
              })
            }
          />
        ))}
      </ScrollView>

      <BottomTabBar
        navigation={navigation}
        activeTab="Chat"
      />
    </View>
  );
}

function ChatItem({ chat, onPress }: any) {
  return (
    <Pressable style={styles.chatItem} onPress={onPress}>
      <Image source={chat.image} style={styles.avatar} />

      <View style={styles.chatInfo}>
        <Text style={styles.name}>{chat.name}</Text>

        <Text style={styles.message} numberOfLines={1}>
          {chat.message}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.time}>{chat.time}</Text>

        {chat.unread > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {chat.unread}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },

  header: {
    height: 105,
    paddingTop: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 25,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  subtitle: {
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 18,
  },

  searchButton: {
    width: 45,
    height: 45,
    borderRadius: 10,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  list: {
    paddingBottom: 100,
    gap: 12,
  },

  chatItem: {
    minHeight: 88,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
  },

  avatar: {
    width: 62,
    height: 62,
    borderRadius: 31,
  },

  chatInfo: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  message: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 7,
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 58,
  },

  time: {
    fontSize: 11,
    color: colors.textSecondary,
  },

  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "700",
  },
});