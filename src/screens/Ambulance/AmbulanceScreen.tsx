import React, { useState } from "react";
import {
  Dimensions,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, {
  Circle,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";

const { width } = Dimensions.get("window");

type AmbulanceState = "request" | "confirm" | "onWay";

const USER_LOCATION = {
  latitude: 19.076,
  longitude: 72.8777,
};

const AMBULANCE_LOCATION = {
  latitude: 19.0795,
  longitude: 72.884,
};

const HOSPITAL_1 = {
  latitude: 19.078,
  longitude: 72.888,
};

const HOSPITAL_2 = {
  latitude: 19.072,
  longitude: 72.884,
};

const ROUTE = [
  {
    latitude: 19.076,
    longitude: 72.8777,
  },
  {
    latitude: 19.077,
    longitude: 72.88,
  },
  {
    latitude: 19.0795,
    longitude: 72.884,
  },
  {
    latitude: 19.0785,
    longitude: 72.887,
  },
];

export default function AmbulanceScreen({ navigation }: any) {
  const [screen, setScreen] =
    useState<AmbulanceState>("request");

  const handleBack = () => {
    if (screen === "request") {
      navigation.goBack();
    } else if (screen === "confirm") {
      setScreen("request");
    } else {
      setScreen("confirm");
    }
  };

  const handleRequest = () => {
    setScreen("confirm");
  };

  const handleConfirm = () => {
    setScreen("onWay");
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.backButton}
          onPress={handleBack}
        >
          <Ionicons
            name="chevron-back"
            size={23}
            color="#FFFFFF"
          />
        </Pressable>

        <Text style={styles.headerTitle}>
          Ambulance
        </Text>

        <View style={styles.headerSpace} />
      </View>

      {/* MAP */}
      <View style={styles.mapContainer}>
        <MapView
          provider={
            Platform.OS === "android"
              ? PROVIDER_GOOGLE
              : undefined
          }
          style={styles.map}
          initialRegion={{
            latitude: USER_LOCATION.latitude,
            longitude: USER_LOCATION.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          pitchEnabled={false}
        >
          {/* SEARCH / LOCATION RADIUS */}
          {screen !== "onWay" && (
            <Circle
              center={USER_LOCATION}
              radius={700}
              fillColor="rgba(70,130,220,0.25)"
              strokeColor="rgba(70,130,220,0.35)"
              strokeWidth={1}
            />
          )}

          {/* USER LOCATION */}
          <Marker coordinate={USER_LOCATION}>
            <View style={styles.userMarker}>
              <View style={styles.userMarkerDot} />
            </View>
          </Marker>

          {/* AMBULANCE / HOSPITAL MARKERS */}
          <Marker coordinate={HOSPITAL_1}>
            <View style={styles.hospitalMarker}>
              <Ionicons
                name="add"
                size={17}
                color="#FFFFFF"
              />
            </View>
          </Marker>

          <Marker coordinate={HOSPITAL_2}>
            <View style={styles.hospitalMarker}>
              <Ionicons
                name="add"
                size={17}
                color="#FFFFFF"
              />
            </View>
          </Marker>

          {/* ON THE WAY ROUTE */}
          {screen === "onWay" && (
            <>
              <Marker coordinate={AMBULANCE_LOCATION}>
                <View style={styles.ambulanceMarker}>
                  <Ionicons
                    name="location"
                    size={17}
                    color="#FFFFFF"
                  />
                </View>
              </Marker>

              <Polyline
                coordinates={ROUTE}
                strokeColor="#2867FF"
                strokeWidth={5}
                lineCap="round"
                lineJoin="round"
              />
            </>
          )}
        </MapView>

        {/* ON THE WAY LABEL */}
        {screen === "onWay" && (
          <View style={styles.onWayLabel}>
            <Text style={styles.onWayText}>
              Ambulance is on the way!
            </Text>
          </View>
        )}

        {/* REQUEST SCREEN */}
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
                size={18}
                color="#FFFFFF"
              />
            </Pressable>

            <Pressable style={styles.emergencyButton}>
              <Text style={styles.emergencyText}>
                Call Emergency
              </Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#2867FF"
              />
            </Pressable>
          </View>
        )}

        {/* CONFIRM ADDRESS */}
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
                color="#FF5A61"
              />

              <Text style={styles.address}>
                2680 Kolpuri Campup Rd #102{"\n"}
                Aram Nagar, Mumbai, 22314
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
                size={18}
                color="#FFFFFF"
              />
            </Pressable>
          </View>
        )}

        {/* ON THE WAY */}
        {screen === "onWay" && (
          <View style={styles.onWayCard}>
            <Text style={styles.cardTitle}>
              Pickup Location Confirmed!
            </Text>

            <Text style={styles.smallAddress}>
              2680 Kolpuri Campup Rd #102 Aram Nagar,
              {"\n"}Mumbai, 22314
            </Text>

            <Text style={styles.warning}>
              *Please stay at the pickup location. The driver
              {"\n"}may contact you if needed.
            </Text>

            <Pressable style={styles.driverButton}>
              <Text style={styles.driverButtonText}>
                Call Driver
              </Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#FFFFFF"
              />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  /* HEADER */

  header: {
    height: 96,
    paddingTop: 28,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 9,
    backgroundColor: "#2867FF",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#061838",
  },

  headerSpace: {
    width: 40,
  },

  /* MAP */

  mapContainer: {
    flex: 1,
    position: "relative",
    overflow: "hidden",
  },

  map: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
},

  /* USER MARKER */

  userMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2867FF",
    borderWidth: 6,
    borderColor: "rgba(40,103,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  userMarkerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
  },

  /* HOSPITAL */

  hospitalMarker: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#FF555A",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },

  ambulanceMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#2867FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

  /* REQUEST CARD */

  bottomCard: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  primaryButton: {
    height: 52,
    borderRadius: 11,
    backgroundColor: "#2867FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  emergencyButton: {
    height: 48,
    marginTop: 5,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  emergencyText: {
    color: "#2867FF",
    fontSize: 13,
    fontWeight: "700",
  },

  /* CONFIRM CARD */

  confirmCard: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 9,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  cardTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#061838",
  },

  divider: {
    height: 1,
    backgroundColor: "#E7EBF0",
    marginVertical: 11,
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 13,
  },

  address: {
    flex: 1,
    marginLeft: 10,
    fontSize: 11,
    lineHeight: 17,
    color: "#8B929B",
  },

  /* ON THE WAY */

  onWayLabel: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    backgroundColor: "#FFE1E1",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 6,
  },

  onWayText: {
    color: "#F02D32",
    fontSize: 11,
    fontWeight: "700",
  },

  onWayCard: {
    position: "absolute",
    left: 10,
    right: 10,
    bottom: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 9,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  smallAddress: {
    fontSize: 10,
    lineHeight: 15,
    color: "#9A9FA7",
    marginTop: 6,
  },

  warning: {
    fontSize: 10,
    lineHeight: 15,
    color: "#FF3D42",
    marginTop: 7,
    marginBottom: 12,
  },

  driverButton: {
    height: 52,
    borderRadius: 11,
    backgroundColor: "#FF3036",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  driverButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
});