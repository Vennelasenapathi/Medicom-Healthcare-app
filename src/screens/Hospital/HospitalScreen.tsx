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
import { Ionicons } from "@expo/vector-icons";
import BottomTabBar from "@/components/Bottombar/BottomBar";
import { colors } from "@/constants/colors";

const hospitals = [
  {
    id: 1,
    name: "Greenfield Hospital",
    type: "Multi-specialty Hospital",
    rating: "4.0 (100 reviews)",
    distance: "800m away",
    image: require("../../../assets/images/medicom/hospital1.png"),
  },
  {
    id: 2,
    name: "Apex Hospital",
    type: "Specialty Clinic",
    rating: "4.0 (100 reviews)",
    distance: "800m away",
    image: require("../../../assets/images/medicom/hospital2.png"),
  },
  {
    id: 3,
    name: "City Neuro Hospital",
    type: "Multi-specialty Hospital",
    rating: "4.0 (100 reviews)",
    distance: "900m away",
    image: require("../../../assets/images/medicom/hospital3.png"),
  },
];

const filters = ["Emergency", "Specialty", "Distance"];

export default function HospitalsScreen({ navigation }: any) {
  const [search, setSearch] = useState("");

  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={colors.white}
          />
        </Pressable>
        <Text style={styles.title}>Hospitals Near You</Text>
        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search hospital or specialty..."
            placeholderTextColor="#A5ABB5"
            style={styles.searchInput}
          />

          <Ionicons
            name="search-outline"
            size={27}
            color={colors.primaryDark}
          />
        </View>

        {/* FILTERS */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          <Pressable style={styles.filterButton}>
            <Ionicons
              name="options-outline"
              size={22}
              color={colors.primaryDark}
            />
          </Pressable>

          {filters.map((filter, index) => (
            <Pressable
              key={filter}
              style={[
                styles.filterChip,
                index === 0 && styles.activeFilter,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  index === 0 && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* HOSPITALS */}
        <View style={styles.hospitalList}>
          {filteredHospitals.map((hospital) => (
            <Pressable
              key={hospital.id}
              style={styles.hospitalCard}
              onPress={() =>
                navigation.navigate("HospitalDetails", {
                  hospital,
                })
              }
            >
              <Image
                source={hospital.image}
                style={styles.hospitalImage}
              />

              <View style={styles.hospitalInfo}>
                <Text style={styles.hospitalName}>
                  {hospital.name}
                </Text>

                <Text style={styles.hospitalType}>
                  {hospital.type}
                </Text>

                <View style={styles.ratingBox}>
                  <Ionicons
                    name="star"
                    size={15}
                    color="#18A874"
                  />

                  <Text style={styles.ratingText}>
                    {hospital.rating}
                  </Text>
                </View>

                <View style={styles.distanceRow}>
                  <Ionicons
                    name="location-outline"
                    size={17}
                    color="#777F8C"
                  />

                  <Text style={styles.distance}>
                    {hospital.distance}
                  </Text>
                </View>

                <View style={styles.emergencyRow}>
                  <View style={styles.redDot} />

                  <Text style={styles.emergencyText}>
                    Emergency Available
                  </Text>
                </View>
              </View>

              <Ionicons
                name="chevron-forward"
                size={22}
                color="#A0A6AF"
                style={styles.arrow}
              />
            </Pressable>
          ))}

          {filteredHospitals.length === 0 && (
            <View style={styles.empty}>
              <Ionicons
                name="search-outline"
                size={50}
                color="#B0B5BD"
              />

              <Text style={styles.emptyText}>
                No hospitals found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

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

  header: {
    height: 115,
    paddingHorizontal: 20,
    paddingTop: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 11,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  headerSpace: {
    width: 46,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 120,
  },

  searchBox: {
    height: 60,
    borderWidth: 1,
    borderColor: "#DEE3E9",
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 0,
  },

  filters: {
    alignItems: "center",
    gap: 10,
    paddingVertical: 18,
  },

  filterButton: {
    width: 46,
    height: 40,
    borderRadius: 9,
    backgroundColor: "#E8EFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  filterChip: {
    height: 40,
    paddingHorizontal: 20,
    borderRadius: 9,
    backgroundColor: "#F5F6F8",
    alignItems: "center",
    justifyContent: "center",
  },

  activeFilter: {
    backgroundColor: "#E2EBFF",
  },

  filterText: {
    fontSize: 13,
    color: "#626A78",
  },

  activeFilterText: {
    color: colors.primaryDark,
    fontWeight: "700",
  },

  hospitalList: {
    gap: 17,
  },

  hospitalCard: {
    minHeight: 145,
    borderWidth: 1,
    borderColor: "#DEE2E7",
    borderRadius: 15,
    padding: 11,
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  hospitalImage: {
    width: 120,
    height: 120,
    borderRadius: 11,
    resizeMode: "cover",
  },

  hospitalInfo: {
    flex: 1,
    marginLeft: 15,
    paddingTop: 3,
  },

  hospitalName: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  hospitalType: {
    fontSize: 12,
    color: "#858C97",
    marginTop: 5,
  },

  ratingBox: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#E7F8F1",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    marginTop: 9,
  },

  ratingText: {
    fontSize: 11,
    color: "#15936A",
    fontWeight: "600",
  },

  distanceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  distance: {
    fontSize: 11,
    color: "#777F8C",
    marginLeft: 5,
  },

  emergencyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  redDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF4D4F",
  },

  emergencyText: {
    fontSize: 11,
    color: "#FF4D4F",
    marginLeft: 7,
  },

  arrow: {
    alignSelf: "center",
    marginLeft: 4,
  },

  empty: {
    alignItems: "center",
    paddingTop: 120,
  },

  emptyText: {
    marginTop: 15,
    fontSize: 17,
    color: "#858C97",
  },
});