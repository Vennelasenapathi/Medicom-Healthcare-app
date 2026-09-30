import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { months, weeks } from "@/data/Appointments";

type CalendarProps = {
  date: string;
  month: number;
  year: number;
  currentMonth: boolean;
  onDateChange: (date: string) => void;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
};

const CalendarDay = ({
  day,
  disabled,
  selected,
  onPress,
}: {
  day?: number;
  disabled?: boolean;
  selected?: boolean;
  onPress?: () => void;
}) => (
  <Pressable
    disabled={!day || disabled}
    onPress={onPress}
    style={[
      styles.day,
      selected && styles.selectedDay,
    ]}
  >
    {day && (
      <Text
        style={[
          styles.dayText,
          disabled && styles.disabled,
          selected && styles.selectedText,
        ]}
      >
        {day}
      </Text>
    )}
  </Pressable>
);

export default function Calendar({
  date,
  month,
  year,
  currentMonth,
  onDateChange,
  onPreviousMonth,
  onNextMonth,
}: CalendarProps) {
  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const monthName = months[month];

  const isPast = (day: number) => {
    const today = new Date();

    const selectedDate = new Date(
      year,
      month,
      day
    );

    const currentDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return selectedDate < currentDate;
  };

  const calendarDays = [
    ...Array.from(
      { length: firstDay },
      (_, index) => (
        <CalendarDay
          key={`empty-${index}`}
        />
      )
    ),

    ...Array.from(
      { length: daysInMonth },
      (_, index) => {
        const day = index + 1;
        const disabled = isPast(day);

        const selected =
          date ===
            `${day} ${monthName} ${year}` &&
          !disabled;

        return (
          <CalendarDay
            key={day}
            day={day}
            disabled={disabled}
            selected={selected}
            onPress={() =>
              onDateChange(
                `${day} ${monthName} ${year}`
              )
            }
          />
        );
      }
    ),
  ];

  return (
    <View style={styles.calendar}>
      <View style={styles.monthHeader}>
        <Pressable
          disabled={currentMonth}
          onPress={onPreviousMonth}
        >
          <Ionicons
            name="chevron-back"
            size={18}
            color={
              currentMonth
                ? "#CCC"
                : colors.textPrimary
            }
          />
        </Pressable>

        <Text style={styles.month}>
          {monthName} {year}
        </Text>

        <Pressable onPress={onNextMonth}>
          <Ionicons
            name="chevron-forward"
            size={18}
            color={colors.textPrimary}
          />
        </Pressable>
      </View>

      <View style={styles.week}>
        {weeks.map((day) => (
          <Text
            key={day}
            style={styles.weekText}
          >
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.grid}>
        {calendarDays}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.borderLight,
  },

  monthHeader: {
    height: 35,
    ...globalStyles.spaceBetween,
  },

  month: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  week: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 5,
  },

  weekText: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 9,
    color: colors.textSecondary,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  day: {
    width: "14.28%",
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },

  dayText: {
    width: 29,
    height: 29,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 10,
    color: colors.textPrimary,
  },

  selectedDay: {
    backgroundColor: colors.primaryDark,
    borderRadius: 15,
  },

  selectedText: {
    color: colors.white,
    fontWeight: "700",
  },

  disabled: {
    color: "#D0D0D0",
  },
});