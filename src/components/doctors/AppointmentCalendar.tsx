
import React, { useState } from "react";
import { StyleSheet, Text, View,Pressable } from "react-native";

import Calendar from "@/components/common/Calendar";
import { colors } from "@/constants/colors";

type Props = {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
};

export default function AppointmentCalendar({
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
}: Props) {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

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

  const currentMonth =
    year === today.getFullYear() &&
    month === today.getMonth();

  const previousMonth = () => {
    if (currentMonth) return;

    if (month === 0) {
      setMonth(11);
      setYear((previous) => previous - 1);
    } else {
      setMonth((previous) => previous - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((previous) => previous + 1);
    } else {
      setMonth((previous) => previous + 1);
    }
  };

  return (
    <View>
      <Text style={styles.title}>
        Choose Appointment Date
      </Text>

      <Calendar
        date={selectedDate}
        month={month}
        year={year}
        currentMonth={currentMonth}
        onDateChange={setSelectedDate}
        onPreviousMonth={previousMonth}
        onNextMonth={nextMonth}
      />

      {selectedDate ? (
        <Text style={styles.selectedInfo}>
          Selected: {selectedDate}
        </Text>
      ) : null}

      <Text style={styles.title}>
        Select Time Slot
      </Text>

      <View style={styles.timeGrid}>
        {times.map((time) => {
          const selected = selectedTime === time;

          return (
            <Pressable
              key={time}
              style={[
                styles.time,
                selected && styles.selectedTime,
              ]}
              onTouchEnd={() => setSelectedTime(time)}
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
    backgroundColor: colors.timebackground,
  },

  selectedTime: {
    backgroundColor: colors.primaryDark,
  },

  timeText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.textPrimary,
  },

  selectedText: {
    color: colors.white,
    fontWeight: "700",
  },
});
