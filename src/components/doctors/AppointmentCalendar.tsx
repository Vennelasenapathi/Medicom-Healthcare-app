import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { colors } from "@/constants/colors";

export default function AppointmentCalendar({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: any) {
  const today = new Date();

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay =
    (new Date(year, month, 1).getDay() + 6) % 7;

  const monthName = months[month];

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

  const isPastDate = (day: number) => {
    const selected = new Date(year, month, day);

    const current = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return selected < current;
  };

  const previousMonth = () => {
    if (
      year === today.getFullYear() &&
      month === today.getMonth()
    ) {
      return;
    }

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

  const selectDate = (day: number) => {
    if (isPastDate(day)) return;

    setSelectedDate(`${day} ${monthName} ${year}`);
  };

  const calendar = [];

  for (let i = 0; i < firstDay; i++) {
    calendar.push(
      <View key={`empty-${i}`} style={styles.date} />
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const disabled = isPastDate(day);

    const selected =
      selectedDate === `${day} ${monthName} ${year}`;

    calendar.push(
      <Pressable
        key={day}
        disabled={disabled}
        onPress={() => selectDate(day)}
        style={[
          styles.date,
          selected && styles.selectedDate,
        ]}
      >
        <Text
          style={[
            styles.dateText,
            disabled && styles.disabledDate,
            selected && styles.selectedText,
          ]}
        >
          {day}
        </Text>
      </Pressable>
    );
  }

  return (
    <View>
      <Text style={styles.title}>
        Choose Appointment Date
      </Text>

      <View style={styles.calendarBox}>
        <View style={styles.monthHeader}>
          <Pressable
            onPress={previousMonth}
            style={styles.arrowButton}
          >
            <Text style={styles.arrow}>‹</Text>
          </Pressable>

          <Text style={styles.month}>
            {monthName} {year}
          </Text>

          <Pressable
            onPress={nextMonth}
            style={styles.arrowButton}
          >
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        </View>

        <View style={styles.weekRow}>
          {[
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
          ].map((day) => (
            <Text key={day} style={styles.weekDay}>
              {day}
            </Text>
          ))}
        </View>

        <View style={styles.calendarGrid}>
          {calendar}
        </View>
      </View>

      {selectedDate ? (
        <Text style={styles.selectedInfo}>
          Selected: {selectedDate}
        </Text>
      ) : null}

      <Text style={styles.title}>Select Time Slot</Text>

      <View style={styles.timeGrid}>
        {times.map((time) => {
          const selected = selectedTime === time;

          return (
            <Pressable
              key={time}
              onPress={() => setSelectedTime(time)}
              style={[
                styles.time,
                selected && styles.selectedTime,
              ]}
            >
              <Text
                style={[
                  styles.timeText,
                  selected && styles.selectedText,
                ]}
              >
                {time}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 24,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  calendarBox: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#F7F9FC",
  },

  monthHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  arrowButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  arrow: {
    fontSize: 28,
    color: colors.primaryDark,
  },

  month: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  weekRow: {
    marginTop: 20,
    flexDirection: "row",
  },

  weekDay: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "600",
    color: colors.textSecondary,
  },

  calendarGrid: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
  },

  date: {
    width: "14.28%",
    height: 46,
    alignItems: "center",
    justifyContent: "center",
  },

  selectedDate: {
    width: "14.28%",
    height: 42,
    marginVertical: 2,
    borderRadius: 21,
    backgroundColor: colors.primaryDark,
  },

  dateText: {
    fontSize: 14,
    color: colors.textPrimary,
  },

  disabledDate: {
    color: "#C7CBD3",
  },

  selectedText: {
    color: colors.white,
    fontWeight: "700",
  },

  selectedInfo: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
    color: colors.primaryDark,
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  time: {
    width: "31%",
    minHeight: 48,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F4F8",
  },

  selectedTime: {
    backgroundColor: colors.primaryDark,
  },

  timeText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textPrimary,
  },
});