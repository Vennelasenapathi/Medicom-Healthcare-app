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

      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Messages</Text>
          <Text style={styles.subtitle}>
            Chat with your doctors
          </Text>
        </View>

        <Pressable style={styles.searchButton}>
          <Ionicons
            name="search-outline"
            size={25}
            color={colors.primaryDark}
          />
        </Pressable>
      </View>

      {/* SEARCH */}
      <Pressable style={styles.searchBox}>
        <Ionicons
          name="search-outline"
          size={18}
          color="#A5AAB3"
        />

        <Text style={styles.searchText}>
          Search...
        </Text>
      </Pressable>

      {/* FILTER */}
      <View style={styles.filters}>
        <Pressable style={styles.activeFilter}>
          <Text style={styles.activeFilterText}>
            All
          </Text>
        </Pressable>

        <Pressable style={styles.filter}>
          <Text style={styles.filterText}>
            Group
          </Text>
        </Pressable>

        <Pressable style={styles.filter}>
          <Text style={styles.filterText}>
            Private
          </Text>
        </Pressable>
      </View>

      {/* CHAT LIST */}
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
    <Pressable
      style={styles.chatItem}
      onPress={onPress}
    >
      {/* DOCTOR IMAGE */}
      <Image
        source={chat.image}
        style={styles.avatar}
      />

      {/* MESSAGE */}
      <View style={styles.chatInfo}>
        <Text style={styles.name}>
          {chat.name}
        </Text>

        <Text
          style={styles.message}
          numberOfLines={1}
        >
          {chat.message}
        </Text>
      </View>

      {/* TIME + UNREAD */}
      <View style={styles.right}>
        <Text style={styles.time}>
          {chat.time}
        </Text>

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
    paddingHorizontal: 18,
  },

  /* HEADER */
  header: {
    paddingTop: 52,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  subtitle: {
    marginTop: 5,
    fontSize: 14,
    color: colors.textSecondary,
  },

  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  /* SEARCH */
  searchBox: {
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  searchText: {
    marginLeft: 9,
    fontSize: 13,
    color: "#A5AAB3",
  },

  /* FILTERS */
  filters: {
    height: 48,
    marginTop: 14,
    padding: 4,
    borderRadius: 12,
    backgroundColor: "#F3F5F8",
    flexDirection: "row",
  },

  filter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
  },

  activeFilter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: colors.white,
  },

  activeFilterText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  filterText: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  /* LIST */
  list: {
    paddingTop: 18,
    paddingBottom: 110,
  },

  /* CHAT ITEM */
  chatItem: {
    minHeight: 96,
    marginBottom: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 68,
    height: 68,
    borderRadius: 34,
  },

  chatInfo: {
    flex: 1,
    marginLeft: 15,
    paddingRight: 8,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  message: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },

  right: {
    height: 67,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  time: {
    fontSize: 11,
    color: colors.textSecondary,
  },

  badge: {
    minWidth: 25,
    height: 25,
    paddingHorizontal: 6,
    borderRadius: 13,
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