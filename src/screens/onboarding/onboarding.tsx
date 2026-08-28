import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const onboardingData = [
  {
    image: require("../../../assets/images/medicom/doctor1.png"),
    title: "Find the right doctor\nfor your care",
  },
  {
    image: require("../../../assets/images/medicom/doctor2.png"),
    title: "Book appointments\neasily and quickly",
  },
  {
    image: require("../../../assets/images/medicom/doctor3.png"),
    title: "Video or chat, anytime\nyou need care",
  },
];

export default function Onboarding({ navigation }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentScreen = onboardingData[currentIndex];

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace("auth");
    }
  };

  return (
    <View style={styles.container}>

      {/* ================= BACKGROUND SHAPES ================= */}

      <View style={styles.leftCircle} />

      <View style={styles.rightCircle} />

      {/* ================= DOCTOR IMAGE ================= */}

      <View style={styles.doctorContainer}>
        <Image
          source={currentScreen.image}
          resizeMode="contain"
          style={styles.doctorImage}
        />
      </View>

      {/* ================= BOTTOM CARD ================= */}

      <View style={styles.cardWrapper}>

        <View style={styles.card}>

          {/* ================= DESCRIPTION ================= */}

          <Text style={styles.title}>
            {currentScreen.title}
          </Text>

          {/* ================= BOTTOM CONTROLS ================= */}

          <View style={styles.controls}>

            {/* ================= PAGINATION ================= */}

            <View style={styles.pagination}>

              {/* First */}
              <View
                style={[
                  styles.dot,
                  currentIndex === 0
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />

              {/* Second */}
              <View
                style={[
                  styles.dot,
                  currentIndex === 1
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />

              {/* Third */}
              <View
                style={[
                  styles.dot,
                  currentIndex === 2
                    ? styles.activeDot
                    : styles.inactiveDot,
                ]}
              />

            </View>

            {/* ================= NEXT BUTTON ================= */}

            <Pressable
              onPress={handleNext}
              style={styles.nextButton}
            >
              <Ionicons
                name="arrow-forward"
                size={22}
                color="#FFFFFF"
              />
            </Pressable>

          </View>

        </View>

      </View>

    </View>
  );
}

/* ============================================================
   STYLES
============================================================ */

const styles = StyleSheet.create({

  /* ================= MAIN CONTAINER ================= */

  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#FFFFFF",
  },

  /* ================= BACKGROUND CIRCLES ================= */

  leftCircle: {
    position: "absolute",
    left: -50,
    top: -40,
    height: 224,
    width: 224,
    borderRadius: 112,
    backgroundColor: "#F5F8FF",
  },

  rightCircle: {
    position: "absolute",
    right: -80,
    top: 80,
    height: 192,
    width: 192,
    borderRadius: 96,
    backgroundColor: "#F7F9FF",
  },

  /* ================= DOCTOR ================= */

  doctorContainer: {
    paddingTop: 50,
    alignItems: "center",
    justifyContent: "flex-end",
    height: height * 0.63,
  },

  doctorImage: {
    height: "100%",
    width: "100%",
  },

  /* ================= CARD WRAPPER ================= */

  cardWrapper: {
    flex: 1,
    paddingHorizontal: 20,
  },

  /* ================= CARD ================= */

  card: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#E8F0FF",
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  /* ================= TITLE ================= */

  title: {
    maxWidth: 270,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 40,
    color: "#011133",
  },

  /* ================= CONTROLS ================= */

  controls: {
    marginTop: 50,
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  /* ================= PAGINATION ================= */

  pagination: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    height: 4,
    marginRight: 4,
  },

  inactiveDot: {
    width: 12,
    backgroundColor: "#A9C4FF",
  },

  activeDot: {
    width: 20,
    backgroundColor: "#2D6BFF",
  },

  /* ================= NEXT BUTTON ================= */

  nextButton: {
    height: 51,
    width: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#2867FF",
  },

});