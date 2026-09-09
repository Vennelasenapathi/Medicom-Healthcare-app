import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import BottomTabBar from "@/components/Bottombar/BottomBar";

export default function ProfileScreen({ navigation, route }: any) {
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [profileName, setProfileName] = useState("Vennela");

  useEffect(() => {
    const updatedName =
      route?.params?.updatedProfile?.fullName;

    if (updatedName) {
      setProfileName(updatedName);
    }
  }, [route?.params?.updatedProfile?.fullName]);

  const menuItems = [
    {
      icon: "person-outline",
      title: "Profile",
    },
    {
      icon: "settings-outline",
      title: "Settings",
    },
    {
      icon: "log-out-outline",
      title: "Logout",
    },
  ];

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={20}
            color={colors.white}
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          My Profile
        </Text>

        <View style={styles.headerSpace} />
      </View>

      {/* PROFILE */}
      <View style={styles.profile}>
        <Image
          source={require(
            "../../../assets/images/medicom/Image.png"
          )}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {profileName}
        </Text>
      </View>

      {/* MENU */}
      <View style={styles.menu}>
        {menuItems.map((item) => (
          <Pressable
            key={item.title}
            style={styles.menuItem}
            onPress={() => {
              if (item.title === "Profile") {
                navigation.navigate("EditProfile");
              } else if (item.title === "Settings") {
                navigation.navigate("Settings");
              } else {
                setLogoutVisible(true);
              }
            }}
          >
            <View style={styles.menuLeft}>
              <Ionicons
                name={item.icon as any}
                size={16}
                color={colors.primaryDark}
              />

              <Text style={styles.menuText}>
                {item.title}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={16}
              color="#999"
            />
          </Pressable>
        ))}
      </View>

      {/* REUSABLE BOTTOM BAR */}
      <BottomTabBar
        navigation={navigation}
        activeTab="Profile"
      />

      {/* LOGOUT MODAL */}
      <Modal
        visible={logoutVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setLogoutVisible(false)
        }
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>

            <View style={styles.checkCircle}>
              <Ionicons
                name="checkmark"
                size={60}
                color={colors.primaryDark}
              />
            </View>

            <Text style={styles.modalTitle}>
              Are you sure to log out of{"\n"}
              your account?
            </Text>

            <Pressable
              style={styles.logoutButton}
              onPress={() => {
                setLogoutVisible(false);

                navigation.reset({
                  index: 0,
                  routes: [{ name: "Login" }],
                });
              }}
            >
              <Text style={styles.logoutText}>
                Log Out
              </Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={() =>
                setLogoutVisible(false)
              }
            >
              <Text style={styles.cancelText}>
                Back
              </Text>
            </Pressable>

          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 50,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 7,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  headerSpace: {
    width: 30,
  },

  profile: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 20,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#EAF0F2",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginTop: 10,
  },

  menu: {
    paddingHorizontal: 15,
    gap: 15,
  },

  menuItem: {
    height: 39,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  menuText: {
    fontSize: 16,
    color: "#888",
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    width: 327,
    height: 414,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
  },

  checkCircle: {
    width: 102,
    height: 102,
    marginTop: 30,
    borderRadius: 51,
    backgroundColor: "#F2F6FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  modalTitle: {
    textAlign: "center",
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "700",
    marginTop: 12,
    color: colors.textPrimary,
    marginBottom: 14,
  },

  logoutButton: {
    width: "100%",
    height: 48,
    borderRadius: 6,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
  },

  logoutText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },

  cancelButton: {
    width: "100%",
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },

  cancelText: {
    color: colors.primaryDark,
    fontSize: 16,
    fontWeight: "700",
  },
});