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
import BackButton from "@/components/home/BackButton";
import BottomTabBar from "@/components/Bottombar/BottomBar";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { doctors, previousDoctors, specialties } from "@/data/doctordata";

export default function DoctorsScreen({ navigation }: any) {
  const [search, setSearch] = useState("");

  const recommendedDoctor = doctors[2];

  const filteredDoctors = doctors.filter((doctor) => {
    const value = search.toLowerCase().trim();
    return (
      doctor.name.toLowerCase().includes(value) ||
      doctor.specialty.toLowerCase().includes(value)
    );
  });

  return (
    <View style={globalStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[globalStyles.spaceBetween, styles.header]}>
          <BackButton onPress={() => navigation.goBack()} />
          <Text style={globalStyles.title}>Explore Doctors</Text>
          <View style={styles.headerSpace} />
        </View>

        <View style={styles.searchBox}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Find a doctor..."
            placeholderTextColor="#999"
            style={[globalStyles.input, styles.input]}
          />
          <Ionicons
            name="search-outline"
            size={24}
            color={colors.primaryDark}
          />
        </View>

        <View style={[globalStyles.sectionHeader, styles.sectionHeader]}>
          <Text style={globalStyles.sectionTitle}>Browse By Specialty</Text>
          <Pressable
            style={globalStyles.smallButton}
            onPress={() => navigation.navigate("SpecialtyDoctors")}
          >
            <Text style={styles.seeAllText}>See All</Text>
          </Pressable>
        </View>

        <View style={styles.specialtyGrid}>
          {specialties.map((item) => (
            <Pressable
              key={item.title}
              style={styles.specialtyItem}
              onPress={() => navigation.navigate("SpecialtyDoctors")}
            >
              <View style={[styles.specialtyIcon, globalStyles.center]}>
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={31}
                  color={colors.primaryDark}
                />
              </View>
              <Text style={styles.specialtyName}>{item.title}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={[globalStyles.sectionTitle, styles.recommendedTitle]}>
          {search ? "Search Results" : "Recommended For You"}
        </Text>

        {search ? (
          filteredDoctors.map((doctor) => (
            <Pressable
              key={doctor.name}
              style={[
                globalStyles.outlinedCard,
                globalStyles.horizontalCard,
                styles.doctorCard,
              ]}
              onPress={() => navigation.navigate("DoctorDetails", { doctor }) }
            >
              <Image source={doctor.image} style={styles.doctorImage} />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}>{doctor.name}</Text>
                <Text style={styles.doctorSpecialty}>
                  {doctor.specialty}
                </Text>
                <View style={[globalStyles.row, styles.ratingRow]}>
                  <View style={styles.ratingBox}>
                    <Ionicons name="star" size={12} color="#00A99D" />
                    <Text style={styles.ratingText}>{doctor.rating}</Text>
                  </View>
                  <Ionicons name="location" size={13} color="#555" />
                  <Text style={styles.distance}>{doctor.distance}</Text>
                </View>
              </View>
            </Pressable>
          ))
        ) : (
          <>
            <Pressable
              style={[
                globalStyles.outlinedCard,
                globalStyles.horizontalCard, styles.doctorCard,
              ]}
              onPress={() =>
                navigation.navigate("DoctorDetails", { doctor: recommendedDoctor,})
              }
            >
              <Image
                source={recommendedDoctor.image}
                style={styles.doctorImage}
              />
              <View style={styles.doctorInfo}>
                <Text style={styles.doctorName}> {recommendedDoctor.name} </Text>
                <Text style={styles.doctorSpecialty}> 
                  {recommendedDoctor.specialty}
                </Text>
                <View style={[globalStyles.row, styles.ratingRow]}>
                  <View style={styles.ratingBox}>
                    <Ionicons name="star" size={12} color="#00A99D" />
                    <Text style={styles.ratingText}>
                      {recommendedDoctor.rating}
                    </Text>
                  </View>
                  <Ionicons name="location" size={13} color="#555" />
                  <Text style={styles.distance}>
                    {recommendedDoctor.distance}
                  </Text>
                </View>
              </View>
            </Pressable>

            <View style={[globalStyles.row, styles.dots]}>
              <View style={styles.activeDot} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>

            <Text style={[globalStyles.sectionTitle, styles.previousTitle]}> Previously Consulted </Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {previousDoctors.map((doctor) => (
                <Pressable
                  key={doctor.name}
                  style={styles.previousDoctor}
                  onPress={() => navigation.navigate("DoctorDetails", { doctor })}
                >
                  <Image
                    source={doctor.image}
                    style={styles.previousImage}
                  />
                  <Text style={styles.previousName} numberOfLines={1}> {doctor.name} </Text>
                </Pressable>
              ))}
            </ScrollView>
          </>
        )}
      </ScrollView>
      <BottomTabBar navigation={navigation} activeTab="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: { 
    paddingHorizontal: 20, 
    paddingTop: 32, 
    paddingBottom: 100 
  },
  header: { 
    height: 48 ,
    paddingTop: 10
  },
  headerSpace: { width: 46 },
  input: { 
    flex: 1, 
    height: 50, 
    fontSize: 14, 
    color: colors.textPrimary 
  },
  searchBox: {
    height: 50,
    marginTop: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  sectionHeader: { 
    marginTop: 29 
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
  },
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
  specialtyIcon: {
    width: 62,
    height: 62,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
    elevation: 1,
  },
  specialtyName: {
    marginTop: 7,
    minHeight: 32,
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    textAlign: "center",
    color: colors.textSecondary,
  },
  recommendedTitle: { 
    marginTop: 5, 
    marginBottom: 11 
  },
  doctorCard: {
    height: 125,
    padding: 7,
    borderRadius: 15,
    marginBottom: 10,
  },
  doctorImage: { 
    width: 108, 
    height: 109, 
    borderRadius: 10 
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  doctorName: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  doctorSpecialty: {
    marginTop: 3,
    fontSize: 13,
    color: colors.textSecondary,
  },
  ratingRow: { marginTop: 10 },
  ratingBox: {
    height: 22,
    paddingHorizontal: 7,
    marginRight: 9,
    borderRadius: 4,
    backgroundColor: "#E6F5F3",
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 3,
    fontSize: 11,
    fontWeight: "600",
    color: "#00A99D",
  },
  distance: {
    marginLeft: 4,
    fontSize: 11,
    color: colors.textSecondary,
  },
  dots: { 
    marginTop: 10, 
    justifyContent: "center" 
  },
  activeDot: {
    width: 20,
    height: 5,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: colors.primaryDark,
  },
  dot: {
    width: 10,
    height: 5,
    marginHorizontal: 2,
    borderRadius: 4,
    backgroundColor: "#C9D8FF",
  },
  previousTitle: {
     marginTop: 15, 
     marginBottom: 11 
    },
  previousDoctor: { 
    width: 100, 
    marginRight: 1 
  },
  previousImage: { 
    width: 100, 
    height: 100, 
    borderRadius: 8 
  },
  previousName: {
    marginTop: 7,
    fontSize: 11,
    color: colors.textSecondary,
  },
});