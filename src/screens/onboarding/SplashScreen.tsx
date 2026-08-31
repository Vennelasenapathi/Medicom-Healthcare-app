import { colors } from "@/constants/colors";
import { useEffect } from "react";
import { View, Text, Image } from "react-native";

export default function SplashScreen({navigation}:any) {

   useEffect(() => {
    const timer = setTimeout(() => {
     navigation.navigate("onboarding")
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 " style={{backgroundColor:colors.primaryDark}}>
      {/* Logo */}
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("../../../assets/images/medicom/Logo.png")}
          className="h-30 w-30"
          resizeMode="contain"
        />
      </View>

      {/* Bottom indicator */}
      <View className="items-center pb-5">
        <View className="h-1 w-24 rounded-full bg-white" />
      </View>

    </View>
  );
}