import React, { useEffect, useRef } from "react";
import {
  Animated,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";

type TabName =
  | "Home"
  | "Appointments"
  | "Chat"
  | "Profile";

interface Props {
  navigation: any;
  activeTab?: TabName;
}

export default function BottomTabBar({
  navigation,
  activeTab = "Home",
}: Props) {
  return (
    <View style={styles.bar}>

      <Tab
        icon="home-outline"
        activeIcon="home"
        active={activeTab === "Home"}
        onPress={() => navigation.navigate("Home")}
      />

      <Tab
        icon="calendar-outline"
        activeIcon="calendar"
        active={activeTab === "Appointments"}
        onPress={() =>
          navigation.navigate("Appointments")
        }
      />

      <Tab
        icon="chatbubble-ellipses-outline"
        activeIcon="chatbubble-ellipses"
        active={activeTab === "Chat"}
        onPress={() =>
          navigation.navigate("ChatList")
        }
      />

      <Tab
        icon="person-outline"
        activeIcon="person"
        active={activeTab === "Profile"}
        onPress={() =>
          navigation.navigate("Profile")
        }
      />

    </View>
  );
}

/* ================= TAB ================= */

interface TabProps {
  icon: any;
  activeIcon: any;
  active: boolean;
  onPress: () => void;
}

function Tab({
  icon,
  activeIcon,
  active,
  onPress,
}: TabProps) {

  const scale = useRef(
    new Animated.Value(active ? 1.1 : 1)
  ).current;

  const translateY = useRef(
    new Animated.Value(active ? -2 : 0)
  ).current;

  const opacity = useRef(
    new Animated.Value(active ? 1 : 0)
  ).current;

  const dotScale = useRef(
    new Animated.Value(active ? 1 : 0)
  ).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: active ? 1.12 : 1,
        friction: 6,
        tension: 120,
        useNativeDriver: true,
      }),

      Animated.spring(translateY, {
        toValue: active ? -2 : 0,
        friction: 7,
        tension: 100,
        useNativeDriver: true,
      }),

      Animated.timing(opacity, {
        toValue: active ? 1 : 0,
        duration: 180,
        useNativeDriver: true,
      }),

      Animated.spring(dotScale, {
        toValue: active ? 1 : 0,
        friction: 6,
        tension: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, [active]);

  return (
    <Pressable
      onPress={onPress}
      style={styles.tab}
    >

      {/* ICON */}

      <Animated.View
        style={{
          transform: [
            { scale },
            { translateY },
          ],
        }}
      >
        <Ionicons
          name={active ? activeIcon : icon}
          size={26}
          color={
            active
              ? colors.primaryDark
              : colors.textSecondary
          }
        />
      </Animated.View>

      {/* ACTIVE DOT */}

      <Animated.View
        style={[
          styles.dot,
          {
            opacity,
            transform: [
              { scaleX: dotScale },
            ],
          },
        ]}
      />

    </Pressable>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({

  bar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,

    height: 65,

    backgroundColor: colors.white,

    borderTopWidth: 1,
    borderTopColor: colors.borderLight,

    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  tab: {
    width: 60,
    height: 55,

    alignItems: "center",
    justifyContent: "center",
  },

  dot: {
    width: 5,
    height: 5,

    borderRadius: 3,

    marginTop: 4,

    backgroundColor: colors.primaryDark,
  },

});