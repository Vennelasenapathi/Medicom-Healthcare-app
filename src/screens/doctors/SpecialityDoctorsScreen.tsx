import React, { useMemo, useState } from "react";
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
import FilterButton from "@/components/doctors/FilterButton";
import BackButton from "@/components/home/BackButton";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { doctors } from "@/data/doctordata";

type FilterType = "Available Today" | "Female" | "High Rated";

export default function SpecialtyDoctorsScreen({ navigation }: any) {
  const [filter, setFilter] =
    useState<FilterType>("Available Today");
  const [search, setSearch] = useState("");

  const filteredDoctors = useMemo(() => {
    let result = [...doctors];

    if (filter === "Female") {
      result = result.filter(
        (doctor) => doctor.gender?.toLowerCase() === "female"
      );
    }

    if (filter === "High Rated") {
      result = result.filter(
        (doctor) => Number(doctor.rating) >= 4.5
      );
    }

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(value) ||
          doctor.specialty.toLowerCase().includes(value)
      );
    }

    return result;
  }, [filter, search]);

  return (
    <View style={[globalStyles.container, styles.container]}>
      {/* Header */}
      <View style={globalStyles.header}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={globalStyles.title}>Neuro Care</Text>
        <View style={styles.headerSpace} />
      </View>

      {/* Search */}
      <View style={[globalStyles.row, styles.search]}>
        <TextInput
          value={search}
          onChangeText={setSearch}
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

      {/* Filters */}
      <View style={styles.filters}>
        <FilterButton
          title="Available Today"
          selected={filter === "Available Today"}
          onPress={() => setFilter("Available Today")}
        />

        <FilterButton
          title="Female"
          selected={filter === "Female"}
          onPress={() => setFilter("Female")}
        />

        <FilterButton
          title="High Rated"
          selected={filter === "High Rated"}
          onPress={() => setFilter("High Rated")}
        />
      </View>

      {/* Doctors */}
      <FlatList
        data={filteredDoctors}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={globalStyles.empty}>
            <Text style={globalStyles.emptyText}>No doctors found</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            style={[
              globalStyles.outlinedCard,
              globalStyles.row,
              styles.card,
            ]}
            onPress={() =>
              navigation.navigate("DoctorDetails", {
                doctor: item,
              })
            }
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.specialty}>{item.specialty} </Text>
              <Text style={styles.experience}>{item.experience}  </Text>
              <View style={[globalStyles.row, styles.bottomRow]}>
                <View style={[globalStyles.row, styles.ratingBox]}>
                  <Ionicons
                    name="star"
                    size={15}
                    color={colors.success}
                  />
                  <Text style={styles.rating}>{item.rating}</Text>
                  <Text style={styles.reviews}>
                    ({item.reviews})
                  </Text>
                </View>

                <Text style={styles.distance}>
                  {item.distance}
                </Text>
              </View>
            </View>

            <Ionicons
              name="chevron-forward"
              size={24}
              color="#999"
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

  headerSpace: { width: 46,},

  search: {
    height: 58,
    paddingHorizontal: 17,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 13,
    backgroundColor: colors.white,
  },

  filters: {
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
  },

  list: {
    paddingTop: 20,
    paddingBottom: 35,
  },

  card: {
    minHeight: 135,
    marginBottom: 16,
    padding: 14,
    borderRadius: 16,
  },

  image: {
    width: 105,
    height: 105,
    borderRadius: 14,
    backgroundColor: "#EEF2F5",
  },

  info: {
    flex: 1,
    marginLeft: 16,
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

  bottomRow: {marginTop: 10,},

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
    color: colors.success,
  },

  reviews: {
    marginLeft: 3,
    fontSize: 11,
    color: colors.success,
  },

  distance: {
    marginLeft: 12,
    fontSize: 12,
    color: colors.textSecondary,
  },
});