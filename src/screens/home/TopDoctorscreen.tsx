import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

const doctors = [
  {
    name: "Dr. Eshan Khan",
    specialty: "Ophthalmologist",
    image: require("../../../assets/images/medicom/topdoctor1.png"),
  },
  {
    name: "Dr. Moh Sharma",
    specialty: "Orthodontist",
    image: require("../../../assets/images/medicom/topdoctor2.png"),
  },
  {
    name: "Dr. Jazmin",
    specialty: "Ophthalmologist",
    image: require("../../../assets/images/medicom/topdoctor3.png"),
  },
  {
    name: "Dr. Rama Divija",
    specialty: "Ophthalmologist",
    image: require("../../../assets/images/medicom/topdoctor4.png"),
  },
];

export default function TopDoctorsScreen({
  navigation,
}: any) {
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

        <View style={{ width: 30 }} />
      </View>

      {/* SEARCH */}
      <View style={styles.search}>
        <Text style={styles.placeholder}>
          Find a doctor...
        </Text>

        <Ionicons
          name="search-outline"
          size={20}
          color={colors.primaryDark}
        />
      </View>

      {/* DOCTORS */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {doctors.map((doctor) => (
          <DoctorListItem
            key={doctor.name}
            doctor={doctor}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function DoctorListItem({ doctor }: any) {
  return (
    <Pressable style={styles.card}>
      <Image source={doctor.image}
        style={styles.image}
      />

      <View style={styles.details}>
        <Text style={styles.name}>{doctor.name}</Text>
        <Text style={styles.specialty}> {doctor.specialty} </Text>

        <View style={styles.rating}>
          <Ionicons
            name="star"
            size={13}
            color="#00A98F"
          />

          <Text style={styles.ratingText}>
            4.0 (100 reviews)
          </Text>
        </View>

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

      <Ionicons
        name="chevron-forward"
        size={16}
        color={colors.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

  search: {
    height: 53,
    marginHorizontal: 14,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  placeholder: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  list: {
    padding: 14,
    gap: 15,
  },

  card: {
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
    backgroundColor: colors.white,
    padding: 5,
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
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 5,
  },

  rating: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 14,
    backgroundColor: "#E8F8F4",
    alignSelf: "flex-start",
    paddingHorizontal: 4,
    borderRadius: 3,
  },

  ratingText: {
    fontSize: 12,
    color: "#00A98F",
    marginLeft: 5,
  },

  distance: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  distanceText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 2,
  },
});