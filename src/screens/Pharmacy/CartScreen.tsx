import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "@/components/common/AppButton";
import CartItem from "@/components/Pharmacy/CartItem";
import SuccessModal from "@/components/common/SuccessModal";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

export default function CartScreen({ navigation, route }: any) {
  const [items, setItems] = useState<any[]>([]);
  const [successVisible, setSuccessVisible] = useState(false);

  useEffect(() => {
    const product = route.params?.addedProduct;
    if (!product) return;

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

  const changeQuantity = (id: number, amount: number) =>
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(1, item.count + amount) }
          : item
      )
    );

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.count, 0
  );
  const taxes = items.length ? 59 : 0;
  const total = subtotal + taxes;

  const finishOrder = () => {
    setSuccessVisible(false);
    setItems([]);
    navigation.navigate("Home");
  };

  return (
    <View style={globalStyles.container}>
      <Header navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {!items.length ? ( <EmptyCart />) : (
          <>
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={removeItem}
                onQuantityChange={changeQuantity}
              />
            ))}
            <PaymentSummary
              subtotal={subtotal}
              taxes={taxes}
              total={total}
            />
            <PaymentMethod />
            <View style={styles.total}>
              <View>
                <Text style={globalStyles.smallText}>Total</Text>
                <Text style={styles.bottomTotal}>₹{total}</Text>
              </View>
              <AppButton
                title="Checkout"
                onPress={() => setSuccessVisible(true)}
                style={styles.checkout}
              />
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

function Header({ navigation }: any) {
  return (
    <View style={[globalStyles.header, styles.header]}>
      <Pressable style={styles.back} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={27} color={colors.white} />
      </Pressable>
      <Text style={globalStyles.title}>My Cart</Text>
      <Ionicons
        name="cart-outline"
        size={27}
        color={colors.primaryDark}
      />
    </View>
  );
}

function EmptyCart() {
  return (
    <View style={globalStyles.empty}>
      <Ionicons name="cart-outline" size={75} color="#CBD5E1" />
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={globalStyles.smallText}>
        Add medicines to your cart
      </Text>
    </View>
  );
}

function PaymentSummary({subtotal,taxes, total,}: {
  subtotal: number;
  taxes: number;
  total: number;
}) {
  return (
    <>
      <Text style={styles.section}>Payment Summary</Text>

      <View style={globalStyles.summaryCard}>
        <SummaryRow label="Subtotal" value={`₹${subtotal}`} />
        <SummaryRow label="Taxes" value={`₹${taxes}`} />
        <View style={globalStyles.divider} />
        <View style={globalStyles.spaceBetween}>
          <Text style={globalStyles.totalLabel}>Total Amount</Text>
          <Text style={globalStyles.totalAmount}>₹{total}</Text>
        </View>
      </View>
    </>
  );
}

function SummaryRow({label,value,}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={globalStyles.smallText}>{label}</Text>
      <Text style={globalStyles.smallText}>{value}</Text>
    </View>
  );
}

function PaymentMethod() {
  return (
    <>
      <Text style={styles.section}>Payment Method</Text>
      <View style={styles.payment}>
        <View style={globalStyles.row}>
          <View style={styles.visa}>
            <Text style={styles.visaText}>VISA</Text>
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
        <Text style={styles.change}>Change</Text>
      </View>
    </>
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
  section: {
    marginTop: 22,
    marginBottom: 11,
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  payment: {
    minHeight: 72,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  visa: {
    width: 55,
    height: 38,
    marginRight: 12,
    borderRadius: 7,
    backgroundColor: "#F3F6FA",
    alignItems: "center",
    justifyContent: "center",
  },
  visaText: {
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
  total: {
    marginTop: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottomTotal: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  checkout: {
    width: 150,
    height: 52,
    borderRadius: 12,
  },
});