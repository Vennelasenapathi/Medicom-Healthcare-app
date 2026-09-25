import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import BackButton from "@/components/home/BackButton";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { doctors } from "@/data/doctordata";

export default function SpecialtyDoctorsScreen({
  navigation,
}: any) {
  return (
    <View
      style={[
        globalStyles.container,
        styles.container,
      ]}
    >
      {/* HEADER */}

      <View style={globalStyles.header}>
        <BackButton
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.title}>
          Neuro Care
        </Text>

        <View style={styles.headerSpace} />
      </View>

      {/* SEARCH */}

      <View
        style={[
          globalStyles.row,
          styles.search,
        ]}
      >
        <TextInput
          placeholder="Search within Neurologists..."
          placeholderTextColor="#999"
          style={globalStyles.input}
        />

        <Ionicons
          name="search-outline"
          size={25}
          color={colors.primaryDark}
        />
      </View>

      {/* FILTERS */}

      <View style={styles.filters}>
        <Pressable style={styles.activeFilter}>
          <Text style={styles.activeFilterText}>
            Available Today
          </Text>
        </Pressable>

        <Pressable style={styles.filter}>
          <Text style={styles.filterText}>
            Female
          </Text>
        </Pressable>

        <Pressable style={styles.filter}>
          <Text style={styles.filterText}>
            High Rated
          </Text>
        </Pressable>
      </View>

      {/* DOCTOR LIST */}

      <FlatList
        data={doctors}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() =>
              navigation.navigate("DoctorDetails", {
                doctor: item,
              })
            }
          >
            {/* DOCTOR IMAGE */}

            <Image
              source={item.image}
              style={styles.image}
            />

            {/* DOCTOR INFORMATION */}

            <View style={styles.info}>
              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.specialty}>
                {item.specialty}
              </Text>

              <Text style={styles.experience}>
                {item.experience}
              </Text>

              {/* RATING + LOCATION */}

              <View
                style={[
                  globalStyles.row,
                  styles.bottomRow,
                ]}
              >
                <View
                  style={[
                    globalStyles.row,
                    styles.ratingBox,
                  ]}
                >
                  <Ionicons
                    name="star"
                    size={15}
                    color="#20B486"
                  />

                  <Text style={styles.rating}>
                    {item.rating}
                  </Text>

                  <Text style={styles.reviews}>
                    ({item.reviews})
                  </Text>
                </View>

                <Text style={styles.distance}>
                  📍 {item.distance}
                </Text>
              </View>
            </View>

            {/* ARROW */}

            <Ionicons
              name="chevron-forward"
              size={24}
              color="#999"
              style={styles.arrow}
            />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },

  /* HEADER */

  title: {
    fontSize: 23,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  headerSpace: {
    width: 46,
  },

  /* SEARCH */

  search: {
    height: 58,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: "#E2E7EF",
    borderRadius: 13,
    backgroundColor: colors.white,
  },

  /* FILTERS */

  filters: {
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
  },

  activeFilter: {
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: colors.primaryDark,
  },

  activeFilterText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.white,
  },

  filter: {
    paddingHorizontal: 17,
    paddingVertical: 11,
    borderRadius: 9,
    backgroundColor: "#F3F5F9",
  },

  filterText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textSecondary,
  },

  /* LIST */

  list: {
    paddingTop: 20,
    paddingBottom: 35,
  },

  /* DOCTOR CARD */

  card: {
    minHeight: 135,
    marginBottom: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#E4E8EF",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
  },

  /* IMAGE */

  image: {
    width: 105,
    height: 105,
    borderRadius: 14,
    backgroundColor: "#EEF2F5",
  },

  /* INFORMATION */

  info: {
    flex: 1,
    marginLeft: 16,
    justifyContent: "center",
  },

  name: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  specialty: {
    marginTop: 6,
    fontSize: 14,
    color: colors.textSecondary,
  },

  experience: {
    marginTop: 5,
    fontSize: 13,
    color: colors.textSecondary,
  },

  /* RATING */

  bottomRow: {
    marginTop: 10,
  },

  ratingBox: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
    backgroundColor: "#E8F8F3",
  },

  rating: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#20B486",
  },

  reviews: {
    marginLeft: 3,
    fontSize: 11,
    color: "#20B486",
  },

  distance: {
    marginLeft: 12,
    fontSize: 12,
    color: colors.textSecondary,
  },

  arrow: {
    marginLeft: 6,
  },
});