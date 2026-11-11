import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "@/components/home/BackButton";
import BottomTabBar from "@/components/Bottombar/BottomBar";
import {
  SpecialtySection,
  DoctorSection,
} from "@/components/doctors/DoctorSections";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { doctors, previousDoctors, specialties } from "@/data/doctordata";

export default function DoctorsScreen({ navigation }: any) {
  const [search, setSearch] = useState("");
  const value = search.toLowerCase().trim();

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(value) ||
      doctor.specialty.toLowerCase().includes(value)
  );

  const displayedDoctors = value ? filteredDoctors : doctors.slice(0, 4);

  return (
    <View style={globalStyles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

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

        <Pressable style={styles.searchBox}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Find a doctor..."
            placeholderTextColor="#999"
            style={ styles.input}
          />
          <Ionicons name="search-outline" size={24} color={colors.primaryDark} />
        </Pressable>

        <SpecialtySection
          specialties={specialties}
          onSpecialtyPress={() => navigation.navigate("SpecialtyDoctors")}
        />

        <DoctorSection
          doctors={displayedDoctors}
          previousDoctors={previousDoctors}
          searching={!!value}
          onDoctorPress={(doctor) =>
            navigation.navigate("DoctorDetails", { doctor })
          }
        />
      </ScrollView>

      <BottomTabBar navigation={navigation} activeTab="Home" />
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: 100,
  },
  header: { height: 48, paddingTop: 10 },
  headerSpace: { width: 46 },
  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
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
});