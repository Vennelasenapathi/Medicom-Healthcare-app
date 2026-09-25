import React, { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import BottomTabBar from "@/components/Bottombar/BottomBar";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import AppointmentResultModal from "@/components/appointments/AppointmentResultModal";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { Appointment, initialAppointments } from "@/data/Appointments";

import AppointmentDetails from "./AppointmentDetails";
import RescheduleAppointment from "./RescheduleAppointment";

type Tab = "Upcoming" | "Completed" | "Cancelled";
type Screen = "list" | "details" | "reschedule";

export default function AppointmentsScreen({
  navigation,
  route,
}: any) {
  const [screen, setScreen] = useState<Screen>("list");
  const [tab, setTab] = useState<Tab>("Upcoming");
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [cancelled, setCancelled] = useState<Appointment[]>([]);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [resultType, setResultType] =
    useState<"cancelled" | "rescheduled">("cancelled");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM");

  /* ADD RECENT BOOKING */
  useEffect(() => {
    const newAppointment = route?.params?.newAppointment;
    if (!newAppointment) return;

    setAppointments((prev) => {
      if (prev.some((item) => item.id === newAppointment.id)) {
        return prev;
      }

      return [newAppointment, ...prev];
    });

    navigation.setParams({ newAppointment: undefined });
    setTab("Upcoming");
    setScreen("list");
  }, [route?.params?.newAppointment]);

  /* OPEN DETAILS */
  const openDetails = (item: Appointment) => {
    setSelected(item);
    setScreen("details");
  };

  /* DELETE */
  const deleteAppointment = () => {
    if (!selected) return;

    setAppointments((prev) =>
      prev.filter((item) => item.id !== selected.id)
    );

    setCancelled((prev) => [
      ...prev,
      { ...selected, status: "Cancelled" },
    ]);

    setTab("Cancelled");
    setScreen("list");
    setResultType("cancelled");
    setResultVisible(true);
  };

  /* RESCHEDULE */
  const confirmReschedule = () => {
    if (!selected || !date) return;

    setAppointments((prev) =>
      prev.map((item) =>
        item.id === selected.id
          ? { ...item, date, time }
          : item
      )
    );

    setScreen("list");
    setTab("Upcoming");
    setResultType("rescheduled");
    setResultVisible(true);
  };

  const currentList =
    tab === "Cancelled" ? cancelled : appointments;

  /* DETAILS */
  if (screen === "details" && selected) {
    return (
      <AppointmentDetails
        appointment={selected}
        navigation={navigation}
        onBack={() => setScreen("list")}
        onDelete={deleteAppointment}
        onReschedule={() => {
          setDate(selected.date || "");
          setTime(selected.time || "");
          setScreen("reschedule");
        }}
      />
    );
  }

  /* RESCHEDULE */
  if (screen === "reschedule" && selected) {
    return (
      <RescheduleAppointment
        appointment={selected}
        date={date}
        time={time}
        setDate={setDate}
        setTime={setTime}
        onBack={() => setScreen("details")}
        onConfirm={confirmReschedule}
      />
    );
  }

  return (
    <View style={[globalStyles.container, styles.screen]}>
      <Text style={styles.title}>My Appointments</Text>

      {/* TABS */}
      <View style={styles.tabs}>
        {(["Upcoming", "Completed", "Cancelled"] as Tab[]).map(
          (item) => (
            <Pressable
              key={item}
              onPress={() => setTab(item)}
              style={[
                styles.tab,
                tab === item && styles.activeTab,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  tab === item && styles.activeText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      {/* APPOINTMENTS */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {currentList.length > 0 ? (
          currentList.map((item) => (
            <AppointmentCard
              key={item.id}
              appointment={item}
              onPress={() => openDetails(item)}
              onReschedule={() => {
                setSelected(item);
                setDate(item.date);
                setTime(item.time);
                setScreen("reschedule");
              }}
            />
          ))
        ) : (
          <View style={globalStyles.empty}>
            <Text style={globalStyles.emptyText}>
              No {tab.toLowerCase()} appointments
            </Text>
          </View>
        )}
      </ScrollView>

      {/* BOTTOM BAR */}
      <BottomTabBar
        navigation={navigation}
        activeTab="Appointments"
      />

      {/* RESULT POPUP */}
      <AppointmentResultModal
        visible={resultVisible}
        type={resultType}
        onBack={() => setResultVisible(false)}
        onViewAppointments={() => {
          setResultVisible(false);
          setTab("Upcoming");
          setScreen("list");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 14,
  },

  title: {
    marginTop: 50,
    fontSize: 21,
    fontWeight: "700",
    textAlign: "center",
    color: colors.textPrimary,
  },

  tabs: {
    marginTop: 25,
    padding: 5,
    borderRadius: 10,
    backgroundColor: "#F5F7FA",
    flexDirection: "row",
    justifyContent: "space-around",
  },

  tab: {
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 7,
  },

  activeTab: {
    backgroundColor: colors.white,
  },

  tabText: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  activeText: {
    color: colors.primaryDark,
    fontWeight: "700",
  },

  list: {
    paddingTop: 16,
    paddingBottom: 90,
    gap: 15,
  },
});