import React, { useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppButton from "@/components/common/AppButton";
import BackButton from "@/components/home/BackButton";
import Calendar from "@/components/common/Calendar";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { months, times } from "@/data/Appointments";

export default function RescheduleAppointment({
  date,
  time,
  setDate,
  setTime,
  onBack,
  onConfirm,
}: any) {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth() );
  const [year, setYear] = useState( today.getFullYear());

  useEffect(() => {
    if (!date) return;

    const parts = date.split(" ");

    if (parts.length !== 3) return;

    const selectedMonth = months.indexOf(
      parts[1]
    );

    const selectedYear = Number(parts[2]);

    if (
      selectedMonth !== -1 &&
      !isNaN(selectedYear)
    ) {
      setMonth(selectedMonth);
      setYear(selectedYear);
    }
  }, [date]);

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

  return (
    <View
      style={[
        globalStyles.container,
        styles.screen,
      ]}
    >
      {/* HEADER */}
      <View
        style={[
          globalStyles.spaceBetween,
          styles.header,
        ]}
      >
        <BackButton onPress={onBack} />

        <Text style={styles.title}>
          Reschedule Appointment
        </Text>

        <View style={styles.headerSpace} />
      </View>

      {/* DATE */}
      <Text style={styles.label}>
        Choose Date
      </Text>

      <Calendar
        date={date}
        month={month}
        year={year}
        currentMonth={currentMonth}
        onDateChange={setDate}
        onPreviousMonth={previousMonth}
        onNextMonth={nextMonth}
      />

      {/* TIME */}
      <Text style={styles.label}>
        Select Time Slot
      </Text>

      <View style={styles.times}>
        {times.map((item) => {
          const selected = time === item;

          return (
            <Pressable
              key={item}
              onPress={() => setTime(item)}
              style={[
                styles.time,
                selected &&
                  styles.selectedTime,
              ]}
            >
              <Text
                style={[
                  styles.timeText,
                  selected &&
                    styles.selectedTimeText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* CONFIRM */}
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
  screen: {
    paddingHorizontal: 14,
  },

  header: {
    height: 95,
    paddingTop: 38,
  },

  headerSpace: {
    width: 40,
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

  selectedTimeText: {
    fontWeight: "600",
    color: colors.white,
  },

  button: {
    marginTop: 25,
  },
});