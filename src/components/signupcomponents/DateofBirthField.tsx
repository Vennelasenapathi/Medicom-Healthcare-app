import React, { useState } from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { colors } from "../../constants/colors";

type Props = {
  value: string;
  touched?: boolean;
  error?: string;
  onValueChange: (value: string) => void;
  onBlur: () => void;
};

const parseDate = (date: string) => {
  const [day, month, year] = date.split("/").map(Number);
  return new Date(year, month - 1, day);
};

export default function DateOfBirthField({
  value,
  touched,
  error,
  onValueChange,
  onBlur,
}: Props) {
  const [showPicker, setShowPicker] = useState(false);

  
  const hasError = !!touched && !!error;
  const isValid = !!value && !!touched && !error;

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setShowPicker(true)}
        style={[
          styles.field,
          hasError && styles.errorBorder,
          isValid && styles.validBorder,
        ]}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={
              hasError
                ? colors.error
                : isValid
                ? colors.primaryDark
                : colors.dobcolor
            }
          />
        </View>

        <Text
          style={[
            styles.dateText,
            !value && styles.placeholder,
          ]}
        >
          {value || "Date of birth (DD/MM/YYYY)"}
        </Text>

        {isValid && (
          <Ionicons
            name="checkmark-circle"
            size={19}
            color={colors.primaryDark}
          />
        )}
      </Pressable>

     {showPicker && (
  <DateTimePicker
    value={value ? parseDate(value) : new Date()}
    
    mode="date"
    display={
      Platform.OS === "android"
        ? "calendar"
        : "spinner"
    }
    maximumDate={new Date()}
    onValueChange={(event, date) => {
      setShowPicker(false);

      if (!date) return;

      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();

      onValueChange(`${day}/${month}/${year}`);
      onBlur();
    }}
  />
)}

      {hasError && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },

  picker: {
    width: "100%",
    height: 200,
    backgroundColor: colors.white,
    borderRadius: 10,
  },

  field: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },

  iconContainer: {
    width: 28,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  dateText: {
    flex: 1,
    marginLeft: 4,
    fontSize: 12,
    color: "#071B44",
  },

  placeholder: {
    color: "#989898",
  },

  validBorder: {
    borderColor: colors.primaryLight,
  },

  errorBorder: {
    borderColor: colors.error,
  },

  error: {
    marginTop: 4,
    marginLeft: 4,
    fontSize: 9,
    color: colors.error,
  },
});