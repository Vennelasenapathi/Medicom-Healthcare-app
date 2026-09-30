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
import { globalStyles } from "@/constants/Styles";

type CartItemProps = {
  item: any;
  onRemove: (id: number) => void;
  onQuantityChange: (id: number, amount: number) => void;
};

export default function CartItem({
  item,
  onRemove,
  onQuantityChange,
}: CartItemProps) {
  return (
    <View style={[globalStyles.card, styles.item]}>
      <View style={styles.imageBox}>
        <Image
          source={item.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <View style={globalStyles.spaceBetween}>
          <View>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={globalStyles.smallText}>{item.quantity}</Text>
          </View>

          <Pressable onPress={() => onRemove(item.id)}>
            <Ionicons name="close" size={20} color="#A2A7AF" />
          </Pressable>
        </View>

        <View style={styles.bottom}>
          <View style={styles.counter}>
            <Pressable onPress={() => onQuantityChange(item.id, -1)}>
              <Ionicons
                name="remove"
                size={20}
                color={colors.primaryDark}
              />
            </Pressable>

            <Text style={styles.count}>{item.count}</Text>

            <Pressable onPress={() => onQuantityChange(item.id, 1)}>
              <Ionicons
                name="add"
                size={20}
                color={colors.primaryDark}
              />
            </Pressable>
          </View>

          <Text style={styles.price}>
            ₹{item.price * item.count}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight: 145,
    flexDirection: "row",
    padding: 12,
    elevation: 1,
  },
  imageBox: {
    width: 105,
    height: 118,
    borderRadius: 11,
    backgroundColor: "#FAFBFD",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 90,
    height: 90,
  },
  info: {
    flex: 1,
    paddingLeft: 14,
  },
  name: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  bottom: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  counter: {
    height: 40,
    minWidth: 105,
    paddingHorizontal: 9,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  count: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  price: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
});