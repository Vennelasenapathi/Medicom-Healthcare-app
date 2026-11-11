import React, { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import BottomTabBar from "@/components/Bottombar/BottomBar";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen({ navigation, route }: any) {

  const [logoutVisible, setLogoutVisible] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const loadProfile = async () => {
        try {
          const savedUser = await AsyncStorage.getItem("user");

          if (savedUser && isActive) {
            const user = JSON.parse(savedUser);
            setProfileName(user.name ?? user.fullName ?? "");
            setProfileImage(user.profileImage ?? null);
          }
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      };

      loadProfile();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const menuItems = [
    { icon: "person-outline", title: "Profile" },
    { icon: "settings-outline", title: "Settings" },
    { icon: "log-out-outline", title: "Logout" },
  ];

  const handleMenu = (title: string) => {
    if (title === "Profile") navigation.navigate("EditProfile");
    else if (title === "Settings") navigation.navigate("Settings");
    else setLogoutVisible(true);
  };

  const handleLogout = () => {
    setLogoutVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={[globalStyles.header, styles.header]}>
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

        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.headerSpace} />
      </View>

      <View style={styles.profile}>

        <Image
          source={
            profileImage
              ? { uri: profileImage }
              : require("../../../assets/images/medicom/Image.png")
          }
          style={styles.avatar}
        />

        <Text style={styles.name}>{profileName}</Text>
      </View>

      <View style={styles.menu}>
        {menuItems.map((item) => (
          <Pressable
            key={item.title}
            style={[globalStyles.spaceBetween, styles.menuItem]}
            onPress={() => handleMenu(item.title)}
          >
            <View style={globalStyles.row}>
              <Ionicons
                name={item.icon as any}
                size={16}
                color={colors.primaryDark}
              />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={16}
              color="#999"
            />
          </Pressable>
        ))}
      </View>

      <BottomTabBar
        navigation={navigation}
        activeTab="Profile"
      />

      <Modal
        visible={logoutVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutVisible(false)}
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
              Are you sure to log out of{"\n"}your account?
            </Text>

            <Pressable
              style={globalStyles.button}
              onPress={handleLogout}
            >
              <Text style={globalStyles.buttonText}>Log Out</Text>
            </Pressable>

            <Pressable
              style={styles.cancelButton}
              onPress={() => setLogoutVisible(false)}
            >
              <Text style={styles.cancelText}>Back</Text>
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
    height: 95,
    paddingHorizontal: 18,
    paddingTop: 30,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 9,
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
    width: 42,
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
    marginTop: 10,
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  menu: {
    paddingHorizontal: 30,
    gap: 15,
  },

  menuItem: {
    height: 39,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  menuText: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "500",
    color: "#777",
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
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: colors.white,
  },

  checkCircle: {
    width: 102,
    height: 102,
    marginTop: 30,
    marginBottom: 12,
    borderRadius: 51,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F6FF",
  },

  modalTitle: {
    marginTop: 12,
    marginBottom: 14,
    fontSize: 21,
    lineHeight: 26,
    fontWeight: "700",
    textAlign: "center",
    color: colors.textPrimary,
  },

  cancelButton: {
    width: "100%",
    height: 48,
    marginTop: 10,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  cancelText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.primaryDark,
  },
});