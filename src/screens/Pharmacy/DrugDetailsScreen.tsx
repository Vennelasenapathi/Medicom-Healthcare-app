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

export default function DrugDetailsScreen({
    navigation,
    route,
}: any) {
    const product = route.params?.product || {
        name: "Bodrex Herbal",
        quantity: "100ml",
        price: "₹589",
        image: require("../../../assets/images/medicom/medicine3.png"),
    };
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id || Date.now(),
            name: product.name,
            quantity: product.quantity,
            price: Number(product.price.replace("₹", "")),
            count: quantity,
            image: product.image,
        };
        navigation.navigate("Cart", {
            addedProduct: cartItem,
        });
    };

    const handleBuyNow = () => {
        const cartItem = {
            id: product.id || Date.now(),
            name: product.name,
            quantity: product.quantity,
            price: Number(product.price.replace("₹", "")),
            count: quantity,
            image: product.image,
        };
        navigation.navigate("Cart", {
            addedProduct: cartItem,
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
                        size={27}
                        color="#fff"
                    />
                </Pressable>

                <Text style={styles.title}>
                    Drugs Detail
                </Text>

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
                {/* PRODUCT IMAGE */}
                <View style={styles.imageSection}>
                    <Pressable style={styles.favorite}>
                        <Ionicons
                            name="heart"
                            size={18}
                            color="#FF5A6B"
                        />
                    </Pressable>

                    <Image
                        source={product.image}
                        style={styles.productImage}
                        resizeMode="contain"
                    />

                    <View style={styles.dots}>
                        <View style={[styles.dot,styles.activeDot,]}/>
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>

                {/* PRODUCT INFO */}
                <View style={styles.productInfo}>
                    <View>
                        <Text style={styles.productName}>
                            {product.name}
                        </Text>

                        <Text style={styles.productQuantity}>
                            {product.quantity}
                        </Text>
                    </View>

                    {/* QUANTITY */}
                    <View style={styles.counter}>
                        <Pressable
                            style={styles.counterButton}
                            onPress={() =>
                                setQuantity((prev) =>
                                    Math.max(1, prev - 1)
                                )
                            }
                        >
                            <Text style={styles.counterMinus}>
                                <Ionicons
                                    name="remove"
                                    size={20}
                                    color={colors.primaryDark}
                                />
                            </Text>
                        </Pressable>

                        <Text style={styles.quantityText}>
                            {quantity}
                        </Text>

                        <Pressable
                            style={styles.counterButton}
                            onPress={() =>
                                setQuantity((prev) => prev + 1)
                            }
                        >
                            <Text style={styles.counterPlus}>
                                <Ionicons
                                    name="add"
                                    size={20}
                                    color={colors.primaryDark}
                                />
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* RATING + PRICE */}
                <View style={styles.ratingPrice}>
                    <View style={styles.rating}>
                        <Ionicons
                            name="star"
                            size={18}
                            color="#FFB800"
                        />
                        <Ionicons
                            name="star"
                            size={18}
                            color="#FFB800"
                        />
                        <Ionicons
                            name="star"
                            size={18}
                            color="#FFB800"
                        />
                        <Ionicons
                            name="star"
                            size={18}
                            color="#FFB800"
                        />
                        <Ionicons
                            name="star-outline"
                            size={18}
                            color="#FFB800"
                        />

                        <Text style={styles.ratingText}>
                            4.0
                        </Text>
                    </View>

                    <Text style={styles.price}>
                        {product.price}
                    </Text>
                </View>

                {/* ABOUT */}
                <Text style={styles.aboutTitle}>
                    About
                </Text>

                <Text style={styles.description}>
                    Bodrex Herbal is used for temporary
                    relief from common cold and cough.
                    Read more
                </Text>

                {/* BUTTONS */}
                <View style={styles.buttons}>
                    <Pressable
                        style={styles.addButton}
                        onPress={handleAddToCart}
                    >
                        <Text style={styles.addText}>
                            Add to cart
                        </Text>
                    </Pressable>

                    <Pressable
                        style={styles.buyButton}
                        onPress={handleBuyNow}
                    >
                        <Text style={styles.buyText}>
                            Buy now
                        </Text>
                    </Pressable>
                </View>

                {/* MORE LIKE THIS */}
                <View style={styles.moreHeader}>
                    <Text style={styles.moreTitle}>
                        More Like This
                    </Text>

                    <Pressable style={styles.seeAll}>
                        <Text style={styles.seeAllText}>
                            See All
                        </Text>
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

/* =====================================================
   MINI PRODUCT
===================================================== */

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

            <Text style={styles.miniName}>
                {name}
            </Text>

            <Text style={styles.miniPrice}>
                {price}
            </Text>
        </View>
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

    /* SCROLL */
    scroll: {
        paddingHorizontal: 18,
        paddingBottom: 40,
    },

    /* IMAGE */
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
        backgroundColor: "#fff",
        elevation: 3,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        alignItems: "center",
        justifyContent: "center",
    },

    productImage: {
        width: 220,
        height: 210,
    },

    /* DOTS */
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

    /* PRODUCT INFO */
    productInfo: {
        marginTop: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    productName: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.textPrimary,
    },

    productQuantity: {
        marginTop: 5,
        fontSize: 13,
        color: "#9CA3AF",
    },

    /* COUNTER */
    counter: {
        height: 44,
        minWidth: 105,
        paddingHorizontal: 8,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#E6EAF0",
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

    counterMinus: {
        fontSize: 25,
        color: "#A0A5AD",
    },

    counterPlus: {
        fontSize: 25,
        fontWeight: "700",
        color: colors.primaryDark,
    },

    quantityText: {
        fontSize: 15,
        fontWeight: "600",
        color: colors.textPrimary,
    },

    /* RATING + PRICE */
    ratingPrice: {
        marginTop: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    rating: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },

    ratingText: {
        marginLeft: 5,
        fontSize: 13,
        color: colors.textPrimary,
        fontWeight: "500",
    },

    price: {
        fontSize: 21,
        fontWeight: "700",
        color: colors.textPrimary,
    },

    /* ABOUT */
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

    /* BUTTONS */
    buttons: {
        marginTop: 20,
        flexDirection: "row",
        gap: 12,
    },

    addButton: {
        flex: 1,
        height: 52,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: colors.primaryDark,
        alignItems: "center",
        justifyContent: "center",
    },

    addText: {
        color: colors.primaryDark,
        fontSize: 14,
        fontWeight: "700",
    },

    buyButton: {
        flex: 1,
        height: 52,
        borderRadius: 12,
        backgroundColor: colors.primaryDark,
        alignItems: "center",
        justifyContent: "center",
    },

    buyText: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "700",
    },

    /* MORE LIKE THIS */
    moreHeader: {
        marginTop: 28,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    moreTitle: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.textPrimary,
    },

    seeAll: {
        backgroundColor: "#EAF0FF",
        paddingHorizontal: 12,
        paddingVertical: 7,
        borderRadius: 7,
    },

    seeAllText: {
        fontSize: 9,
        color: colors.primaryDark,
        fontWeight: "700",
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
        color: colors.textPrimary,
        fontWeight: "600",
    },

    miniPrice: {
        marginTop: 3,
        fontSize: 11,
        fontWeight: "700",
        color: colors.primaryDark,
    },
});