import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router=useRouter();

   useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding/onboarding");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View className="flex-1 bg-[#285BCD]">
      {/* Logo */}
      <View className="flex-1 items-center justify-center">
        <Image
          source={require("../../assets/images/medicom/Logo.png")}
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