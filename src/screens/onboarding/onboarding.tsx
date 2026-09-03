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

import { colors } from "@/constants/colors";

const { height } = Dimensions.get("window");

const onboardingData = [
  {
    image: require("../../../assets/images/medicom/doctor1.png"),
    title: "Verified and experienced\nmedical professionals",
  },
  {
    image: require("../../../assets/images/medicom/doctor2.png"),
    title: "Find specialist doctors in\none place",
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

  const handleSkip = () => {
    navigation.replace("auth");
  };

  return (
    <View style={styles.container}>

      {/* SKIP */}
      <Pressable
        onPress={handleSkip}
        style={styles.skipButton}
      >
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      {/* BACKGROUND CIRCLES */}
      <View style={styles.circleOne} />

      <View style={styles.circleTwo} />

      {/* DOCTOR IMAGE */}
      <View
        style={[
          styles.imageContainer,
          { height: height * 0.63 },
        ]}
      >
        <Image
          source={currentScreen.image}
          resizeMode="contain"
          style={styles.doctorImage}
        />
      </View>

      {/* BOTTOM CARD */}
      <View style={styles.bottomContainer}>
        <View style={styles.bottomCard}>

          {/* TITLE */}
          <Text style={styles.title}>
            {currentScreen.title}
          </Text>

          {/* CONTROLS */}
          <View style={styles.controls}>

            {/* PAGINATION */}
            <View style={styles.pagination}>
              {onboardingData.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    currentIndex === index
                      ? styles.activeDot
                      : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>

            {/* NEXT BUTTON */}
            <Pressable
              onPress={handleNext}
              style={styles.nextButton}
            >
              <Ionicons
                name="arrow-forward"
                size={22}
                color={colors.white}
              />
            </Pressable>

          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 100,
  },

  /* SKIP */
  skipButton: {
    position: "absolute",
    right: 25,
    top: 55,
    zIndex: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  skipText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.primaryDark,
  },

  /* BACKGROUND CIRCLES */
  circleOne: {
    position: "absolute",
    left: -50,
    top: -40,
    width: 224,
    height: 224,
    borderRadius: 112,
    backgroundColor: colors.veryLightBlue,
  },

  circleTwo: {
    position: "absolute",
    right: -80,
    top: 80,
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: colors.paleBlue,
  },

  /* DOCTOR IMAGE */
  imageContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: 10,
  },

  doctorImage: {
    width: "100%",
    height: "100%",
  },

  /* BOTTOM */
  bottomContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },

  bottomCard: {
    flex: 1,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 45,
    backgroundColor: colors.lightBlue,
  },

  /* TITLE */
  title: {
    maxWidth: 270,
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 40,
    color: colors.textPrimary,
  },

  /* CONTROLS */
  controls: {
    marginTop: 0,
    marginBottom: 32,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  /* PAGINATION */
  pagination: {
    flexDirection: "row",
    alignItems: "center",
  },

  paginationDot: {
    height: 4,
    marginRight: 4,
  },

  activeDot: {
    width: 20,
    backgroundColor: "#2D6BFF",
  },

  inactiveDot: {
    width: 12,
    backgroundColor: "#A9C4FF",
  },

  /* NEXT BUTTON */
  nextButton: {
    width: 51,
    height: 51,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: colors.primaryDark,
  },
});