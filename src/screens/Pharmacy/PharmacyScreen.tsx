
import React from "react";
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
import { globalStyles } from "@/constants/Styles";
import { products } from "@/data/medicines";

export default function PharmacyScreen({ navigation }: any) {
  const openDrug = (product: any) =>
    navigation.navigate("DrugDetails", { product });

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.header, styles.header]}>
        <Pressable style={styles.back} onPress={navigation.goBack}>
          <Ionicons name="chevron-back" size={29} color={colors.white} />
        </Pressable>
        <Text style={globalStyles.title}>Pharmacy</Text>
        <Pressable onPress={() => navigation.navigate("Cart")}>
          <Ionicons name="cart-outline" size={31} color={colors.primaryDark} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.search}>
          <TextInput
            placeholder="Search medicines or categories"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
          <Ionicons name="search-outline" size={27} color={colors.primaryDark} />
        </View>

        <View style={styles.offer}>
          <Text style={styles.offerSmall}>Limited-time offer</Text>
          <Text style={styles.offerTitle}>
            Quality medicines,{"\n"}delivered to your door
          </Text>
          <Pressable style={styles.shop}>
            <Text style={styles.shopText}>Shop Medicines</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.white} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={globalStyles.sectionTitle}>Popular Products</Text>
          <Pressable style={globalStyles.smallButton}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {products.slice(0, 3).map((product) => (
            <Pressable
              key={product.id}
              style={styles.card}
              onPress={() => openDrug(product)}
            >
              <View style={styles.imageBox}>
                <Image source={product.image} style={styles.image} resizeMode="contain" />
                <Ionicons name="heart" size={21} color="#FF5A6B" style={styles.heart} />
              </View>
              <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
              <View style={globalStyles.spaceBetween}>
                <Text style={styles.price}>{product.price}</Text>
                <Text style={globalStyles.smallText}>{product.quantity}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <Text style={globalStyles.sectionTitle}>Discounted Medicines</Text>
          <Pressable style={globalStyles.smallButton}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <View style={styles.grid}>
          {products.slice(3).map((product) => (
            <Pressable
              key={product.id}
              style={styles.card}
              onPress={() => openDrug(product)}
            >
              <View style={styles.imageBox}>
                <Image source={product.image} style={styles.image} resizeMode="contain" />
                <Ionicons name="heart" size={21} color="#FF5A6B" style={styles.heart} />
              </View>
              <Text style={styles.name} numberOfLines={1}>{product.name}</Text>
              <View style={globalStyles.spaceBetween}>
                <Text style={styles.price}>{product.price}</Text>
                <Text style={globalStyles.smallText}>{product.quantity}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { 
    height: 115, 
    paddingTop: 42 
  },
  back: {
    width: 50, 
    height: 50, 
    borderRadius: 13,
    backgroundColor: colors.primaryDark,
    alignItems: "center", 
    justifyContent: "center",
  },
  scroll: { 
    paddingHorizontal: 20, 
    paddingBottom: 50 
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
    color: colors.textPrimary 
  },
  offer: {
    height: 155, 
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
    color: colors.white 
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
    paddingRight: 8 
  },
  grid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    gap: 16 
  },
  card: { 
    width: 145, 
    minHeight: 190 
  },
  imageBox: {
    height: 140, borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 14, alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  image: { 
    width: 115, 
    height: 115 
  },
  heart: { 
    position: "absolute", 
    right: 10, 
    top: 10 
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