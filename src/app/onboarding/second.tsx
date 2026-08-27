import {
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function SecondOnboarding() {
  const router = useRouter();

  return (
    <View className="flex-1 pt-[100px] bg-white">

      

      {/* Background Decoration */}
      <View className="absolute left-[-50] top-[-40] h-56 w-56 rounded-full bg-[#F5F8FF]" />

      <View className="absolute right-[-80] top-20 h-48 w-48 rounded-full bg-[#F7F9FF]" />

      {/* Male Doctor */}
      <View
        className="pt-[50px] items-center justify-end"
        style={{
          height: height * 0.63,
        }}
      >
        <Image
          source={require("../../../assets/images/medicom/doctor2.png")}
          resizeMode="contain"
          className="h-full w-full"
        />
      </View>

      {/* Bottom Information Card */}
      <View className="flex-1 px-3 ">
        <View className="flex-1 rounded-t-[16px] bg-[#E8F0FF] px-4 pt-[55px]">

          {/* Text */}
          <Text className="max-w-[270px] text-[24px] font-bold leading-10 text-[#011133]">
            Find specialist doctors in{"\n"}
            one place
          </Text>

          {/* Controls */}
          <View className="mb-8 mt-[50px] flex-row items-center justify-between">

            {/* Pagination */}
            <View className="flex-row items-center">

              {/* First */}
              <View className="h-[4px] w-[12px] bg-[#A9C4FF]" />

              {/* Second - Active */}
              <View className="ml-1 h-[4px] w-[20px] bg-[#2D6BFF]" />

              {/* Third */}
              <View className="ml-1 h-[4px] w-[12px] bg-[#A9C4FF]" />

            </View>

            {/* Next */}
            <Pressable
              onPress={() => router.push("/onboarding/third")}
              className="h-[51px] w-[51px] items-center justify-center rounded-xl bg-[#2867FF]"
            >
               <Text className="text-xl text-white">
                
               <Ionicons
  name="arrow-forward"
  size={22}
  color="#FFFFFF"
/>
</Text>
            </Pressable>

          </View>
        </View>
      </View>

    </View>
  );
}