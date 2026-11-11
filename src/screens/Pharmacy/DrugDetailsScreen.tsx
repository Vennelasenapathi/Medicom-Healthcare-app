import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "@/components/common/AppButton";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { products } from "@/data/medicines";

export default function DrugDetailsScreen({ navigation, route }: any) {
  const product = route.params?.product || {
    name: "Bodrex Herbal",
    quantity: "100ml",
    price: "₹589",
    image: require("../../../assets/images/medicom/medicine3.png"),
  };

  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const goToCart = () => {
    const price =
      typeof product.price === "number"
        ? product.price
        : Number(String(product.price).replace(/[₹,\s]/g, ""));

    navigation.navigate("Cart", {
      addedProduct: {
        id: product.id || Date.now(),
        name: product.name,
        quantity: product.quantity,
        price,
        count: quantity,
        image: product.image,
      },
    });
  };

  const recommendedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 6);

  return (
    <View style={globalStyles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <Header navigation={navigation} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {/* Product Image */}
        <View style={styles.imageSection}>
          <Pressable
            style={styles.favorite}
            onPress={() => setIsFavorite((prev) => !prev)}
            hitSlop={10}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={22}
              color={isFavorite ? "#FF3B5C" : "#9CA3AF"}
            />
          </Pressable>

          <Image
            source={product.image}
            style={styles.productImage}
            resizeMode="contain"
          />

          <View style={styles.dots}>
            <View style={[styles.dot, styles.activeDot]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Product Name and Quantity */}
        <View style={[globalStyles.spaceBetween, styles.productInfo]}>
          <View style={styles.productTitleContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={globalStyles.smallText}>{product.quantity}</Text>
          </View>

          <View style={styles.counter}>
            <Pressable
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              hitSlop={8}
            >
              <Ionicons
                name="remove"
                size={20}
                color={colors.primaryDark}
              />
            </Pressable>

            <Text style={styles.quantity}>{quantity}</Text>

            <Pressable
              onPress={() => setQuantity((q) => q + 1)}
              hitSlop={8}
            >
              <Ionicons name="add" size={20} color={colors.primaryDark} />
            </Pressable>
          </View>
        </View>

        {/* Rating and Price */}
        <View style={[globalStyles.spaceBetween, styles.ratingPrice]}>
          <View style={globalStyles.row}>
            {[1, 2, 3, 4].map((i) => (
              <Ionicons key={i} name="star" size={18} color="#FFB800" />
            ))}

            <Ionicons name="star-outline" size={18} color="#FFB800" />
            <Text style={styles.rating}>4.0</Text>
          </View>

          <Text style={styles.price}>{product.price}</Text>
        </View>

        {/* About */}
        <Text style={styles.about}>About</Text>

        <Text style={styles.description}>
          {product.description ||
            `${product.name} is a healthcare product. Please check the product packaging and consult a pharmacist for usage instructions.`}
        </Text>

        {/* Cart Buttons */}
        <View style={styles.buttons}>
          <Pressable style={styles.addButton} onPress={goToCart}>
            <Ionicons
              name="cart-outline"
              size={19}
              color={colors.primaryDark}
            />
            <Text style={styles.addText}>Add to cart</Text>
          </Pressable>

          <AppButton
            title="Buy now"
            onPress={goToCart}
            style={styles.buyButton}
          />
        </View>

        {/* Recommended Products */}
        <View style={[globalStyles.spaceBetween, styles.moreHeader]}>
          <Text style={styles.moreTitle}>More Like This</Text>
          <Text style={styles.recommendationCount}>
            {recommendedProducts.length} items
          </Text>
        </View>

        <View style={styles.moreProducts}>
          {recommendedProducts.map((item) => (
            <Pressable
              key={item.id}
              style={styles.recommendedCard}
              onPress={() => {
                navigation.push("DrugDetails", { product: item });
              }}
            >
              <View style={styles.recommendedImageBox}>
                <Image
                  source={item.image}
                  style={styles.recommendedImage}
                  resizeMode="contain"
                />
              </View>

              <Text style={styles.recommendedName} numberOfLines={1}>
                {item.name}
              </Text>

              <Text style={styles.recommendedQuantity} numberOfLines={1}>
                {item.quantity}
              </Text>

              <Text style={styles.recommendedPrice}>{item.price}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function Header({ navigation }: any) {
  return (
    <View style={[globalStyles.header, styles.header]}>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={27} color={colors.white} />
      </Pressable>

      <Text style={globalStyles.title}>Drugs Detail</Text>

      <Pressable
        style={styles.cart}
        onPress={() => navigation.navigate("Cart")}
      >
        <Ionicons
          name="cart-outline"
          size={27}
          color={colors.primaryDark}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 105,
    paddingTop: 38,
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: 11,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },
  cart: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    paddingHorizontal: 18,
    paddingBottom: 40,
  },

  imageSection: {
    height: 270,
    alignItems: "center",
    justifyContent: "center",
  },
  favorite: {
    position: "absolute",
    right: 5,
    top: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
    zIndex: 1,
  },
  productImage: {
    width: 220,
    height: 210,
  },
  dots: {
    position: "absolute",
    bottom: 8,
    flexDirection: "row",
    gap: 6,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#C9D8FF",
  },
  activeDot: {
    width: 20,
    backgroundColor: colors.primaryDark,
  },

  productInfo: {
    marginTop: 18,
    gap: 8,
  },
  productTitleContainer: {
    flex: 1,
    paddingRight: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  counter: {
    height: 44,
    minWidth: 105,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantity: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  ratingPrice: {
    marginTop: 14,
  },
  rating: {
    marginLeft: 5,
    fontSize: 13,
    color: colors.textPrimary,
  },
  price: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  about: {
    marginTop: 25,
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  description: {
    marginTop: 9,
    fontSize: 13,
    lineHeight: 21,
    color: colors.textSecondary,
  },

  buttons: {
    marginTop: 20,
    flexDirection: "row",
    gap: 12,
  },
  addButton: {
    flex: 1,
    height: 56,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: colors.primaryDark,
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primaryDark,
  },
  buyButton: {
    flex: 1,
    height: 56,
    borderRadius: 14,
  },

  moreHeader: {
    marginTop: 28,
    marginBottom: 12,
  },
  moreTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  recommendationCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  moreProducts: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  recommendedCard: {
    width: "48%",
    padding: 10,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 14,
    backgroundColor: colors.white,
  },
  recommendedImageBox: {
    height: 110,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#F8FAFF",
  },
  recommendedImage: {
    width: "100%",
    height: 105,
  },
  recommendedName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  recommendedQuantity: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textSecondary,
  },
  recommendedPrice: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: "700",
    color: colors.primaryDark,
  },
});
