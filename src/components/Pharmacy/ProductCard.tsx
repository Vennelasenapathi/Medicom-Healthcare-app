import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";

export default function ProductCard({
  product,
  onPress,
}: {
  product: any;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.imageBox}>
        <Image
          source={product.image}
          style={styles.image}
          resizeMode="contain"
        />

        <Ionicons
          name="heart"
          size={13}
          color="#FF5A6B"
          style={styles.heart}
        />
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>

      <View style={styles.bottom}>
        <Text style={styles.price}>{product.price}</Text>

        <Text style={styles.quantity}>
          {product.quantity}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 96,
  },

  imageBox: {
    height: 88,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#EDF0F4",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  image: {
    width: 70,
    height: 70,
  },

  heart: {
    position: "absolute",
    right: 6,
    top: 6,
  },

  name: {
    marginTop: 5,
    fontSize: 8,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  bottom: {
    marginTop: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  price: {
    fontSize: 8,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  quantity: {
    fontSize: 7,
    color: "#9CA3AF",
  },
});