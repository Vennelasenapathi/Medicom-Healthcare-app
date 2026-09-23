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

const products = [
  {
    id: 1,
    name: "Konidin",
    price: "₹99",
    quantity: "3pcs",
    image: require("../../../assets/images/medicom/medicine2.png"),
  },
  {
    id: 2,
    name: "Bodrex Herbal",
    price: "₹589",
    quantity: "100ml",
    image: require("../../../assets/images/medicom/medicine4.png"),
  },
  {
    id: 3,
    name: "Panadol",
    price: "₹399",
    quantity: "100ml",
    image: require("../../../assets/images/medicom/medicine5.png"),
  },
  {
    id: 4,
    name: "Calvit-L",
    price: "₹299",
    quantity: "5pcs",
    image: require("../../../assets/images/medicom/medicine1.png"),
  },
  {
    id: 5,
    name: "Bodrex Herbal",
    price: "₹589",
    quantity: "5pcs",
    image: require("../../../assets/images/medicom/medicine3.png"),
  },
];

export default function PharmacyScreen({ navigation }: any) {
  const openDrug = (product: any) => {
    navigation.navigate("DrugDetails", {
      product,
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={29}
            color="#fff"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Pharmacy
        </Text>

        <Pressable
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons
            name="cart-outline"
            size={31}
            color={colors.primaryDark}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* SEARCH */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search medicines or categories"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />

          <Ionicons
            name="search-outline"
            size={27}
            color={colors.primaryDark}
          />
        </View>

        {/* OFFER */}
        <View style={styles.offerCard}>
          <View style={styles.offerContent}>
            <Text style={styles.offerSmall}>
              Limited-time offer
            </Text>

            <Text style={styles.offerTitle}>
              Quality medicines,{"\n"}
              delivered to your door
            </Text>

            <Pressable style={styles.shopButton}>
              <Text style={styles.shopButtonText}>
                Shop Medicines
              </Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#fff"
              />
            </Pressable>
          </View>
        </View>

        {/* POPULAR PRODUCTS */}
        <SectionHeader
          title="Popular Products"
          onPress={() => {}}
        />

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        >
          {products.slice(0, 3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => openDrug(product)}
            />
          ))}
        </ScrollView>

        {/* DISCOUNTED MEDICINES */}
        <SectionHeader
          title="Discounted Medicines"
          onPress={() => {}}
        />

        <View style={styles.grid}>
          {products.slice(3).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={() => openDrug(product)}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

/* =====================================================
   SECTION HEADER
===================================================== */

function SectionHeader({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>
        {title}
      </Text>

      <Pressable
        onPress={onPress}
        style={styles.seeAll}
      >
        <Text style={styles.seeAllText}>
          See All
        </Text>
      </Pressable>
    </View>
  );
}

/* =====================================================
   PRODUCT CARD
===================================================== */

function ProductCard({ product, onPress, }: {
  product: any;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={styles.productCard}
      onPress={onPress}
    >
      {/* IMAGE */}
      <View style={styles.imageContainer}>
        <Image
          source={product.image}
          style={styles.productImage}
          resizeMode="contain"
        />

        <View style={styles.heart}>
          <Ionicons
            name="heart"
            size={21}
            color="#FF5A6B"
          />
        </View>
      </View>

      {/* NAME */}
      <Text
        style={styles.productName}
        numberOfLines={1}
      >
        {product.name}
      </Text>

      {/* PRICE + QUANTITY */}
      <View style={styles.productBottom}>
        <Text style={styles.price}>
          {product.price}
        </Text>

        <Text style={styles.quantity}>
          {product.quantity}
        </Text>
      </View>
    </Pressable>
  );
}
/* =====================================================
   STYLES
===================================================== */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  /* HEADER */

  header: {
    height: 115,
    paddingHorizontal: 22,
    paddingTop: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 50,
    height: 50,
    borderRadius: 13,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  cartButton: {
    width: 50,
    height: 50,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  /* MAIN SCROLL */

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  /* SEARCH */

  searchContainer: {
    height: 60,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E7EBF2",
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 0,
  },

  /* OFFER */

  offerCard: {
    height: 155,
    marginTop: 20,
    borderRadius: 17,
    backgroundColor: "#DCE7FF",
    overflow: "hidden",
  },

  offerContent: {
    paddingHorizontal: 21,
    paddingVertical: 18,
  },

  offerSmall: {
    fontSize: 12,
    color: colors.primaryDark,
    marginBottom: 7,
    fontWeight: "600",
  },

  offerTitle: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  shopButton: {
    marginTop: 12,
    height: 38,
    paddingHorizontal: 16,
    borderRadius: 9,
    backgroundColor: colors.primaryDark,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  shopButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },

  /* SECTION HEADER */

  sectionHeader: {
    marginTop: 28,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  seeAll: {
    backgroundColor: "#EAF0FF",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 9,
  },

  seeAllText: {
    fontSize: 11,
    color: colors.primaryDark,
    fontWeight: "700",
  },

  /* HORIZONTAL PRODUCTS */

  horizontalList: {
    gap: 16,
    paddingRight: 8,
  },

  /* GRID */

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },

  /* PRODUCT CARD */

  productCard: {
    width: 145,
    minHeight: 190,
  },

  imageContainer: {
    height: 140,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    borderRadius: 14,
    backgroundColor: "#fff",
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },

  productImage: {
    width: 115,
    height: 115,
  },

  heart: {
    position: "absolute",
    right: 10,
    top: 10,
  },

  productName: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  productBottom: {
    marginTop: 7,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  quantity: {
    fontSize: 11,
    color: "#9CA3AF",
  },
});