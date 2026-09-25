import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

type AmbulanceState = "request" | "confirm" | "onWay";

export default function AmbulanceScreen({ navigation }: any) {
  const [screen, setScreen] = useState<AmbulanceState>("request");
  const handleRequest = () => setScreen("confirm");
  const handleConfirm = () => setScreen("onWay");

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color={colors.white} />
        </Pressable>

        <Text style={styles.headerTitle}>Ambulance</Text>

        <View style={styles.headerSpace} />
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <ImageBackground
          source={require("../../../assets/images/medicom/ambulancebackground.png")}
          style={styles.map}
          imageStyle={styles.mapImage}
        >
          {screen !== "onWay" && (
            <View style={styles.locationCircle}>
              <View style={styles.userMarker}>
                <Ionicons
                  name="location"
                  size={23}
                  color={colors.primaryDark}
                />
              </View>
            </View>
          )}

          {screen === "onWay" && (
            <>
              <View style={styles.route}>
                <View style={styles.routeLine1} />
                <View style={styles.routeLine2} />
                <View style={styles.routeLine3} />
                <View style={styles.routeLine4} />
              </View>

              <View style={styles.onWayUserMarker}>
                <Ionicons
                  name="location"
                  size={22}
                  color={colors.primaryDark}
                />
              </View>
            </>
          )}

          {screen !== "onWay" && (
            <>
              <View style={styles.markerOne}>
                <Ionicons name="add" size={17} color={colors.white} />
              </View>

              <View style={styles.markerTwo}>
                <Ionicons name="add" size={17} color={colors.white} />
              </View>

              <View style={styles.markerThree}>
                <Ionicons name="add" size={17} color={colors.white} />
              </View>
            </>
          )}

          {screen === "onWay" && (
            <View style={styles.markerOne}>
              <Ionicons name="add" size={18} color={colors.white} />
            </View>
          )}

          {screen === "onWay" && (
            <View style={styles.onWayBadge}>
              <Text style={styles.onWayText}>
                Ambulance is on the way!
              </Text>
            </View>
          )}
        </ImageBackground>
      </View>

      {/* Request Ambulance */}
      {screen === "request" && (
        <View style={styles.bottomCard}>
          <Pressable style={globalStyles.button} onPress={handleRequest}>
            <Text style={globalStyles.buttonText}>Request Ambulance</Text>
            <Ionicons
              name="chevron-forward"
              size={17}
              color={colors.white}
            />
          </Pressable>

          <Pressable style={styles.emergencyButton}>
            <Text style={styles.emergencyText}>Call Emergency</Text>
            <Ionicons
              name="chevron-forward"
              size={17}
              color={colors.primaryDark}
            />
          </Pressable>
        </View>
      )}

      {/* Confirm Address */}
      {screen === "confirm" && (
        <View style={styles.bottomSheet}>
          <Text style={styles.cardTitle}>Confirm your address</Text>

          <View style={styles.divider} />

          <View style={styles.addressRow}>
            <Ionicons name="location" size={21} color="#FF5A5F" />

            <Text style={styles.addressText}>
              {"2680 Kolpuri Campup Rd #102\n"}
              Aaram Nagar, Mumbai, 22314
            </Text>
          </View>

          <Pressable style={globalStyles.button} onPress={handleConfirm}>
            <Text style={globalStyles.buttonText}>Confirm Location</Text>
            <Ionicons
              name="chevron-forward"
              size={17}
              color={colors.white}
            />
          </Pressable>
        </View>
      )}

      {/* Ambulance On The Way */}
      {screen === "onWay" && (
        <View style={styles.bottomSheet}>
          <Text style={styles.cardTitle}>
            Pickup Location Confirmed!
          </Text>

          <Text style={styles.confirmedAddress}>
            {"2680 Kolpuri Campup Rd #102 Aaram Nagar,\n"}
            Mumbai, 22314
          </Text>

          <Text style={styles.driverMessage}>
            {"*Please stay at the pickup location. The driver\n"}
            may contact you if needed.
          </Text>

          <Pressable
            style={styles.driverButton}
            onPress={() => navigation.navigate("Drivercall")}
          >
            <Text style={styles.driverButtonText}>Call Driver</Text>

            <Ionicons name="call" size={17} color={colors.white} />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 105,
    paddingHorizontal: 20,
    paddingTop: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 11,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  headerSpace: {
    width: 46,
  },

  mapContainer: {
    height: 600,
    marginHorizontal: 12,
    borderRadius: 14,
    overflow: "hidden",
  },

  map: {
    flex: 1,
    width: "100%",
    height: 700,
  },

  mapImage: {
    resizeMode: "cover",
  },

  locationCircle: {
    position: "absolute",
    width: 165,
    height: 165,
    borderRadius: 83,
    backgroundColor: "rgba(40,103,255,0.18)",
    left: 95,
    top: 205,
    alignItems: "center",
    justifyContent: "center",
  },

  userMarker: {
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  markerOne: {
    position: "absolute",
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#FF5A5F",
    alignItems: "center",
    justifyContent: "center",
    right: 49,
    top: 255,
  },

  markerTwo: {
    position: "absolute",
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#FF5A5F",
    alignItems: "center",
    justifyContent: "center",
    left: 70,
    top: 380,
  },

  markerThree: {
    position: "absolute",
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#FF5A5F",
    alignItems: "center",
    justifyContent: "center",
    right: 45,
    top: 500,
  },

  route: {
    position: "absolute",
    left: 80,
    top: 280,
    width: 195,
    height: 115,
  },

  routeLine1: {
    position: "absolute",
    left: 0,
    top: 10,
    width: 82,
    height: 6,
    backgroundColor: colors.primaryDark,
    borderRadius: 4,
  },

  routeLine2: {
    position: "absolute",
    left: 0,
    top: 10,
    width: 6,
    height: 100,
    backgroundColor: colors.primaryDark,
    borderRadius: 4,
  },

  routeLine3: {
    position: "absolute",
    left: 0,
    top: 117,
    width: 243,
    height: 6,
    backgroundColor: colors.primaryDark,
    borderRadius: 4,
    transform: [{ rotate: "6deg" }],
  },

  routeLine4: {
    position: "absolute",
    right: -50,
    top: 0,
    width: 6,
    height: 140,
    backgroundColor: colors.primaryDark,
    borderRadius: 4,
  },

  onWayUserMarker: {
    position: "absolute",
    left: 148,
    top: 257,
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  onWayBadge: {
    position: "absolute",
    top: 22,
    alignSelf: "center",
    backgroundColor: "#FFD9DA",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 7,
  },

  onWayText: {
    color: "#FF3035",
    fontSize: 13,
    fontWeight: "700",
  },

  bottomCard: {
    marginHorizontal: 14,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: colors.white,
  },

  emergencyButton: {
    height: 60,
    marginTop: 12,
    borderRadius: 13,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  emergencyText: {
    color: colors.primaryDark,
    fontSize: 15,
    fontWeight: "700",
  },

  bottomSheet: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 22,
    elevation: 10,
  },

  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginVertical: 15,
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 17,
  },

  addressText: {
    flex: 1,
    marginLeft: 12,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },

  confirmedAddress: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },

  driverMessage: {
    marginTop: 9,
    color: "#FF3B3F",
    fontSize: 12,
    lineHeight: 17,
  },

  driverButton: {
    height: 60,
    marginTop: 17,
    borderRadius: 13,
    backgroundColor: "#FF3035",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  driverButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
});