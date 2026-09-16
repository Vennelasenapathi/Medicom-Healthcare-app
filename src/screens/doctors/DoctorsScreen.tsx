import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import BottomTabBar from "@/components/Bottombar/BottomBar";
import { colors } from "@/constants/colors";
import { doctors } from "@/data/doctordata";

const specialties = [
  { title: "Neuro\nCare", icon: "brain" },
  { title: "Surgeon", icon: "needle" },
  { title: "Genomics", icon: "dna" },
  { title: "Bone &\nJoint", icon: "bone" },
  { title: "Covid-19", icon: "virus-outline" },
  { title: "General", icon: "stethoscope" },
  { title: "Dentist", icon: "tooth-outline" },
  { title: "Lungs\nSpecialist", icon: "lungs" },
];

export default function DoctorsScreen({ navigation }: any) {
  const [search, setSearch] = useState("");

  const recommendedDoctor = doctors[2];

  const previousDoctors = [
    {
      name: "Dr. Eshan Khan",
      image: require("../../../assets/images/medicom/topdoctor1.png"),
    },
    {
      name: "Dr. Rama Divja",
      image: require("../../../assets/images/medicom/topdoctor4.png"),
    },
    {
      name: "Dr. Jazmine Yale",
      image: require("../../../assets/images/medicom/topdoctor2.png"),
    },
    {
      name: "Dr. Siri Sharma",
      image: require("../../../assets/images/medicom/topdoctor5.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={colors.white}
            />
          </Pressable>

          <Text style={styles.title}>Explore Doctors</Text>

          <View style={styles.headerSpace} />
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Find a doctor..."
            placeholderTextColor="#999"
            style={styles.input}
          />

          <Ionicons
            name="search-outline"
            size={24}
            color={colors.primaryDark}
          />
        </View>

        {/* SPECIALTY HEADER */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Browse By Specialty</Text>

          <Pressable
            style={styles.seeAllButton}
            onPress={() => navigation.navigate("SpecialtyDoctors")}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </Pressable>
        </View>

        {/* SPECIALTIES */}
        <View style={styles.specialtyGrid}>
          {specialties.map((item) => (
            <Pressable
              key={item.title}
              style={styles.specialtyItem}
              onPress={() =>
                navigation.navigate("SpecialtyDoctors")
              }
            >
              <View style={styles.specialtyIconBox}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={31}
                  color={colors.primaryDark}
                />
              </View>

              <Text style={styles.specialtyName}>
                {item.title}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* RECOMMENDED */}
        <View style={styles.recommendedHeader}>
          <Text style={styles.sectionTitle}>
            Recommended For You
          </Text>
        </View>

        <Pressable
          style={styles.recommendedCard}
          onPress={() =>
            navigation.navigate("DoctorDetails", {
              doctor: recommendedDoctor,
            })
          }
        >
          <Image
            source={recommendedDoctor.image}
            style={styles.recommendedImage}
          />

          <View style={styles.recommendedInfo}>
            <Text style={styles.recommendedName}>
              {recommendedDoctor.name}
            </Text>

            <Text style={styles.recommendedSpecialty}>
              {recommendedDoctor.specialty}
            </Text>

            <View style={styles.ratingRow}>
              <View style={styles.ratingBox}>
                <Text style={styles.star}>★</Text>
                <Text style={styles.ratingText}>
                  {recommendedDoctor.rating}
                </Text>
              </View>

              <Ionicons
                name="location"
                size={13}
                color="#555"
              />

              <Text style={styles.distance}>
                {recommendedDoctor.distance}
              </Text>
            </View>
          </View>
        </Pressable>

        {/* PAGE INDICATOR */}
        <View style={styles.dots}>
          <View style={styles.activeDot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>

        {/* PREVIOUSLY CONSULTED */}
        <Text style={styles.previousTitle}>
          Previously Consulted
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.previousScroll}
        >
          {previousDoctors.map((doctor) => (
            <Pressable
              key={doctor.name}
              style={styles.previousDoctor}
              onPress={() =>
                navigation.navigate("DoctorDetails", {
                  doctor,
                })
              }
            >
              <Image
                source={doctor.image}
                style={styles.previousImage}
              />

              <Text
                style={styles.previousName}
                numberOfLines={1}
              >
                {doctor.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </ScrollView>

      {/* BOTTOM NAVIGATION */}
      <BottomTabBar
        navigation={navigation}
        activeTab="Home"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 100,
  },

  /* HEADER */

  header: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 10,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  headerSpace: {
    width: 46,
  },

  /* SEARCH */

  searchBox: {
    height: 50,
    marginTop: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#F0F1F5",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },

  /* SECTION */

  sectionHeader: {
    marginTop: 29,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  seeAllButton: {
    paddingHorizontal: 16,
    paddingVertical: 7,
    borderRadius: 6,
    backgroundColor: "#E8EEFF",
  },

  seeAllText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  /* SPECIALTY */

  specialtyGrid: {
    marginTop: 14,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  specialtyItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 17,
  },

  specialtyIconBox: {
    width: 62,
    height: 62,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#ECEEF3",
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 5,
    elevation: 1,
  },

  specialtyName: {
    marginTop: 7,
    minHeight: 32,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#41485A",
  },

  /* RECOMMENDED */

  recommendedHeader: {
    marginTop: 5,
    marginBottom: 11,
  },

  recommendedCard: {
    height: 125,
    padding: 7,
    borderWidth: 1,
    borderColor: "#E8EAF0",
    borderRadius: 15,
    flexDirection: "row",
    backgroundColor: colors.white,
  },

  recommendedImage: {
    width: 108,
    height: 109,
    borderRadius: 10,
    resizeMode: "cover",
  },

  recommendedInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },

  recommendedName: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  recommendedSpecialty: {
    marginTop: 3,
    fontSize: 13,
    color: "#8B8F99",
  },

  ratingRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  ratingBox: {
    height: 22,
    paddingHorizontal: 7,
    borderRadius: 4,
    backgroundColor: "#E6F5F3",
    flexDirection: "row",
    alignItems: "center",
    marginRight: 9,
  },

  star: {
    fontSize: 12,
    color: "#00A99D",
    marginRight: 3,
  },

  ratingText: {
    fontSize: 11,
    color: "#00A99D",
    fontWeight: "600",
  },

  distance: {
    marginLeft: 4,
    fontSize: 11,
    color: "#777C87",
  },

  /* DOTS */

  dots: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  activeDot: {
    width: 20,
    height: 5,
    borderRadius: 4,
    backgroundColor: colors.primaryDark,
    marginHorizontal: 2,
  },

  dot: {
    width: 10,
    height: 5,
    borderRadius: 4,
    backgroundColor: "#C9D8FF",
    marginHorizontal: 2,
  },

  /* PREVIOUS */

  previousTitle: {
    marginTop: 15,
    marginBottom: 11,
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  previousScroll: {
    paddingRight: 0,
  },

  previousDoctor: {
    width: 100,
    marginRight: 1,
    
  },

  previousImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },

  previousName: {
    marginTop: 7,
    fontSize: 11,
    color: "#777B86",
  },
});