import {
  Image,
  Pressable,
  Text,
  View,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

export default function Onboarding() {
  const router = useRouter();

  return (
    <View className="flex-1 pt-[100px] bg-white">

      {/* Skip Button */}
      <View className="absolute  justify-center items-center right-7  h-[26px] top-20 z-10">
        <Pressable
          onPress={() => router.replace("/onboarding/auth")}
          className="rounded-md bg-[#E8EEFF] items-center px-3 py-1.5 w-[60px] h-[26px]"
        >
          <Text className="text-[12px] font-medium text-[#0909DF]">
            Skip
          </Text>
        </Pressable>
      </View>

      {/* Background Shapes */}
      <View className="absolute left-[-50] top-[-40] h-56 w-56 rounded-full bg-[#F5F8FF]" />

      <View className="absolute right-[-80] top-20 h-48 w-48 rounded-full bg-[#F7F9FF]" />

      {/* Doctor Image */}
      <View
        className="pt-[50px] items-center justify-end"
        style={{
          height: height * 0.63,
        }}
      >
        <Image
          source={require("../../../assets/images/medicom/doctor1.png")}
          resizeMode="contain"
          className="h-full w-full"
        />
      </View>

      {/* Bottom Card */}
      <View className="flex-1 px-3">
        <View className="flex-1 rounded-t-[16px] bg-[#E8F0FF] px-4 pt-[55px] ">

          {/* Description */}
          <Text className="max-w-[270px] text-[24px] font-lufga font-bold leading-10 text-[#011133]">
            Verified and experienced{"\n"}
            medical professionals
          </Text>

          {/* Bottom Controls */}
          <View className="mt-[50px] mb-5 flex-row items-center justify-between">

            {/* Pagination */}
            <View className="flex-row items-center">
              <View className="h-[4px] w-[20px] bg-[#2D6BFF]" />

              <View className="ml-1 h-[4px] w-[12px] bg-[#A9C4FF]" />

              <View className="ml-1 h-[4px] w-[12px] bg-[#A9C4FF]" />
            </View>

            {/* Next Button */}
            <Pressable
              onPress={() => router.push("/onboarding/second")}
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