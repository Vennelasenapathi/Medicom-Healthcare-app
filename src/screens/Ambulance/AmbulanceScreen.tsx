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

type AmbulanceState = "request" | "confirm" | "onWay";

export default function AmbulanceScreen({ navigation }: any) {
  const [screen, setScreen] = useState<AmbulanceState>("request");

  const handleRequest = () => { setScreen("confirm"); };

  const handleConfirm = () => {
    setScreen("onWay");
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
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

          {/* User location circle */}
          {screen !== "onWay" && (
            <View style={styles.locationCircle}>
              <View style={styles.userMarker}>
                <Ionicons
                  name="location"
                  size={23}
                  color="#2867FF"
                />
              </View>
            </View>
          )}

          {/* User location for on-way screen */}
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
                  color="#2867FF"
                />
              </View>
            </>
          )}

          {/* Hospital / ambulance markers */}
          {screen !== "onWay" && (
            <View>
          <View style={styles.markerOne}>
            <Ionicons name="add" size={17} color="#fff" />
          </View>

          <View style={styles.markerTwo}>
            <Ionicons name="add" size={17} color="#fff" />
          </View>

          <View style={styles.markerThree}>
            <Ionicons name="add" size={17} color="#fff" />
          </View>
          </View>
          )}

          {/* Red hospital marker */}

          {screen === "onWay" && (
            <View style={styles.markerOne}>
              <Ionicons name="add" size={18} color="#fff" />
            </View>
          )}



          {/* On way message */}
          {screen === "onWay" && (
            <View style={styles.onWayBadge}>
              <Text style={styles.onWayText}>
                Ambulance is on the way!
              </Text>
            </View>
          )}
        </ImageBackground>
      </View>

      {/* Bottom Card */}
      {screen === "request" && (
        <View style={styles.bottomCard}>

          <Pressable
            style={styles.primaryButton}
            onPress={handleRequest}
          >
            <Text style={styles.primaryButtonText}>
              Request Ambulance
            </Text>

            <Ionicons
              name="chevron-forward"
              size={17}
              color="#fff"
            />
          </Pressable>

          <Pressable style={styles.emergencyButton}>
            <Text style={styles.emergencyText}>
              Call Emergency
            </Text>

            <Ionicons
              name="chevron-forward"
              size={17}
              color="#2867FF"
            />
          </Pressable>

        </View>
      )}

      {screen === "confirm" && (
        <View style={styles.confirmCard}>

          <Text style={styles.cardTitle}>
            Confirm your address
          </Text>

          <View style={styles.divider} />

          <View style={styles.addressRow}>
            <Ionicons
              name="location"
              size={21}
              color="#FF5A5F"
            />

            <Text style={styles.addressText}>
              2680 Kolpuri Campup Rd #102{"\n"}
              Aaram Nagar, Mumbai, 22314
            </Text>
          </View>

          <Pressable
            style={styles.primaryButton}
            onPress={handleConfirm}
          >
            <Text style={styles.primaryButtonText}>
              Confirm Location
            </Text>

            <Ionicons
              name="chevron-forward"
              size={17}
              color="#fff"
            />
          </Pressable>

        </View>
      )}

      {screen === "onWay" && (
        <View style={styles.onWayCard}>

          <Text style={styles.cardTitle}>
            Pickup Location Confirmed!
          </Text>

          <Text style={styles.confirmedAddress}>
            2680 Kolpuri Campup Rd #102 Aaram Nagar,
            {"\n"}
            Mumbai, 22314
          </Text>

          <Text style={styles.driverMessage}>
            *Please stay at the pickup location. The driver
            {"\n"}
            may contact you if needed.
          </Text>

          <Pressable style={styles.driverButton}>
            <Text style={styles.driverButtonText}>
              Call Driver
            </Text>

            <Ionicons
              name="call"
              size={17}
              color="#fff"
            />
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /* =========================
     HEADER
  ========================= */

  header: {
    height: 105,
    paddingHorizontal: 20,
    paddingTop: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  backButton: {
    width: 46,
    height: 46,
    borderRadius: 11,
    backgroundColor: "#2867FF",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#011133",
  },

  headerSpace: {
    width: 46,
  },

  /* =========================
     MAP
  ========================= */

  mapContainer: {
    height: 600,
    marginHorizontal: 12,

    borderRadius: 14,
  },

  map: {
    flex: 1,
    width: "100%",
    height: 700,
  },

  mapImage: {
    resizeMode: "cover",
  },

  /* =========================
     USER LOCATION
  ========================= */

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

  /* =========================
     RED LOCATION MARKERS
  ========================= */

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

  /* =========================
    ON WAY ROUTE
 ========================= */

  route: {
    position: "absolute",
    left: 80,
    top: 280,
    width: 195,
    height: 115,
  },

  /* From blue location → LEFT */
  routeLine1: {
    position: "absolute",
    left: 0,
    top: 10,
    width: 82,
    height: 6,
    backgroundColor: "#2867FF",
    borderRadius: 4,
  },

  /* LEFT → DOWN */
  routeLine2: {
    position: "absolute",
    left: 0,
    top: 10,
    width: 6,
    height: 100,
    backgroundColor: "#2867FF",
    borderRadius: 4,
  },

  /* DOWN → RIGHT / SLIGHTLY DOWN */
  routeLine3: {
    position: "absolute",
    left: 0,
    top: 117,
    width: 243,
    height: 6,
    backgroundColor: "#2867FF",
    borderRadius: 4,
    transform: [{ rotate: "6deg" }],
  },

  /* RIGHT → UP */
  routeLine4: {
    position: "absolute",
    right: -50,
    top: 0,
    width: 6,
    height: 140,
    backgroundColor: "#2867FF",
    borderRadius: 4,
  },

  /* Blue location marker */
  onWayUserMarker: {
    position: "absolute",
    left: 148,
    top: 257,
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
  },

  ambulanceMarker: {
    position: "absolute",
    right: 27,
    top: 164,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  /* =========================
     ON WAY BADGE
  ========================= */

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

  /* =========================
     REQUEST SCREEN
  ========================= */

  bottomCard: {
    marginHorizontal: 14,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
  },

  primaryButton: {
    height: 60,
    borderRadius: 13,
    backgroundColor: "#2867FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  emergencyButton: {
    height: 60,
    marginTop: 12,
    borderRadius: 13,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  emergencyText: {
    color: "#2867FF",
    fontSize: 15,
    fontWeight: "700",
  },

  /* =========================
     CONFIRM CARD
  ========================= */

  confirmCard: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 0,
    backgroundColor: "#FFFFFF",
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
    color: "#011133",
  },

  divider: {
    height: 1,
    backgroundColor: "#E8ECF2",
    marginVertical: 15,
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 17,
  },

  addressText: {
    marginLeft: 12,
    color: "#8A919E",
    fontSize: 13,
    lineHeight: 19,
    flex: 1,
  },

  /* =========================
     ON WAY CARD
  ========================= */

  onWayCard: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 0,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 22,
    elevation: 10,
  },

  confirmedAddress: {
    marginTop: 10,
    color: "#9A9FA8",
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
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});