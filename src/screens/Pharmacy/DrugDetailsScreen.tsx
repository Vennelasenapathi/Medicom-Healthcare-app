import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

export default function DrugDetailsScreen({ navigation, route }: any) {
  const product = route.params?.product || {
    name: "Bodrex Herbal",
    quantity: "100ml",
    price: "₹589",
    image: require("../../../assets/images/medicom/medicine3.png"),
  };

  const [quantity, setQuantity] = useState(1);

  const goToCart = () =>
    navigation.navigate("Cart", {
      addedProduct: {
        id: product.id || Date.now(),
        name: product.name,
        quantity: product.quantity,
        price: Number(product.price.replace("₹", "")),
        count: quantity,
        image: product.image,
      },
    });

  return (
    <View style={globalStyles.container}>
      <View style={[globalStyles.header, styles.header]}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={27} color={colors.white} />
        </Pressable>

        <Text style={styles.title}>Drugs Detail</Text>

        <Pressable
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons
            name="cart-outline"
            size={27}
            color={colors.primaryDark}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.imageSection}>
          <Pressable style={styles.favorite}>
            <Ionicons name="heart" size={18} color="#FF5A6B" />
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

        <View style={[globalStyles.spaceBetween, styles.productInfo]}>
          <View>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={globalStyles.smallText}>{product.quantity}</Text>
          </View>

          <View style={styles.counter}>
            <Pressable
              style={styles.counterButton}
              onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              <Ionicons
                name="remove"
                size={20}
                color={colors.primaryDark}
              />
            </Pressable>

            <Text style={styles.quantityText}>{quantity}</Text>

            <Pressable
              style={styles.counterButton}
              onPress={() => setQuantity((q) => q + 1)}
            >
              <Ionicons name="add" size={20} color={colors.primaryDark} />
            </Pressable>
          </View>
        </View>

        <View style={[globalStyles.spaceBetween, styles.ratingPrice]}>
          <View style={globalStyles.row}>
            {[1, 2, 3, 4].map((i) => (
              <Ionicons
                key={i}
                name="star"
                size={18}
                color="#FFB800"
              />
            ))}
            <Ionicons name="star-outline" size={18} color="#FFB800" />
            <Text style={styles.ratingText}>4.0</Text>
          </View>

          <Text style={styles.price}>{product.price}</Text>
        </View>

        <Text style={styles.aboutTitle}>About</Text>

        <Text style={styles.description}>
          Bodrex Herbal is used for temporary relief from common cold and
          cough. Read more
        </Text>

        <View style={styles.buttons}>
          <Pressable style={styles.addButton} onPress={goToCart}>
            <Text style={styles.addText}>Add to cart</Text>
          </Pressable>

          <Pressable style={globalStyles.button} onPress={goToCart}>
            <Text style={globalStyles.buttonText}>Buy now</Text>
          </Pressable>
        </View>

        <View style={[globalStyles.spaceBetween, styles.moreHeader]}>
          <Text style={styles.moreTitle}>More Like This</Text>
          <Pressable style={styles.seeAll}>
            <Text style={styles.seeAllText}>See All</Text>
          </Pressable>
        </View>

        <View style={styles.moreProducts}>
          <MiniProduct
            name="Calvit-L"
            price="₹299"
            image={require("../../../assets/images/medicom/medicine1.png")}
          />
          <MiniProduct
            name="Panadol"
            price="₹399"
            image={require("../../../assets/images/medicom/medicine5.png")}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function MiniProduct({
  name,
  price,
  image,
}: {
  name: string;
  price: string;
  image: any;
}) {
  return (
    <View style={styles.miniProduct}>
      <View style={styles.miniImage}>
        <Image
          source={image}
          style={styles.miniImageActual}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.miniName}>{name}</Text>
      <Text style={styles.miniPrice}>{price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { height: 105, paddingHorizontal: 20, paddingTop: 38 },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 11,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  cartButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  scroll: {
    paddingHorizontal: 18,
    paddingBottom: 40,
  },

  imageSection: {
    height: 270,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
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
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },

  productImage: {
    width: 220,
    height: 210,
  },

  dots: {
    position: "absolute",
    bottom: 8,
    flexDirection: "row",
    alignItems: "center",
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
    borderColor: "#E6EAF0",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  counterButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  quantityText: {
    fontSize: 15,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  ratingPrice: {
    marginTop: 14,
  },

  ratingText: {
    marginLeft: 5,
    fontSize: 13,
    fontWeight: "500",
    color: colors.textPrimary,
  },

  price: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  aboutTitle: {
    marginTop: 25,
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  description: {
    marginTop: 9,
    fontSize: 13,
    lineHeight: 21,
    color: "#8E949E",
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
    alignItems: "center",
    justifyContent: "center",
  },

  addText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  moreHeader: {
    marginTop: 28,
  },

  moreTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  seeAll: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 7,
    backgroundColor: "#EAF0FF",
  },

  seeAllText: {
    fontSize: 9,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  moreProducts: {
    marginTop: 12,
    flexDirection: "row",
    gap: 12,
  },

  miniProduct: {
    width: 125,
  },

  miniImage: {
    height: 110,
    borderWidth: 1,
    borderColor: "#EDF0F4",
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  miniImageActual: {
    width: 90,
    height: 90,
  },

  miniName: {
    marginTop: 7,
    fontSize: 11,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  miniPrice: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: "700",
    color: colors.primaryDark,
  },
});