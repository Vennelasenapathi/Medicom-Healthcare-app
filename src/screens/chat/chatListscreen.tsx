import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomTabBar from "@/components/Bottombar/BottomBar";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { useChats } from "@/context/ChatContext";

export default function ChatListScreen({ navigation }: any) {
  const { chats, openChat } = useChats();
  return (
    <View style={[globalStyles.container, styles.screen]}>
       <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {/* HEADER */}
      <View style={[globalStyles.spaceBetween, styles.header]}>
        <View>
          <Text style={styles.title}>My Messages</Text>
          <Text style={globalStyles.subtitle}>Chat with your doctors</Text>
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
          color={colors.textSecondary}
        />
        <Text style={styles.searchText}>Search...</Text>
      </Pressable>

      {/* FILTERS */}
      

      {/* CHAT LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            onPress={() =>{
              openChat(chat.id);
              navigation.navigate("Chat", {
                doctor: chat,
              })
            }}
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
      style={[globalStyles.row, styles.chatItem]}
      onPress={onPress}
    >
      <Image
        source={chat.image}
        style={styles.avatar}
      />
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
  screen: {
    paddingHorizontal: 18,
  },

  header: {
    paddingTop: 52,
    paddingBottom: 18,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  searchButton: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  searchBox: {
    height: 48,
    paddingHorizontal: 15,
    borderRadius: 12,
    backgroundColor: colors.background,
    ...globalStyles.row,
  },

  searchText: {
    marginLeft: 9,
    fontSize: 13,
    color: colors.textSecondary,
  },

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
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },

  activeFilter: {
    backgroundColor: colors.white,
  },

  filterText: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  activeFilterText: {
    fontWeight: "700",
    color: colors.primaryDark,
  },

  list: {
    paddingTop: 18,
    paddingBottom: 110,
  },

  chatItem: {
    minHeight: 96,
    marginBottom: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
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
    fontSize: 11,
    fontWeight: "700",
    color: colors.white,
  },
});