import React,{useState} from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import ForgotPasswordFlow from "@/screens/forgot-password/forgotpasswordflow";

export default function SettingsScreen({ navigation }: any) {
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
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

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={colors.white}
          />
        </Pressable>

        <Text style={styles.title}>Settings</Text>

        <View style={styles.space} />
      </View>

      {/* SETTINGS LIST */}
      <View style={styles.list}>
        {settings.map((item) => (
          <Pressable
            key={item.title}
            style={styles.item}
            onPress={() =>{
            if (item.title === "Password Manager") {
              setForgotPasswordVisible(true);
            } else if (item.screen) {
              navigation.navigate(item.screen);
            }
          }
        }
          >
            <View style={styles.left}>
              <Ionicons
                name={item.icon as any}
                size={23}
                color={colors.primaryDark}
              />

              <Text style={styles.text}>
                {item.title}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={20}
              color="#999"
            />
          </Pressable>
        ))}
      </View>
      
        <ForgotPasswordFlow
          visible={forgotPasswordVisible}
          onClose={() => setForgotPasswordVisible(false)}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  /* HEADER */
  header: {
    height: 100,
    paddingHorizontal: 18,
    paddingTop: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 9,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  space: {
    width: 44,
  },

  /* LIST */
  list: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  item: {
    minHeight: 58,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },

  text: {
    fontSize: 16,
    fontWeight: "500",
    color: "#777",
  },
});