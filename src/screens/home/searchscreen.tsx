import React, { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { doctors } from "@/data/doctordata";

export default function SearchScreen({ navigation }: any) {
  const [search, setSearch] = useState("");

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialty}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      style={globalStyles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
       <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView
        style={globalStyles.chatList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.messages}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
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

          <Text style={styles.title}>Search Doctors</Text>

          <View style={{ width: 38 }} />
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search doctor or specialty..."
            placeholderTextColor="#A0A0A0"
            style={styles.input}
            autoFocus
          />

          <Ionicons
            name="search-outline"
            size={20}
            color={colors.primaryDark}
          />
        </View>

        {/* DOCTORS */}
        <View style={styles.results}>
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <Pressable
                key={doctor.name}
                style={styles.doctorCard}
                onPress={() =>
                  navigation.navigate("DoctorDetails", {
                    doctor,
                  })
                }
              >
                <Image
                  source={doctor.image}
                  style={styles.doctorImage}
                />

                <View style={styles.doctorInfo}>
                  <Text style={styles.doctorName}>
                    {doctor.name}
                  </Text>

                  <Text style={styles.specialty}>
                    {doctor.specialty}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.textSecondary}
                />
              </Pressable>
            ))
          ) : (
            <View style={styles.empty}>
              <Ionicons
                name="search-outline"
                size={40}
                color={colors.border}
              />

              <Text style={styles.emptyTitle}>
                No doctors found
              </Text>

              <Text style={styles.emptyText}>
                Try searching with another doctor name or specialty.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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

  searchBox: {
    height: 53,
    marginTop: 30,
    marginHorizontal: 14,
    borderRadius: 8,
    backgroundColor: colors.background,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
  },

  results: {
    marginHorizontal: 14,
    marginTop: 18,
    gap: 12,
  },

  doctorCard: {
    minHeight: 75,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F7F9FC",
    flexDirection: "row",
    alignItems: "center",
  },

  doctorImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 12,
  },

  doctorInfo: {
    flex: 1,
  },

  doctorName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  specialty: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },

  empty: {
    alignItems: "center",
    paddingTop: 70,
    paddingHorizontal: 30,
  },

  emptyTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  emptyText: {
    marginTop: 6,
    textAlign: "center",
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },
});