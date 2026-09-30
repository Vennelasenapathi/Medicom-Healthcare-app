import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/colors";

type Props = {
  name: string;
  price: string;
  image: any;
};

export default 
function MiniProduct({name,price,image,}: {
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
  miniProduct: { width: 125 },
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
