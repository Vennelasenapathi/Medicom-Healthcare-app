import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Auth({navigation}:any) {

  return (
    <View className="flex-1 pt-[50px] bg-white">

      {/* Logo */}
      <View className="flex-1 items-center pt-[130px] px-6">

        <Image
          source={require("../../../assets/images/medicom/Logo2.png")}
          resizeMode="contain"
          className="pt-[136px] pl-[138px] h-103 w-103"
        />

        {/* Heading */}
        <Text className="pt-[30px] text-center text-[28px] font-bold text-[#071B44]">
          Let's get started!
        </Text>

        {/* Description */}
        <Text className="mt-4 max-w-[280px] text-center text-[14px] leading-5 text-[#717784]">
          Sign in to manage appointments{"\n"}
          and consult doctors anytime
        </Text>

      </View>

      {/* Buttons */}
      <View className="px-[61px] pb-[300px]">

        {/* Login */}
        <Pressable
          onPress={() => navigation.navigate("Login")}
          className="flex-row h-14 w-full items-center justify-center rounded-xl bg-[#2867FF]"
        >
          <Text className="text-base font-semibold text-white">
            Log In
          </Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color="#FFFFFF"
            style={{
              marginLeft: 3,
            }}
          />
        </Pressable>

        {/* Sign Up */}
        <Pressable
          onPress={() => navigation.navigate("Signup")}
          className="mt-4 h-14 w-full flex-row items-center justify-center rounded-xl border border-[#2867FF] bg-white"
        >
          <Text className="text-base font-semibold text-[#2867FF]">
            Sign Up
          </Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color="#2867FF"
            style={{
              marginLeft: 3,
            }}
          />
        </Pressable>

      </View>

    </View>
  );
}