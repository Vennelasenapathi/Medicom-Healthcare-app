import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import BackButton from "@/components/home/BackButton";
import AppButton from "@/components/common/AppButton";
import { colors } from "@/constants/colors";

export default function ConsultationScreen({
  navigation,
  route,
}: any) {
  const { doctor, consultation: previousConsultation } =
    route.params || {};

  const [mode, setMode] = useState(
    previousConsultation?.type || "Video Consultation"
  );

  const modes = [
    {
      title: "Video Consultation",
      subtitle: "Best for follow-ups",
      icon: "videocam-outline",
      screen: "VideoCall",
    },
    {
      title: "Chat Consultation",
      subtitle: "Quick questions & guidance",
      icon: "chatbubble-outline",
      screen: "Chat",
    },
    {
      title: "In-Person Consultation",
      subtitle: "Visit the doctor at hospital or clinic",
      icon: "person-outline",
      screen: "AudioCall",
    },
  ];

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
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <BackButton
          onPress={() => navigation.goBack()}
        />

        <Text style={styles.title}>
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

        <Text style={styles.description}>
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

        {/* MEDICAL RECORDS */}
        <View style={styles.recordHeader}>
          <Text style={styles.label}>
            Medical Records
          </Text>

          <Text style={styles.optional}>
            Optional
          </Text>
        </View>

        <Pressable style={styles.upload}>
          <View style={styles.uploadIcon}>
            <Ionicons
              name="document-text-outline"
              size={30}
              color={colors.primaryDark}
            />
          </View>

          <Text style={styles.uploadText}>
            Upload medical documents
          </Text>

          <Text style={styles.uploadSub}>
            PDF, JPG, or PNG
          </Text>
        </Pressable>

        {/* INFORMATION */}
        <View style={styles.infoBox}>
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
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: colors.white,
  },

  header: {
    height: 105,
    paddingTop: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerSpace: {
    width: 46,
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.textPrimary,
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

  description: {
    marginBottom: 18,
    fontSize: 14,
    lineHeight: 21,
    color: colors.textSecondary,
  },

  mode: {
    minHeight: 92,
    marginBottom: 14,
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: "#F7F9FC",
    borderWidth: 1.5,
    borderColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
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

  recordHeader: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  optional: {
    marginTop: 12,
    marginLeft: 8,
    fontSize: 13,
    color: colors.textSecondary,
  },

  upload: {
    height: 145,
    marginTop: 5,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: colors.primaryLight,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFBFF",
  },

  uploadIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EAF0FF",
  },

  uploadText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "600",
    color: colors.primaryDark,
  },

  uploadSub: {
    marginTop: 5,
    fontSize: 12,
    color: colors.textSecondary,
  },

  infoBox: {
    marginTop: 18,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#F5F8FF",
    flexDirection: "row",
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