
import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  StatusBar,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import BackButton from "@/components/home/BackButton";
import AppButton from "@/components/common/AppButton";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

type AmbulanceState = "request" | "confirm" | "requested";

export default function AmbulanceScreen({ navigation }: any) {
  const [screen, setScreen] = useState<AmbulanceState>("request");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  // Get actual phone location and convert it into an address
  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError("");
      setAddress("");

      const servicesEnabled =
        await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        setError("Please enable GPS/location services on your phone.");
        return;
      }

      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (permission.status !== "granted") {
        setError("Location permission denied. Please allow location access.");
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      const { latitude, longitude } = currentLocation.coords;

      // Convert actual GPS coordinates into a readable address
      const result = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (result.length === 0) {
        setError(
          "Could not find your address. Please refresh your location."
        );
        return;
      }

      const place = result[0];

      const addressParts = [
        place.name,
        place.street,
        place.subregion,
        place.district,
        place.city,
        place.region,
        place.postalCode,
        place.country,
      ];

      const uniqueParts = [
        ...new Set(addressParts.filter(Boolean)),
      ];

      if (uniqueParts.length === 0) {
        setError("Address unavailable. Please try again.");
        return;
      }

      setAddress(uniqueParts.join(", "));
    } catch (err) {
      console.log("Location error:", err);
      setError(
        "Unable to detect your address. Check your internet and GPS."
      );
    } finally {
      setLoading(false);
    }
  };

  // Automatically detect location when screen opens
  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <View style={globalStyles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      {/* Header */}
      <View style={[globalStyles.header, styles.header]}>
        <BackButton onPress={() => navigation.goBack()} />
        <Text style={globalStyles.title}>Ambulance</Text>
        <View style={styles.headerSpace} />
      </View>

      {/* Current Location */}
      <View style={styles.locationPanel}>
        <View style={styles.locationIcon}>
          <Ionicons
            name="location"
            size={35}
            color={colors.primaryDark}
          />
        </View>

        <Text style={styles.panelTitle}>
          Your Current Location
        </Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={colors.primaryDark}
            />
            <Text style={styles.description}>
              Detecting your current address...
            </Text>
          </View>
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <Text style={styles.addressText}>
              {address}
            </Text>

            <View style={styles.detectedBadge}>
              <View style={styles.greenDot} />
              <Text style={styles.detectedText}>
                Location detected
              </Text>
            </View>
          </>
        )}

        <Pressable
          style={styles.refreshButton}
          onPress={getCurrentLocation}
          disabled={loading}
        >
          <Ionicons
            name="refresh"
            size={17}
            color={colors.primaryDark}
          />
          <Text style={styles.refreshText}>
            Refresh Location
          </Text>
        </Pressable>
      </View>

      {/* Request Ambulance */}
      {screen === "request" && (
        <View style={styles.bottomCard}>
          <AppButton
            title="Request Ambulance"
            onPress={() => {
              if (address && !loading) {
                setScreen("confirm");
              }
            }}
          />

          <Pressable
            style={styles.emergencyButton}
            onPress={() =>
              navigation.navigate("Drivercall", {
                callType: "emergency",
              })
            }
          >
            <Text style={styles.emergencyText}>
              Call Emergency
            </Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.primaryDark}
            />
          </Pressable>
        </View>
      )}

      {/* Confirm Location */}
      {screen === "confirm" && (
        <View style={styles.sheet}>
          <Text style={globalStyles.sectionTitle}>
            Confirm your pickup location
          </Text>

          <View style={globalStyles.divider} />

          <View style={styles.addressRow}>
            <Ionicons
              name="location"
              size={23}
              color="#FF5A5F"
            />
            <Text style={styles.confirmAddress}>
              {address}
            </Text>
          </View>

          <AppButton
            title="Confirm Location"
            onPress={() => setScreen("requested")}
          />

          <Pressable
            style={styles.backButton}
            onPress={() => setScreen("request")}
          >
            <Text style={styles.refreshText}>Go Back</Text>
          </Pressable>
        </View>
      )}

      {/* Request Status */}
      {screen === "requested" && (
        <View style={styles.sheet}>
          <View style={styles.successIcon}>
            <Ionicons
              name="checkmark"
              size={28}
              color={colors.white}
            />
          </View>

          <Text style={globalStyles.sectionTitle}>
            Pickup Location Confirmed!
          </Text>

          <Text style={styles.confirmAddress}>
            {address}
          </Text>

          <View style={styles.waitingCard}>
            <Ionicons
              name="time-outline"
              size={23}
              color={colors.primaryDark}
            />
            <Text style={styles.waitingText}>
              Waiting for ambulance assignment.
            </Text>
          </View>

          <Text style={styles.description}>
            Your pickup location is confirmed on this device.
            An ambulance has not yet been dispatched.
          </Text>

          <Pressable
            style={styles.emergencyButton}
            onPress={() =>
              navigation.navigate("Drivercall", {
                callType: "emergency",
              })
            }
          >
            <Text style={styles.emergencyText}>
              Call Emergency
            </Text>
            <Ionicons
              name="call-outline"
              size={18}
              color={colors.primaryDark}
            />
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

  headerSpace: {
    width: 46,
  },

  locationPanel: {
    minHeight: 300,
    marginHorizontal: 14,
    marginTop: 12,
    padding: 22,
    borderRadius: 16,
    backgroundColor: "#F1F5FF",
    alignItems: "center",
    justifyContent: "center",
  },

  locationIcon: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: "#DCE7FF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  panelTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryDark,
    textAlign: "center",
  },

  loadingContainer: {
    alignItems: "center",
    marginTop: 20,
  },

  description: {
    marginTop: 12,
    fontSize: 13,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: "center",
  },

  addressText: {
    marginTop: 15,
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
    textAlign: "center",
  },

  errorText: {
    marginTop: 15,
    fontSize: 13,
    lineHeight: 20,
    color: "#DC2626",
    textAlign: "center",
  },

  detectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: colors.white,
  },

  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22C55E",
    marginRight: 7,
  },

  detectedText: {
    fontSize: 12,
    color: "#16A34A",
    fontWeight: "600",
  },

  refreshButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 18,
    padding: 10,
  },

  refreshText: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primaryDark,
  },

  bottomCard: {
    marginHorizontal: 14,
    marginTop: 20,
    paddingBottom: 25,
  },

  sheet: {
    marginHorizontal: 14,
    marginTop: 20,
    paddingBottom: 25,
  },

  addressRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 20,
    gap: 12,
  },

  confirmAddress: {
    flex: 1,
    fontSize: 13,
    lineHeight: 21,
    color: colors.textSecondary,
  },

  emergencyButton: {
    height: 60,
    marginTop: 12,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.white,
    borderColor: colors.primaryDark,
    borderWidth: 1,
  },

  emergencyText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primaryDark,
  },

  backButton: {
    alignItems: "center",
    padding: 14,
  },

  successIcon: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#22C55E",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  waitingCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#F1F5FF",
  },

  waitingText: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
  },
});
