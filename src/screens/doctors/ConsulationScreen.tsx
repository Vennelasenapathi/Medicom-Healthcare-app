import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { modes } from "@/data/modes";
import BackButton from "@/components/home/BackButton";
import AppButton from "@/components/common/AppButton";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

export default function ConsultationScreen({
  navigation,
  route,
}: any) {
  const { doctor, consultation: previousConsultation } =
    route.params || {};

  const [mode, setMode] = useState(
    previousConsultation?.type || "Video Consultation"
  );

  const handleNext = () => {
    const consultation = {
      type: mode,
      date:
        previousConsultation?.date ||
        "10 September 2026",
      time:
        previousConsultation?.time ||
        "10:00 AM",
      reason:
        previousConsultation?.reason ||
        "General Consultation",
    };

    navigation.navigate("PaymentDetails", {
      doctor,
      consultation,
    });
  };

  return (
    <View
      style={[
        globalStyles.container,
        styles.container,
      ]}
    >
      {/* HEADER */}

      <View style={globalStyles.header}>
        <BackButton
          onPress={() => navigation.goBack()}
        />

        <Text style={globalStyles.title}>
          Consultation
        </Text>

        <View style={styles.headerSpace} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* CONSULTATION MODE */}

        <Text style={styles.label}>
          Select Consultation Mode
        </Text>

        <Text style={globalStyles.subtitle}>
          Choose how you would like to consult with
          your doctor.
        </Text>

        {modes.map((item) => {
          const selected = mode === item.title;

          return (
            <Pressable
              key={item.title}
              onPress={() => setMode(item.title)}
              style={[
                styles.mode,
                selected && styles.activeMode,
              ]}
            >
              {/* ICON */}

              <View
                style={[
                  styles.iconBox,
                  selected && styles.activeIconBox,
                ]}
              >
                <Ionicons
                  name={item.icon as any}
                  size={27}
                  color={colors.primaryDark}
                />
              </View>

              {/* TEXT */}

              <View style={styles.modeText}>
                <Text style={styles.modeTitle}>
                  {item.title}
                </Text>

                <Text style={styles.modeSubtitle}>
                  {item.subtitle}
                </Text>
              </View>

              {/* RADIO */}

              <Ionicons
                name={
                  selected
                    ? "radio-button-on"
                    : "radio-button-off"
                }
                size={24}
                color={
                  selected
                    ? colors.primaryDark
                    : "#A7ACB5"
                }
              />
            </Pressable>
          );
        })}

        {/* INFORMATION */}

        <View style={[globalStyles.row, styles.infoBox]}>
          <Ionicons
            name="information-circle-outline"
            size={23}
            color={colors.primaryDark}
          />

          <Text style={styles.infoText}>
            You can upload your previous prescriptions,
            medical reports or other relevant documents.
          </Text>
        </View>

        {/* NEXT BUTTON */}

        <View style={styles.button}>
          <AppButton
            title="Next ›"
            onPress={handleNext}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    backgroundColor: colors.white,
  },

  headerSpace: {
    width: 46,
  },

  content: {
    paddingBottom: 35,
  },

  label: {
    marginTop: 20,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  mode: {
    minHeight: 92,
    marginTop: 18,
    marginBottom: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: "#F7F9FC",
    borderWidth: 1.5,
    borderColor: "transparent",
    ...globalStyles.row,
  },

  activeMode: {
    borderColor: colors.primaryDark,
    backgroundColor: "#F8FAFF",
  },

  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  activeIconBox: {
    backgroundColor: "#EAF0FF",
  },

  modeText: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },

  modeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  modeSubtitle: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textSecondary,
  },

  infoBox: {
    marginTop: 18,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#F5F8FF",
    alignItems: "flex-start",
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },

  button: {
    marginTop: 28,
    marginBottom: 15,
  },
});