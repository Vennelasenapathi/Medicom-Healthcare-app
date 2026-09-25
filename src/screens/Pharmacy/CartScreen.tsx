import React, { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import SuccessModal from "@/components/common/SuccessModal";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

export default function CartScreen({
  navigation,
  route,
}: any) {
  const [successVisible, setSuccessVisible] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const product = route.params?.addedProduct;
    if (!product) return;

    setSuccessVisible(false);

    setItems((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      return exists
        ? prev.map((item) =>
            item.id === product.id
              ? { ...item, count: item.count + product.count }
              : item
          )
        : [...prev, product];
    });

    navigation.setParams({ addedProduct: undefined });
  }, [route.params?.addedProduct]);

  const changeQuantity = (id: number, amount: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(1, item.count + amount) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.count,
    0
  );
  const taxes = items.length ? 59 : 0;
  const total = subtotal + taxes;

  const checkout = () => setSuccessVisible(true);

  const finishOrder = () => {
    setSuccessVisible(false);
    setItems([]);
    navigation.navigate("Home");
  };

  return (
    <View style={globalStyles.container}>
      {/* HEADER */}
      <View style={[globalStyles.header, styles.header]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={27}
            color={colors.white}
          />
        </Pressable>

        <Text style={styles.title}>My Cart</Text>

        <Ionicons
          name="cart-outline"
          size={27}
          color={colors.primaryDark}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {!items.length ? (
          <View style={globalStyles.empty}>
            <Ionicons
              name="cart-outline"
              size={75}
              color="#CBD5E1"
            />
            <Text style={styles.emptyTitle}>
              Your cart is empty
            </Text>
            <Text style={globalStyles.smallText}>
              Add medicines to your cart
            </Text>
          </View>
        ) : (
          <>
            {items.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.productImageBox}>
                  <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.itemInfo}>
                  <View style={styles.itemTop}>
                    <View>
                      <Text style={styles.itemName}>
                        {item.name}
                      </Text>
                      <Text style={globalStyles.smallText}>
                        {item.quantity}
                      </Text>
                    </View>

                    <Pressable
                      onPress={() => removeItem(item.id)}
                    >
                      <Ionicons
                        name="close"
                        size={20}
                        color="#A2A7AF"
                      />
                    </Pressable>
                  </View>

                  <View style={styles.itemBottom}>
                    <View
                      style={[
                        globalStyles.row,
                        styles.counter,
                      ]}
                    >
                      <Pressable
                        style={styles.counterButton}
                        onPress={() =>
                          changeQuantity(item.id, -1)
                        }
                      >
                        <Ionicons
                          name="remove"
                          size={20}
                          color={colors.primaryDark}
                        />
                      </Pressable>

                      <Text style={styles.count}>
                        {item.count}
                      </Text>

                      <Pressable
                        style={styles.counterButton}
                        onPress={() =>
                          changeQuantity(item.id, 1)
                        }
                      >
                        <Ionicons
                          name="add"
                          size={20}
                          color={colors.primaryDark}
                        />
                      </Pressable>
                    </View>

                    <Text style={styles.itemPrice}>
                      ₹{item.price * item.count}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

            <Text style={styles.sectionTitle}>
              Payment Summary
            </Text>

            <View style={styles.summaryCard}>
              <SummaryRow label="Subtotal" value={`₹${subtotal}`} />
              <SummaryRow label="Taxes" value={`₹${taxes}`} />

              <View style={globalStyles.divider} />

              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>
                  Total Amount
                </Text>
                <Text style={styles.totalAmount}>
                  ₹{total}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>
              Payment Method
            </Text>

            <View style={styles.paymentCard}>
              <View style={styles.cardLeft}>
                <View style={styles.visaBox}>
                  <Text style={styles.visa}>VISA</Text>
                </View>

                <View>
                  <Text style={styles.cardNumber}>
                    •••• •••• •••• 4242
                  </Text>
                  <Text style={globalStyles.smallText}>
                    Credit / Debit Card
                  </Text>
                </View>
              </View>

              <Pressable>
                <Text style={styles.change}>Change</Text>
              </Pressable>
            </View>

            <Text style={styles.totalSmall}>Total</Text>

            <View
              style={[
                globalStyles.spaceBetween,
                styles.checkoutRow,
              ]}
            >
              <Text style={styles.bottomTotal}>
                ₹{total}
              </Text>

              <Pressable
                style={globalStyles.button}
                onPress={checkout}
              >
                <View style={globalStyles.row}>
                  <Text style={globalStyles.buttonText}>
                    Checkout
                  </Text>

                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={colors.white}
                  />
                </View>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>

      {successVisible && (
        <SuccessModal
          visible={successVisible}
          title="Payment Successful!"
          description="Your order has been placed successfully."
          buttonTitle="Go to Home"
          onPress={finishOrder}
        />
      )}
    </View>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 105,
    paddingHorizontal: 20,
    paddingTop: 38,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 11,
    backgroundColor: colors.primaryDark,
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
    paddingBottom: 45,
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  cartItem: {
    minHeight: 145,
    marginBottom: 13,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEF1F5",
    borderRadius: 14,
    flexDirection: "row",
    backgroundColor: colors.white,
    elevation: 1,
  },

  productImageBox: {
    width: 105,
    height: 118,
    borderRadius: 11,
    backgroundColor: "#FAFBFD",
    alignItems: "center",
    justifyContent: "center",
  },

  productImage: {
    width: 90,
    height: 90,
  },

  itemInfo: {
    flex: 1,
    paddingLeft: 14,
  },

  itemTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  itemName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  itemBottom: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  counter: {
    height: 40,
    minWidth: 105,
    paddingHorizontal: 7,
    borderWidth: 1,
    borderColor: "#E8ECF2",
    borderRadius: 9,
    justifyContent: "space-between",
  },

  counterButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  count: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  sectionTitle: {
    marginTop: 22,
    marginBottom: 11,
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  summaryCard: {
    padding: 16,
    borderRadius: 13,
    backgroundColor: "#F8FAFC",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  label: {
    fontSize: 13,
    color: "#7F8792",
  },

  value: {
    fontSize: 13,
    fontWeight: "500",
    color: "#7F8792",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  totalLabel: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  totalAmount: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  paymentCard: {
    minHeight: 72,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#EEF1F5",
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  visaBox: {
    width: 55,
    height: 38,
    marginRight: 12,
    borderRadius: 7,
    backgroundColor: "#F3F6FA",
    alignItems: "center",
    justifyContent: "center",
  },

  visa: {
    fontSize: 14,
    fontWeight: "800",
    fontStyle: "italic",
    color: colors.textPrimary,
  },

  cardNumber: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  change: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primaryDark,
  },

  totalSmall: {
    marginTop: 25,
    fontSize: 12,
    color: "#7F8792",
  },

  checkoutRow: {
    marginTop: 5,
  },

  bottomTotal: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
  },
});