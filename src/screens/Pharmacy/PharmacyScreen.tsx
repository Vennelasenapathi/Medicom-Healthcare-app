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
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={29} color={colors.white} />
        </Pressable>

        <Text style={styles.headerTitle}>Pharmacy</Text>

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
        <View style={[globalStyles.row, styles.searchContainer]}>
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

        <View style={styles.offerCard}>
          <Text style={styles.offerSmall}>Limited-time offer</Text>
          <Text style={styles.offerTitle}>
            Quality medicines,{"\n"}delivered to your door
          </Text>

          <Pressable style={styles.shopButton}>
            <Text style={styles.shopButtonText}>Shop Medicines</Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.white}
            />
          </Pressable>
        </View>

        <SectionHeader title="Popular Products" />

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

        <SectionHeader title="Discounted Medicines" />

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

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={[globalStyles.spaceBetween, styles.sectionHeader]}>
      <Text style={styles.sectionTitle}>{title}</Text>

      <Pressable style={styles.seeAll}>
        <Text style={styles.seeAllText}>See All</Text>
      </Pressable>
    </View>
  );
}

function ProductCard({
  product,
  onPress,
}: {
  product: any;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.productCard} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image
          source={product.image}
          style={styles.productImage}
          resizeMode="contain"
        />

        <Ionicons
          name="heart"
          size={21}
          color="#FF5A6B"
          style={styles.heart}
        />
      </View>

      <Text style={styles.productName} numberOfLines={1}>
        {product.name}
      </Text>

      <View style={[globalStyles.spaceBetween, styles.productBottom]}>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={globalStyles.smallText}>{product.quantity}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 115,
    paddingHorizontal: 22,
    paddingTop: 42,
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

  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },

  searchContainer: {
    height: 60,
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: "#E7EBF2",
    borderRadius: 14,
    backgroundColor: colors.white,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingVertical: 0,
  },

  offerCard: {
    height: 155,
    marginTop: 20,
    paddingHorizontal: 21,
    paddingVertical: 18,
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

  shopButton: {
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

  shopButtonText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.white,
  },

  sectionHeader: {
    marginTop: 28,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  seeAll: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 9,
    backgroundColor: "#EAF0FF",
  },

  seeAllText: {
    fontSize: 11,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  horizontalList: {
    gap: 16,
    paddingRight: 8,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },

  productCard: {
    width: 145,
    minHeight: 190,
  },

  imageContainer: {
    height: 140,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
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
  },

  price: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primaryDark,
  },
});