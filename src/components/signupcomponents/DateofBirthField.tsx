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
  onChange: (value: string) => void;
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
  onChange,
  onBlur,
}: Props) {
  const [showPicker, setShowPicker] = useState(false);

  const pickDate = (
    event: DateTimePickerEvent,
    date?: Date
  ) => {
    setShowPicker(false);

    if (event.type !== "set" || !date) return;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    onChange(`${day}/${month}/${year}`);
    onBlur();
  };

  const hasError = !!touched && !!error;

  return (
    <View>
      {/* DATE FIELD */}
      <Pressable
        onPress={() => setShowPicker(true)}
        style={[
          styles.field,
          {
            borderColor: hasError
              ? colors.error
              : value
              ? colors.primaryLight
              : colors.border,
          },
        ]}
      >
        {/* CALENDAR ICON */}
        <Ionicons
          name="calendar-outline"
          size={20}
          color={
            value
              ? colors.primaryDark
              : colors.dobcolor
          }
        />

        {/* DATE TEXT */}
        <Text
          style={[
            styles.dateText,
            {
              color: value
                ? "#071B44"
                : "#989898",
            },
          ]}
        >
          {value || "Date of birth (DD/MM/YYYY)"}
        </Text>

        {/* VALID ICON */}
        {value && !error && touched && (
          <Ionicons
            name="checkmark"
            size={19}
            color={colors.primaryDark}
          />
        )}
      </Pressable>

      {/* DATE PICKER */}
      {showPicker && (
        <DateTimePicker
          value={
            value
              ? parseDate(value)
              : new Date()
          }
          mode="date"
          display={
            Platform.OS === "android"
              ? "calendar"
              : "spinner"
          }
          maximumDate={new Date()}
          onChange={pickDate}
        />
      )}

      {/* ERROR MESSAGE */}
      {hasError && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    borderWidth: 1,
  },

  dateText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 12,
  },

  error: {
    marginTop: 4,
    fontSize: 9,
    color: colors.error,
  },
});