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

export default function CartScreen({ navigation, route, }: any) {
    const [successVisible, setSuccessVisible] = useState(false);
    const [items, setItems] = useState<any[]>([]);

    /* * Get product sent from DrugDetailsScreen */
    useEffect(() => {
        const addedProduct = route.params?.addedProduct;

        if (!addedProduct) {
            return;
        }

        // Make sure popup is closed when a product is added
        setSuccessVisible(false);

        setItems((prev) => {
            const existingItem = prev.find(
                (item) => item.id === addedProduct.id
            );
            // If product already exists, increase quantity
            if (existingItem) {
                return prev.map((item) =>
                    item.id === addedProduct.id
                        ? {
                            ...item,
                            count: item.count + addedProduct.count,
                        }
                        : item
                );
            }
            // Otherwise add new product
            return [...prev, addedProduct];
        });
        /*  * Remove navigation parameter after reading it */
        navigation.setParams({
            addedProduct: undefined,
        });
    }, [route.params?.addedProduct]);

    // Change product quantity
    const changeQuantity = (
        id: number,
        amount: number
    ) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        count: Math.max(1, item.count + amount),
                    }
                    : item
            )
        );
    };

    // Remove product
    const removeItem = (id: number) => {
        setItems((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    // Calculate subtotal
    const subtotal = items.reduce((sum, item) => sum + item.price * item.count, 0);

    const taxes = items.length > 0 ? 59 : 0;

    const total = subtotal + taxes;

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
                        size={27}
                        color="#fff"
                    />
                </Pressable>
                <Text style={styles.title}>  My Cart  </Text>
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
                {/* EMPTY CART */}
                {items.length === 0 ? (
                    <View style={styles.emptyCart}>
                        <Ionicons
                            name="cart-outline"
                            size={75}
                            color="#CBD5E1"
                        />
                        <Text style={styles.emptyTitle}> Your cart is empty </Text>
                        <Text style={styles.emptyText}> Add medicines to your cart  </Text>
                    </View>
                ) : (
                    <>
                        {/* CART ITEMS */}
                        {items.map((item) => (
                            <View key={item.id} style={styles.cartItem} >
                                {/* IMAGE */}
                                <View style={styles.productImageBox} >
                                    <Image
                                        source={item.image}
                                        style={styles.productImage}
                                        resizeMode="contain"
                                    />
                                </View>

                                {/* INFO */}
                                <View style={styles.itemInfo}>
                                    <View style={styles.itemTop}>
                                        <View>
                                            <Text style={styles.itemName} >{item.name}</Text>
                                            <Text style={styles.itemQuantity}>{item.quantity}</Text>
                                        </View>
                                        {/* DELETE */}
                                        <Pressable
                                            style={styles.deleteButton}
                                            onPress={() => removeItem(item.id)}
                                        >
                                            <Ionicons
                                                name="close"
                                                size={20}
                                                color="#A2A7AF"
                                            />
                                        </Pressable>
                                    </View>

                                    {/* BOTTOM */}
                                    <View style={styles.itemBottom}>
                                        {/* COUNTER */}
                                        <View style={styles.counter}>
                                            <Pressable
                                                style={styles.counterButton}
                                                onPress={() => changeQuantity(item.id, -1)}
                                            >
                                                <Text style={styles.minus} >
                                                    <Ionicons
                                                        name="remove"
                                                        size={20}
                                                        color={colors.primaryDark}
                                                    />
                                                </Text>
                                            </Pressable>

                                            <Text style={styles.count}>{item.count}</Text>

                                            <Pressable
                                                style={styles.counterButton}
                                                onPress={() => changeQuantity(item.id, 1)}
                                            >
                                                <Text style={styles.plus}>
                                                    <Ionicons
                                                        name="add"
                                                        size={20}
                                                        color={colors.primaryDark}
                                                                     
                                                    />
                                                </Text>
                                            </Pressable>
                                        </View>

                                        {/* PRICE */}
                                        <Text style={styles.itemPrice}>
                                            ₹{item.price * item.count}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}

                        {/* PAYMENT SUMMARY */}
                        <Text style={styles.sectionTitle}>
                            Payment Summary
                        </Text>

                        <View style={styles.summaryCard}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.label}>Subtotal</Text>
                                <Text style={styles.value}> ₹{subtotal}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.label}>Taxes</Text>
                                <Text style={styles.value}>₹{taxes}</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.totalRow}>
                                <Text style={styles.totalLabel}>Total Amount</Text>
                                <Text style={styles.totalAmount} >₹{total}</Text>
                            </View>
                        </View>

                        {/* PAYMENT METHOD */}
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
                                        ••••  ••••  ••••  4242
                                    </Text>
                                    <Text style={styles.cardText}>
                                        Credit / Debit Card
                                    </Text>
                                </View>
                            </View>
                            <Pressable>
                                <Text style={styles.change}>Change</Text>
                            </Pressable>
                        </View>

                        {/* TOTAL */}
                        <Text style={styles.totalSmall}>Total</Text>
                        <View style={styles.checkoutRow}>
                            <Text style={styles.bottomTotal}>₹{total}</Text>
                            <Pressable
                                style={styles.checkout}
                                onPress={() =>setSuccessVisible(true)}
                            >
                                <Text style={styles.checkoutText} >Checkout</Text>
                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color="#fff"
                                />
                            </Pressable>
                        </View>
                    </>
                )}
            </ScrollView>

            {/* SUCCESS POPUP */}
            {successVisible && (
                <SuccessModal
                    visible={successVisible}
                    title="Payment Successful!"
                    description="Your order has been placed successfully."
                    buttonTitle="Go to Home"
                    onPress={() => {
                        setSuccessVisible(false);
                        setItems([]);
                        navigation.navigate("Home");
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    /* HEADER */
    header: {
        height: 105,
        paddingHorizontal: 20,
        paddingTop: 38,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
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

    /* SCROLL */
    scroll: {
        paddingHorizontal: 18,
        paddingBottom: 45,
    },

    /* EMPTY CART */
    emptyCart: {
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 150,
    },

    emptyTitle: {
        marginTop: 18,
        fontSize: 20,
        fontWeight: "700",
        color: colors.textPrimary,
    },

    emptyText: {
        marginTop: 7,
        fontSize: 13,
        color: "#9CA3AF",
    },

    /* CART ITEM */
    cartItem: {
        minHeight: 145,
        borderWidth: 1,
        borderColor: "#EEF1F5",
        borderRadius: 14,
        padding: 12,
        flexDirection: "row",
        marginBottom: 13,
        backgroundColor: "#fff",

        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },

        elevation: 1,
    },

    /* PRODUCT IMAGE */
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

    /* ITEM INFO */
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

    itemQuantity: {
        marginTop: 5,
        fontSize: 11,
        color: "#9CA3AF",
    },

    deleteButton: {
        width: 32,
        height: 32,
        alignItems: "center",
        justifyContent: "center",
    },

    /* ITEM BOTTOM */
    itemBottom: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
    },

    /* COUNTER */
    counter: {
        height: 40,
        minWidth: 105,
        paddingHorizontal: 7,
        borderWidth: 1,
        borderColor: "#E8ECF2",
        borderRadius: 9,
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

    minus: {
        fontSize: 24,
        color: "#A0A5AD",
    },

    count: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.textPrimary,
    },

    plus: {
        width: 24,
        height: 24,
        borderRadius: 7,
        backgroundColor: colors.white,
        color: "#fff",
        textAlign: "center",
        lineHeight: 24,
        fontSize: 17,
        fontWeight: "700",
    },

    itemPrice: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.textPrimary,
    },

    /* SECTION */
    sectionTitle: {
        marginTop: 22,
        marginBottom: 11,
        fontSize: 16,
        fontWeight: "700",
        color: colors.textPrimary,
    },

    /* SUMMARY */
    summaryCard: {
        backgroundColor: "#F8FAFC",
        borderRadius: 13,
        padding: 16,
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
        color: "#7F8792",
        fontWeight: "500",
    },

    divider: {
        height: 1,
        backgroundColor: "#E5E9EF",
        marginVertical: 5,
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

    /* PAYMENT */
    paymentCard: {
        minHeight: 72,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#EEF1F5",
        paddingHorizontal: 15,
        paddingVertical: 12,
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
        borderRadius: 7,
        backgroundColor: "#F3F6FA",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 12,
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

    cardText: {
        marginTop: 4,
        fontSize: 10,
        color: "#9CA3AF",
    },

    change: {
        fontSize: 12,
        color: colors.primaryDark,
        fontWeight: "600",
    },

    /* TOTAL */
    totalSmall: {
        marginTop: 25,
        fontSize: 12,
        color: "#7F8792",
    },

    checkoutRow: {
        marginTop: 5,
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
        width: 170,
        height: 52,
        borderRadius: 12,
        backgroundColor: colors.primaryDark,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    checkoutText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
    },
});