import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  return (
    <View className="flex-1 bg-white">

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 85 }}
      >

        {/* ================= HEADER ================= */}

        <View className="rounded-b-[24px] bg-[#2867FF] px-5 pb-5 pt-12">
          <View className="flex-row items-center justify-between">
            {/* Profile */}
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/44.jpg",
                }}
                className="h-11 w-11 rounded-full"
              />

              <View className="ml-3">
                <Text className="text-[11px] text-white/80">
                  Hello, Welcome!
                </Text>

                <Text className="mt-[2px] text-[16px] font-bold text-white">
                  Emily Humphrey
                </Text>
              </View>
            </View>

            {/* Notification */}

            <Pressable className="h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10">
              <Ionicons
                name="notifications-outline"
                size={23}
                color="#FFFFFF"
              />
              <View className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-white" />
            </Pressable>
          </View>


          {/* ================= SEARCH ================= */}

          <View className="mt-5 h-12 flex-row items-center rounded-xl bg-white px-3">
            <TextInput
              placeholder="Search doctor, drugs..."
              placeholderTextColor="#999999"
              className="flex-1 text-[12px] text-[#071B44]"
            />
            <Ionicons
              name="search-outline"
              size={21}
              color="#2867FF"
            />
          </View>
        </View>


        {/* ================= SERVICES ================= */}

        <View className="mt-4 flex-row justify-between px-7">
          <ServiceItem
            icon="medkit-outline"
            label="Doctor"
          />
          <ServiceItem
            icon="car-outline"
            label="Ambulance"
          />
          <ServiceItem
            icon="business-outline"
            label="Hospital"
          />
          <ServiceItem
            icon="medical-outline"
            label="Pharmacy"
          />
        </View>

        {/* ================= PROMO BANNER ================= */}

        <View className="mt-5 px-5">
          <View className="h-[105px] overflow-hidden rounded-2xl bg-[#DCE8FF] px-3.5 py-3">
            {/* Ending Soon */}
            <View className="self-start rounded-md bg-white px-2 py-1">
              <Text className="text-[8px] font-medium text-[#2867FF]">
                Ending soon
              </Text>
            </View>


            <Text className="mt-1.5 text-[14px] font-bold leading-[19px] text-[#071B44]">
              Trusted care for you & your{"\n"}
              loved ones
            </Text>
            <Pressable className="mt-1.5 h-7 w-[95px] flex-row items-center justify-center rounded-md bg-[#2867FF]">
              <Text className="text-[9px] font-bold text-white">
                Get Care Now
              </Text>
              <Ionicons
                name="chevron-forward"
                size={12}
                color="#FFFFFF"
              />

            </Pressable>
          </View>
        </View>


        {/* ================= NEXT APPOINTMENT ================= */}

        <View className="mt-6 px-5">
          <Text className="text-[13px] font-bold text-[#071B44]">
            Your Next Appointment
          </Text>


          {/* Appointment Card */}

          <View className="mt-3 rounded-xl border border-[#E0E7F2] bg-[#F8FAFE] p-2.5">
            <View className="flex-row items-center">
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/men/32.jpg",
                }}
                className="h-12 w-12 rounded-lg"
              />
              <View className="ml-3 flex-1">
                <Text className="text-[12px] font-bold text-[#071B44]">
                  Dr. Azim Khan
                </Text>
                <Text className="mt-1 text-[9px] text-[#777777]">
                  Dermatologist | 20 Jan 2026, 5:00 PM IST
                </Text>
              </View>
            </View>


            {/* Appointment Buttons */}

            <View className="mt-2.5 flex-row">
              <Pressable className="h-9 flex-1 flex-row items-center justify-center rounded-md bg-[#2867FF]">
                <Text className="text-[9px] font-bold text-white">
                  Join Consultation
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={13}
                  color="#FFFFFF"
                  style={{ marginLeft: 3 }}
                />
              </Pressable>

              {/* Edit */}

              <Pressable className="ml-2 h-9 w-9 items-center justify-center rounded-md bg-[#2867FF]">
                <Ionicons
                  name="create-outline"
                  size={18}
                  color="#FFFFFF"
                />
              </Pressable>

              {/* Delete */}

              <Pressable className="ml-2 h-9 w-9 items-center justify-center rounded-md bg-[#2867FF]">
                <Ionicons
                  name="trash-outline"
                  size={18}
                  color="#FFFFFF"
                />
              </Pressable>
            </View>
          </View>
        </View>


        {/* ================= TOP DOCTORS ================= */}

        <View className="mt-6">
          <View className="flex-row items-center justify-between px-5">
            <Text className="text-[13px] font-bold text-[#071B44]">
              Top Doctors
            </Text>

            <Pressable>
              <Text className="text-[10px] font-semibold text-[#2867FF]">
                See All
              </Text>
            </Pressable>
          </View>


          {/* Doctor List */}

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingLeft: 20,
              paddingRight: 20,
              paddingTop: 12,
            }}
          >

            <DoctorCard
              image="https://randomuser.me/api/portraits/women/44.jpg"
              name="Dr. Moh"
              speciality="Orthodontist"
              rating="4.5"
            />

            <DoctorCard
              image="https://randomuser.me/api/portraits/men/75.jpg"
              name="Dr. Eshan"
              speciality="Ophthalmologist"
              rating="4.2"
            />

            <DoctorCard
              image="https://randomuser.me/api/portraits/women/68.jpg"
              name="Dr. Sarah"
              speciality="Cardiologist"
              rating="4.7"
            />
          </ScrollView>
        </View>
      </ScrollView>


      {/* ================= BOTTOM NAVIGATION ================= */}

      <View className="absolute bottom-0 left-0 right-0 h-[70px] flex-row items-center justify-around border-t border-[#EEEEEE] bg-white">
        {/* Home */}
        <Pressable className="items-center justify-center">
          <Ionicons
            name="home"
            size={24}
            color="#2867FF"
          />
          <Text className="mt-1 text-[8px] font-medium text-[#2867FF]">
            Home
          </Text>
        </Pressable>


        {/* Calendar */}

        <Pressable className="items-center justify-center">
          <Ionicons
            name="calendar-outline"
            size={24}
            color="#071B44"
          />
          <Text className="mt-1 text-[8px] text-[#071B44]">
            Calendar
          </Text>
        </Pressable>

        {/* Messages */}

        <Pressable className="items-center justify-center">
          <Ionicons
            name="chatbubbles-outline"
            size={24}
            color="#071B44"
          />
          <Text className="mt-1 text-[8px] text-[#071B44]">
            Messages
          </Text>
        </Pressable>
        {/* Profile */}
        <Pressable className="items-center justify-center">
          <Ionicons
            name="person-outline"
            size={24}
            color="#071B44"
          />
          <Text className="mt-1 text-[8px] text-[#071B44]">
            Profile
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/* ============================================================
   SERVICE ITEM
============================================================ */

type ServiceItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
};

function ServiceItem({
  icon,
  label,
}: ServiceItemProps) {

  return (
    <Pressable className="items-center">
      <View className="h-12 w-12 items-center justify-center rounded-xl border border-[#E8ECF3] bg-white">
        <Ionicons
          name={icon}
          size={23}
          color="#2867FF"
        />
      </View>

      <Text className="mt-1.5 text-[9px] text-[#071B44]">
        {label}
      </Text>
    </Pressable>
  );
}

/* ============================================================ DOCTOR CARD============================================================ */

type DoctorCardProps = {
  image: string;
  name: string;
  speciality: string;
  rating: string;
};

function DoctorCard({
  image,
  name,
  speciality,
  rating,
}: DoctorCardProps) {

  return (
    <Pressable className="mr-3 w-[120px]">
      {/* Doctor Image */}
      <View className="overflow-hidden rounded-xl bg-[#F1F3F7]">
        <Image
          source={{ uri: image }}
          resizeMode="cover"
          className="h-[105px] w-full"
        />
      </View>
      {/* Name + Rating */}
      <View className="mt-1.5 flex-row items-center">
        <Text
          numberOfLines={1}
          className="flex-1 text-[10px] font-bold text-[#071B44]"
        >
          {name}
        </Text>

        <View className="ml-1 flex-row items-center">
          <Ionicons
            name="star"
            size={10}
            color="#F5B800"
          />
          <Text className="ml-0.5 text-[8px] text-[#777777]">
            {rating}
          </Text>
        </View>
      </View>

      {/* Speciality */}

      <Text
        numberOfLines={1}
        className="mt-0.5 text-[8px] text-[#888888]"
      >
        {speciality}
      </Text>
    </Pressable>
  );
}