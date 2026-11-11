import React, { useState } from "react";
import {
  Image,
  Pressable,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { products } from "@/data/medicines";

export default function PharmacyScreen({ navigation }: any) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showAllPopular, setShowAllPopular] = useState(false);
  const [showAllDiscounted, setShowAllDiscounted] = useState(false);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const openDrug = (product: any) =>
    navigation.navigate("DrugDetails", { product });

  const renderProduct = (product: (typeof products)[number]) => (
    <Pressable
      key={product.id}
      style={styles.card}
      onPress={() => openDrug(product)}
    >
      <View style={styles.imageBox}>
        <Image
          source={product.image}
          style={styles.image}
          resizeMode="contain"
        />

        <Pressable
          style={styles.heart}
          onPress={() => toggleFavorite(product.id)}
          hitSlop={10}
        >
          <Ionicons
            name={
              favorites.includes(product.id) ? "heart" : "heart-outline"
            }
            size={23}
            color={
              favorites.includes(product.id) ? "#FF3B5C" : "#9CA3AF"
            }
          />
        </Pressable>
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>

      <View style={globalStyles.spaceBetween}>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={globalStyles.smallText}>{product.quantity}</Text>
      </View>
    </Pressable>
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

      <View style={[globalStyles.header, styles.header]}>
        <Pressable style={styles.back} onPress={navigation.goBack}>
          <Ionicons name="chevron-back" size={29} color={colors.white} />
        </Pressable>

        <Text style={globalStyles.title}>Pharmacy</Text>

        <Pressable onPress={() => navigation.navigate("Cart")}>
          <Ionicons
            name="cart-outline"
            size={31}
            color={colors.primaryDark}
          />
        </Pressable>
      </View>

      <ScrollView
        style={globalStyles.chatList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={globalStyles.messages}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <View style={styles.search}>
          <TextInput
            placeholder="Search medicines or categories"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
          <Ionicons
            name="search-outline"
            size={27}
            color={colors.primaryDark}
          />
        </View>

        {/* Popular Products */}
        <View style={styles.section}>
          <Text style={globalStyles.sectionTitle}>Popular Products</Text>

          <Pressable
            style={globalStyles.smallButton}
            onPress={() => setShowAllPopular((prev) => !prev)}
          >
            <Text style={styles.seeAll}>
              {showAllPopular ? "Show Less" : "See All"}
            </Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal={!showAllPopular}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={!showAllPopular}
          contentContainerStyle={
            showAllPopular ? styles.expandedGrid : styles.list
          }
        >
          {(showAllPopular ? products : products.slice(0, 3)).map(
            renderProduct
          )}
        </ScrollView>

        {/* Discounted Medicines */}
        <View style={styles.section}>
          <Text style={globalStyles.sectionTitle}>
            Discounted Medicines
          </Text>

          <Pressable
            style={globalStyles.smallButton}
            onPress={() => setShowAllDiscounted((prev) => !prev)}
          >
            <Text style={styles.seeAll}>
              {showAllDiscounted ? "Show Less" : "See All"}
            </Text>
          </Pressable>
        </View>

        <View style={styles.grid}>
          {(showAllDiscounted
            ? products.slice(3)
            : products.slice(3, 6)
          ).map(renderProduct)}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 115,
    paddingTop: 42,
  },
  back: {
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    height: 60,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 14,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  offer: {
    minHeight: 155,
    marginTop: 20,
    padding: 18,
    borderRadius: 17,
    backgroundColor: "#DCE7FF",
  },
  offerSmall: {
    marginBottom: 7,
    fontSize: 12,
    fontWeight: "600",
    color: colors.primaryDark,
  },
  offerTitle: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  shop: {
    height: 38,
    marginTop: 12,
    paddingHorizontal: 16,
    borderRadius: 9,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: colors.primaryDark,
  },
  shopText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },
  section: {
    marginTop: 28,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  seeAll: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primaryDark,
  },
  list: {
    gap: 16,
    paddingRight: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  expandedGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  card: {
    width: 145,
    minHeight: 190,
  },
  imageBox: {
    height: 140,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  image: {
    width: 115,
    height: 115,
  },
  heart: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
    padding: 4,
  },
  name: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  price: {
    marginTop: 7,
    fontSize: 15,
    fontWeight: "700",
    color: colors.primaryDark,
  },
});