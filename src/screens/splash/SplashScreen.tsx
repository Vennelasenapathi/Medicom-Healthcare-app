import { colors } from "@/constants/colors";
import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
} from "react-native";

export default function SplashScreen({ navigation }: any) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("onboarding");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../../assets/images/medicom/Logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Bottom indicator */}
      <View style={styles.indicatorContainer}>
        <View style={styles.indicator} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryDark,
  },

  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 120,
    height: 120,
  },

  indicatorContainer: {
    alignItems: "center",
    paddingBottom: 20,
  },

  indicator: {
    width: 96,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.white,
  },
});