import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

const suggestions = [
  "Chest pain and shortness of breath",
  "Covid-19 vaccine side-effects?",
  "Nearby clinics and hospitals",
  "What are the side effects of antibiotics?",
  "Skin allergy diagnosis and treatment",
  "Vitamin D deficiency symptoms",
];

export default function SearchScreen({ navigation }: any) {
  const [search, setSearch] = useState("");

  const filtered = suggestions.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
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

          <Text style={styles.title}>Search</Text>

          <View style={{ width: 38 }} />
        </View>

        {/* SEARCH */}
        <View style={styles.searchBox}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search doctor, drugs..."
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

        {/* RESULTS */}
        <View style={styles.results}>
          {filtered.map((item, index) => (
            <Pressable
              key={index}
              style={styles.result}
              onPress={() => setSearch(item)}
            >
              <Text style={styles.resultText}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: 20,
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
    marginTop: 15,
    gap: 12,
  },

  result: {
    height: 40,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  resultText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});