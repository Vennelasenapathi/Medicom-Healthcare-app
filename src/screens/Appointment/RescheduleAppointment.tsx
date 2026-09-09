import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppButton from "@/components/common/AppButton";
import BackButton from "@/components/home/BackButton";
import { colors } from "@/constants/colors";

export default function RescheduleAppointment({
  date,
  time,
  setDate,
  setTime,
  onBack,
  onConfirm,
}: any) {
  const today = new Date();

  const [month, setMonth] =
    useState(today.getMonth());

  const [year, setYear] =
    useState(today.getFullYear());

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

  const monthName = new Date(
    year,
    month
  ).toLocaleString("default", {
    month: "long",
  });

  const currentMonth =
    month === today.getMonth() &&
    year === today.getFullYear();

  const previousMonth = () => {
    if (currentMonth) return;

    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const isPast = (day: number) => {
    const selected = new Date(
      year,
      month,
      day
    );

    const current = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return selected < current;
  };

  const calendar = [];

  for (let i = 0; i < firstDay; i++) {
    calendar.push(
      <View
        key={`empty-${i}`}
        style={styles.day}
      />
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const disabled = isPast(day);
    const selected =
      date === String(day) &&
      !disabled;

    calendar.push(
      <Pressable
        key={day}
        disabled={disabled}
        onPress={() =>
          setDate(String(day))
        }
        style={[
          styles.day,
          selected &&
            styles.selectedDay,
        ]}
      >
        <Text
          style={[
            styles.dayText,
            disabled &&
              styles.disabled,
            selected &&
              styles.selectedText,
          ]}
        >
          {day}
        </Text>
      </Pressable>
    );
  }

  const times = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <BackButton onPress={onBack} />

        <Text style={styles.title}>
          Reschedule Appointment
        </Text>

        <View style={{ width: 40 }} />
      </View>

      <Text style={styles.label}>
        Choose Date
      </Text>

      <View style={styles.calendar}>
        <View style={styles.monthHeader}>
          <Pressable
            disabled={currentMonth}
            onPress={previousMonth}
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

          <Pressable onPress={nextMonth}>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textPrimary}
            />
          </Pressable>
        </View>

        <View style={styles.week}>
          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <Text
              key={day}
              style={styles.weekText}
            >
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.grid}>
          {calendar}
        </View>
      </View>

      <Text style={styles.label}>
        Select Time Slot
      </Text>

      <View style={styles.times}>
        {times.map((item) => (
          <Pressable
            key={item}
            onPress={() =>
              setTime(item)
            }
            style={[
              styles.time,
              time === item &&
                styles.selectedTime,
            ]}
          >
            <Text
              style={
                time === item
                  ? styles.white
                  : styles.timeText
              }
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.button}>
        <AppButton
          title="Confirm"
          onPress={onConfirm}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
  },

  header: {
    height: 95,
    paddingTop: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  label: {
    marginTop: 15,
    marginBottom: 7,
    fontSize: 11,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  calendar: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.borderLight,
  },

  monthHeader: {
    height: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  times: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  time: {
    width: "47%",
    paddingVertical: 11,
    borderRadius: 7,
    backgroundColor: colors.background,
    alignItems: "center",
  },

  selectedTime: {
    backgroundColor: colors.primaryDark,
  },

  timeText: {
    fontSize: 10,
    color: colors.textPrimary,
  },

  white: {
    fontSize: 10,
    fontWeight: "600",
    color: colors.white,
  },

  button: {
    marginTop: 25,
  },
});