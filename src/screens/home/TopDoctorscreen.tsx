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
import { colors } from "@/constants/colors";

export default function TopDoctorsScreen({ navigation }: any) {
  const [searchText, setSearchText] = useState("");

  const doctors = [
    {
      name: "Dr. Eshan Khan",
      specialty: "Ophthalmologist",
      image: require("../../../assets/images/medicom/topdoctor1.png"),
    },
    {
      name: "Dr. Siri Sharma",
      specialty: "Orthodontist",
      image: require("../../../assets/images/medicom/topdoctor2.png"),
    },
    {
      name: "Dr. Jasmin",
      specialty: "Ophthalmologist",
      image: require("../../../assets/images/medicom/topdoctor5.png"),
    },
    {
      name: "Dr. Rama Divija",
      specialty: "Ophthalmologist",
      image: require("../../../assets/images/medicom/topdoctor4.png"),
    },
  ];

  const search = searchText.trim().toLowerCase();

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(search) ||
      doctor.specialty.toLowerCase().includes(search)
  );

  return (
    <View style={styles.container}>

      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Ionicons
            name="chevron-back"
            size={19}
            color={colors.white}
          />
        </Pressable>

        <Text style={styles.title}>Top Doctors</Text>

        <View style={styles.headerSpace} />
      </View>

      {/* SEARCH */}
      <View style={styles.search}>
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.primaryDark}
        />

        <TextInput
          value={searchText}
          onChangeText={setSearchText}
          placeholder="Find a doctor..."
          placeholderTextColor={colors.textSecondary}
          style={styles.searchInput}
          autoCapitalize="none"
          autoCorrect={false}
        />

        {searchText.length > 0 && (
          <Pressable onPress={() => setSearchText("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color={colors.textSecondary}
            />
          </Pressable>
        )}
      </View>

      {/* RESULT COUNT */}
      {searchText.length > 0 && (
        <Text style={styles.resultText}>
          {filteredDoctors.length}{" "}
          {filteredDoctors.length === 1 ? "doctor" : "doctors"} found
        </Text>
      )}

      {/* DOCTORS */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor) => (
            <Pressable
              key={doctor.name}
              style={styles.card}
            >
              {/* IMAGE */}
              <Image
                source={doctor.image}
                style={styles.image}
              />

              {/* DETAILS */}
              <View style={styles.details}>
                <Text style={styles.name}>
                  {doctor.name}
                </Text>

                <Text style={styles.specialty}>
                  {doctor.specialty}
                </Text>

                {/* RATING */}
                <View style={styles.rating}>
                  <Ionicons
                    name="star"
                    size={13}
                    color={colors.star}
                  />

                  <Text style={styles.ratingText}>
                    4.0 (100 reviews)
                  </Text>
                </View>

                {/* DISTANCE */}
                <View style={styles.distance}>
                  <Ionicons
                    name="location-outline"
                    size={13}
                    color={colors.textSecondary}
                  />

                  <Text style={styles.distanceText}>
                    800m away
                  </Text>
                </View>
              </View>

              {/* ARROW */}
              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.textSecondary}
              />
            </Pressable>
          ))
        ) : (
          /* NO RESULTS */
          <View style={styles.noResults}>
            <View style={styles.noResultsIcon}>
              <Ionicons
                name="search-outline"
                size={32}
                color={colors.primaryDark}
              />
            </View>

            <Text style={styles.noResultsTitle}>
              No doctors found
            </Text>

            <Text style={styles.noResultsText}>
              Try searching with a doctor name{"\n"}
              or specialization.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: colors.white,
  },

  header: {
    height: 90,
    paddingTop: 42,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  back: {
    width: 46,
    height: 46,
    borderRadius: 7,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  headerSpace: {
    width: 30,
  },

  search: {
    height: 53,
    marginHorizontal: 14,
    marginTop: 20,
    marginBottom: 5,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: colors.textPrimary,
  },

  resultText: {
    marginHorizontal: 16,
    marginTop: 8,
    fontSize: 12,
    color: colors.textSecondary,
  },

  list: {
    padding: 14,
    gap: 15,
    paddingBottom: 30,
  },

  card: {
    height: 150,
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 111,
    height: 111,
    borderRadius: 7,
    resizeMode: "cover",
  },

  details: {
    flex: 1,
    marginLeft: 20,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  specialty: {
    marginTop: 5,
    fontSize: 12,
    color: colors.textSecondary,
  },

  rating: {
    marginTop: 14,
    paddingHorizontal: 4,
    borderRadius: 3,
    alignSelf: "flex-start",
    backgroundColor: "#E8F8F4",
    flexDirection: "row",
    alignItems: "center",
  },

  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: colors.primaryDark,
  },

  distance: {
    marginTop: 7,
    flexDirection: "row",
    alignItems: "center",
  },

  distanceText: {
    marginLeft: 2,
    fontSize: 12,
    color: colors.textSecondary,
  },

  noResults: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },

  noResultsIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  noResultsTitle: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  noResultsText: {
    marginTop: 7,
    fontSize: 12,
    lineHeight: 18,
    textAlign: "center",
    color: colors.textSecondary,
  },
});