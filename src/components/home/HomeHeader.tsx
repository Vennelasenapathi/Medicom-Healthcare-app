import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

type Props = {
  onSearch: () => void;
};

export default function HomeHeader({ onSearch }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.topRow}>
        <View style={styles.profileRow}>
          <Image
            source={require("../../../assets/images/medicom/Image.png")}
            style={styles.avatar}
          />

          <View>
            <Text style={styles.welcome}>Hello, Welcome!</Text>
            <Text style={styles.username}>Emily Humphrey</Text>
          </View>
        </View>

        <Pressable style={styles.notification}>
          <Ionicons
            name="notifications-outline"
            size={22}
            color={colors.white}
            backgroundColor={colors.notification}
          />
        </Pressable>
      </View>

      <Pressable
        style={styles.searchBox}
        onPress={onSearch}
      >
        <TextInput
          editable={false}
          placeholder="Search doctor, drugs..."
          placeholderTextColor="#999"
          style={styles.searchInput}
        />

        <Ionicons
          name="search-outline"
          size={21}
          color={colors.primaryDark}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 18,
    width: "100%",
    height: 220,
  },

  topRow: {
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 10,
  },

  welcome: {
    fontSize: 13,
    color: colors.white,
    marginBottom: 3,
  },

  username: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.white,
  },

  notification: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.notification,
    alignItems: "center",
    justifyContent: "center",
  },

  searchBox: {
    height: 53,
    marginTop: 30,
    paddingHorizontal: 14,
    borderRadius: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },
});