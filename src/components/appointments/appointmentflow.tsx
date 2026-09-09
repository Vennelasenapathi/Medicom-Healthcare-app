import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "@/constants/colors";
import BackButton from "@/components/home/BackButton";

export function Header({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  return (
    <View style={styles.header}>
      <BackButton onPress={onBack} />
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={{ width: 40 }} />
    </View>
  );
}

export function AppointmentCard({
  item,
  onPress,
}: {
  item: any;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={item.image} style={styles.doctorImage} />

      <View style={styles.cardInfo}>
        <Text style={styles.name}>{item.doctor}</Text>

        <Text style={styles.specialty}>
          {item.specialty}
        </Text>

        <Text style={styles.small}>
          {item.date}, {item.time}
        </Text>

        <Text style={styles.small}>
          {item.type} • {item.status}
        </Text>
      </View>

      {item.status !== "Cancelled" && (
        <View style={styles.edit}>
          <Ionicons
            name="create-outline"
            size={19}
            color={colors.white}
          />
        </View>
      )}
    </Pressable>
  );
}

export function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export function Empty({ title }: { title: string }) {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Ionicons
          name="calendar-outline"
          size={38}
          color={colors.primaryDark}
        />
      </View>

      <Text style={styles.emptyTitle}>{title}</Text>
    </View>
  );
}

export function Calendar({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: string;
  onSelectDate: (date: string) => void;
}) {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const monthName = new Date(
    year,
    month
  ).toLocaleString("default", {
    month: "long",
  });

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const currentMonth =
    year === today.getFullYear() &&
    month === today.getMonth();

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
    const selected = new Date(year, month, day);

    const current = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return selected < current;
  };

  const days = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(
      <View
        key={`empty-${i}`}
        style={styles.calendarDay}
      />
    );
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const disabled = isPast(day);
    const selected =
      selectedDate === String(day) && !disabled;

    days.push(
      <Pressable
        key={day}
        disabled={disabled}
        onPress={() =>
          onSelectDate(String(day))
        }
        style={[
          styles.calendarDay,
          selected && styles.selectedDay,
        ]}
      >
        <Text
          style={[
            styles.dayText,
            disabled && styles.disabledDay,
            selected && styles.selectedDayText,
          ]}
        >
          {day}
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.calendar}>
      <View style={styles.monthHeader}>
        <Pressable
          onPress={previousMonth}
          disabled={currentMonth}
        >
          <Ionicons
            name="chevron-back"
            size={19}
            color={
              currentMonth
                ? "#D0D0D0"
                : colors.textPrimary
            }
          />
        </Pressable>

        <Text style={styles.monthTitle}>
          {monthName} {year}
        </Text>

        <Pressable onPress={nextMonth}>
          <Ionicons
            name="chevron-forward"
            size={19}
            color={colors.textPrimary}
          />
        </Pressable>
      </View>

      <View style={styles.weekRow}>
        {[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ].map((day) => (
          <Text key={day} style={styles.weekText}>
            {day}
          </Text>
        ))}
      </View>

      <View style={styles.calendarGrid}>
        {days}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 95,
    paddingTop: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  card: {
    minHeight: 125,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  doctorImage: {
    width: 82,
    height: 82,
    borderRadius: 9,
  },

  cardInfo: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  specialty: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 4,
  },

  small: {
    fontSize: 10,
    color: colors.textSecondary,
    marginTop: 7,
  },

  edit: {
    width: 34,
    height: 34,
    borderRadius: 7,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  infoRow: {
    marginBottom: 15,
  },

  label: {
    fontSize: 10,
    color: colors.textSecondary,
    marginBottom: 5,
  },

  value: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  empty: {
    alignItems: "center",
    paddingTop: 90,
  },

  emptyIcon: {
    width: 75,
    height: 75,
    borderRadius: 38,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    marginTop: 15,
    fontSize: 16,
    color: colors.textSecondary,
  },

  calendar: {
    marginTop: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderRadius: 10,
  },

  monthHeader: {
    height: 38,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  monthTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  weekRow: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 5,
  },

  weekText: {
    width: "14.28%",
    textAlign: "center",
    fontSize: 9,
    fontWeight: "600",
    color: colors.textSecondary,
  },

  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  calendarDay: {
    width: "14.28%",
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },

  dayText: {
    width: 30,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 11,
    color: colors.textPrimary,
  },

  selectedDay: {
    backgroundColor: colors.primaryDark,
    borderRadius: 15,
  },

  selectedDayText: {
    color: colors.white,
    fontWeight: "700",
  },

  disabledDay: {
    color: "#D0D0D0",
  },
});