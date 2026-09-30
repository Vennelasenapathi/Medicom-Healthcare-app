import React, { useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import FilterButton from "@/components/doctors/FilterButton";
import HospitalCard from "@/components/hospitals/HospitalCard";
import BottomTabBar from "@/components/Bottombar/BottomBar";
import BackButton from "@/components/home/BackButton";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { hospitals } from "@/data/Hospitals";

type FilterType = "Emergency" | "Specialty" | "Distance";

export default function HospitalsScreen({ navigation }: any) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("Emergency");

  const filteredHospitals = useMemo(() => {
    let result = [...hospitals];

    if (filter === "Emergency")
      result = result.filter((h) => h.emergency);

    if (filter === "Specialty")
      result = result.filter((h) => h.specialty?.trim());

    if (filter === "Distance")
      result.sort(
        (a, b) =>
          parseFloat(String(a.distance).replace(/[^\d.]/g, "")) -
          parseFloat(String(b.distance).replace(/[^\d.]/g, ""))
      );

    const value = search.trim().toLowerCase();

    if (value)
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(value) ||
          h.type?.toLowerCase().includes(value) ||
          h.specialty?.toLowerCase().includes(value)
      );

    return result;
  }, [filter, search]);

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.header, styles.header]}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={globalStyles.title}>Hospitals Near You</Text>
        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={[globalStyles.row, styles.searchBox]}>
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

          {(["Emergency", "Specialty", "Distance"] as FilterType[]).map(
            (item) => (
              <FilterButton
                key={item}
                title={item}
                selected={filter === item}
                onPress={() => setFilter(item)}
              />
            )
          )}
        </ScrollView>

        <View style={styles.list}>
          {filteredHospitals.map((hospital) => (
            <HospitalCard
              key={hospital.id}
              hospital={hospital}
              onPress={() =>
                navigation.navigate("HospitalDetails", { hospital })
              }
            />
          ))}

          {!filteredHospitals.length && (
            <View style={globalStyles.empty}>
              <Ionicons
                name="search-outline"
                size={50}
                color="#B0B5BD"
              />
              <Text style={globalStyles.emptyText}>
                No hospitals found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 115,
    paddingHorizontal: 20,
    paddingTop: 50,
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
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 14,
    backgroundColor: colors.white,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  filters: {
    gap: 10,
    alignItems: "center",
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
  list: {
    gap: 17,
  },
});