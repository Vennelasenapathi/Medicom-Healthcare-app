import React, { useState } from "react";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackButton from "@/components/home/BackButton";
import AppButton from "@/components/common/AppButton";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

type AmbulanceState = "request" | "confirm" | "onWay";

const Marker = ({ style }: { style: object }) => (
  <View style={[styles.marker, style]}>
    <Ionicons name="add" size={17} color={colors.white} />
  </View>
);

export default function AmbulanceScreen({ navigation }: any) {
  const [screen, setScreen] = useState<AmbulanceState>("request");

  return (
    <View style={globalStyles.container}>
      {/* Header */}
      <View style={[globalStyles.header, styles.header]}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={globalStyles.title}>Ambulance</Text>
        <View style={styles.headerSpace} />
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <ImageBackground
          source={require("../../../assets/images/medicom/ambulancebackground.png")}
          style={styles.map}
          imageStyle={styles.mapImage}
        >
          {screen !== "onWay" ? (
            <>
              <View style={[styles.locationCircle, globalStyles.center]}>
                <Ionicons
                  name="location"
                  size={23}
                  color={colors.primaryDark}
                />
              </View>
              <Marker style={styles.markerOne} />
              <Marker style={styles.markerTwo} />
              <Marker style={styles.markerThree} />
            </>
          ) : (
            <>
              <View style={styles.route}>
                <View style={[styles.routeLine, styles.route1]} />
                <View style={[styles.routeLine, styles.route2]} />
                <View style={[styles.routeLine, styles.route3]} />
                <View style={[styles.routeLine, styles.route4]} />
              </View>

              <View style={[styles.onWayUserMarker, globalStyles.center]}>
                <Ionicons
                  name="location"
                  size={22}
                  color={colors.primaryDark}
                />
              </View>    
              <Marker style={styles.markerOne} />
              <View style={styles.onWayBadge}>
                <Text style={styles.onWayText}>
                  Ambulance is on the way!
                </Text>
              </View>
            </>
          )}
        </ImageBackground>
      </View>

      {/* Request */}
      {screen === "request" && (
        <View style={styles.bottomCard}>
          <AppButton
            title="Request Ambulance"
            onPress={() => setScreen("confirm")}
          />
          <Pressable style={[styles.emergencyButton, globalStyles.center]}>
            <Text style={styles.emergencyText}>Call Emergency</Text>
            <Ionicons
              name="chevron-forward"
              size={17}
              color={colors.primaryDark}
            />
          </Pressable>
        </View>
      )}

      {/* Confirm */}
      {screen === "confirm" && (
        <View style={styles.sheet}>
          <Text style={globalStyles.sectionTitle}>Confirm your address</Text>
          <View style={globalStyles.divider} />
          <View style={styles.addressRow}>
            <Ionicons name="location" size={21} color="#FF5A5F" />
            <Text style={styles.addressText}>
              {"2680 Kolpuri Campup Rd #102\n"}
              Aaram Nagar, Mumbai, 22314
            </Text>
          </View>
          <AppButton
            title="Confirm Location"
            onPress={() => setScreen("onWay")}
          />
        </View>
      )}

      {/* On the way */}
      {screen === "onWay" && (
        <View style={styles.sheet}>
          <Text style={globalStyles.sectionTitle}>
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
          <Pressable style={styles.driverButton} onPress={() => navigation.navigate("Drivercall")}>
            <Text style={globalStyles.buttonText}>Call Driver</Text>
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
    paddingTop: 38,
    backgroundColor: colors.white,
  },

  headerSpace: { width: 46,},

  mapContainer: {
    height: 510,
    marginHorizontal: 12,
    borderRadius: 14,
    overflow: "hidden",
  },

  map: {
    flex: 1,
    width: "100%",
    height: 500,
  },

  mapImage: {resizeMode: "cover", },

  locationCircle: {
    position: "absolute",
    width: 165,
    height: 165,
    left: 95,
    top: 105,
    borderRadius: 83,
    backgroundColor: "rgba(40,103,255,0.18)",
  },

  marker: {
    position: "absolute",
    width: 27,
    height: 27,
    borderRadius: 14,
    backgroundColor: "#FF5A5F",
    alignItems: "center",
    justifyContent: "center",
  },

  markerOne: {
    right: 49,
    top: 155,
  },

  markerTwo: {
    left: 70,
    top: 280,
  },

  markerThree: {
    right: 45,
    top: 395,
  },

  route: {
    position: "absolute",
    left: 80,
    top: 180,
    width: 195,
    height: 115,
  },

  routeLine: {
    position: "absolute",
    backgroundColor: colors.primaryDark,
    borderRadius: 4,
  },

  route1: {
    left: 0,
    top: 10,
    width: 85,
    height: 6,
  },

  route2: {
    left: 0,
    top: 10,
    width: 6,
    height: 110,
  },

  route3: {
    left: 0,
    top: 125,
    width: 243,
    height: 6,
    transform: [{ rotate: "6deg" }],
  },

  route4: {
    right: -50,
    top: 0,
    width: 6,
    height: 140,
  },

  onWayUserMarker: {
    position: "absolute",
    left: 148,
    top: 165,
    width: 42,
    height: 42,
  },

  onWayBadge: {
    position: "absolute",
    top: 22,
    alignSelf: "center",
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 7,
    backgroundColor: "#FFD9DA",
  },

  onWayText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FF3035",
  },

  bottomCard: {
    marginHorizontal: 14,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 30,
    backgroundColor: colors.white,
  },

  sheet: {
    marginHorizontal: 14,
    marginTop: 5,
    paddingTop: 7,
    paddingBottom: 20,
    backgroundColor: colors.white,
  },

  emergencyButton: {
    height: 60,
    marginTop: 12,
    borderRadius: 13,
    flexDirection:"row",
    backgroundColor: colors.white,
  },

  emergencyText: {
    marginRight: 7,
    fontSize: 15,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 17,
  },

  addressText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },

  confirmedAddress: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },

  driverMessage: {
    marginTop: 9,
    fontSize: 12,
    lineHeight: 17,
    color: "#FF3B3F",
  },

  driverButton: {
    height: 60,
    marginTop: 7,
    borderRadius: 13,
    backgroundColor: "#FF3035",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});