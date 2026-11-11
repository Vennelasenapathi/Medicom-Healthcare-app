
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

type Props = {
  visible: boolean;
  title: string;
  description: string;
  buttonTitle?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ConfirmationModal({
  visible,
  title,
  description,
  buttonTitle = "Delete",
  onCancel,
  onConfirm,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Warning Icon */}
          <View style={styles.iconCircle}>
            <Ionicons
              name="alert"
              size={62}
              color="#FF5B61"
            />
          </View>

          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Description */}
          <Text style={styles.description}>
            {description}
          </Text>

          {/* Back Button */}
          <Pressable
            style={styles.backButton}
            onPress={onCancel}
          >
            <Text style={styles.backText}>Back</Text>
          </Pressable>

          {/* Confirm Button */}
          <Pressable
            style={styles.confirmButton}
            onPress={onConfirm}
          >
            <Text style={styles.confirmText}>
              {buttonTitle}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.30)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  card: {
    width: "100%",
    maxWidth: 410,
    backgroundColor: colors.white,
    borderRadius: 28,
    paddingHorizontal: 32,
    paddingTop: 48,
    paddingBottom: 48,
    alignItems: "center",
  },

  iconCircle: {
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: "#FFF5F5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 28,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    lineHeight: 21,
    color: "#999999",
    textAlign: "center",
    marginBottom: 28,
  },

  backButton: {
    width: "100%",
    height: 60,
    borderRadius: 23,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 13,
  },

  backText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },

  confirmButton: {
    width: "100%",
    height: 60,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },

  confirmText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primaryDark,
  },
});
