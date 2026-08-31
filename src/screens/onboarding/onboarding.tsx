import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
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
    <View className="flex-1 bg-white pt-[100px]">

      {/* SKIP */}
      <Pressable
        onPress={handleSkip}
        className="absolute right-[25px] top-[55px] z-10 px-[10px] py-[8px]"
      >
        <Text className="text-[14px] font-medium " style={{color:colors.primaryDark}}>
          Skip
        </Text>
      </Pressable>

      {/* BACKGROUND CIRCLES */}

      <View className="absolute -left-[50px] -top-[40px] h-[224px] w-[224px] rounded-full" style={{backgroundColor:colors.veryLightBlue}} />

      <View className="absolute -right-[80px] top-[80px] h-[192px] w-[192px] rounded-full " style={{backgroundColor:colors.paleBlue}} />

      {/* DOCTOR IMAGE */}

      <View
        className="items-center justify-end pt-[50px]"
        style={{ height: height * 0.63 }}
      >
        <Image
          source={currentScreen.image}
          resizeMode="contain"
          className="h-full w-full"
        />
      </View>

      {/* BOTTOM CARD */}

      <View className="flex-1 px-[20px]">
        <View className="flex-1 rounded-t-[16px]  px-[20px] pt-[55px]" style={{backgroundColor:colors.lightBlue}}>

          {/* TITLE */}

          <Text className="max-w-[270px] text-[24px] font-bold leading-[40px] " style={{color:colors.textPrimary}}>
            {currentScreen.title}
          </Text>

          {/* CONTROLS */}

          <View className="mt-[50px] mb-[32px] flex-row items-center justify-between">

            {/* PAGINATION */}

            <View className="flex-row items-center">
              {onboardingData.map((_, index) => (
                <View
                  key={index}
                  className={`mr-[4px] h-[4px] ${
                    currentIndex === index
                      ? "w-[20px] bg-[#2D6BFF]"
                      : "w-[12px] bg-[#A9C4FF]"
                  }`}
                />
              ))}
            </View>

            {/* NEXT BUTTON */}

            <Pressable
              onPress={handleNext}
              className="h-[51px] w-[51px] items-center justify-center rounded-[12px] " style={{backgroundColor:colors.primaryDark}}
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