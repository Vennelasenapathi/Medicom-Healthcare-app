import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";

import BottomTabBar from "@/components/Bottombar/BottomBar";
import { colors } from "@/constants/colors";
import AppointmentCard from "@/components/appointments/AppointmentCard";
import AppointmentDetails from "./AppointmentDetails";
import RescheduleAppointment from "./RescheduleAppointment";
import AppointmentResultModal from "@/components/appointments/AppointmentResultModal";

type Tab = "Upcoming" | "Completed" | "Cancelled";
type Screen = "list" | "details" | "reschedule";

export type Appointment = {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  type: string;
  status: string;
  image: any;
};

const initialAppointments: Appointment[] = [
  {
    id: 1,
    doctor: "Dr. Eshan Khan",
    specialty: "Brain & Spine Specialist",
    date: "15 September 2026",
    time: "10:00 AM",
    type: "Video Consultation",
    status: "Confirmed",
    image: require("../../../assets/images/medicom/topdoctor1.png"),
  },
  {
    id: 2,
    doctor: "Dr. Siri Sharma",
    specialty: "Pediatric Neurologist",
    date: "16 September 2026",
    time: "01:00 PM",
    type: "Video Consultation",
    status: "Confirmed",
    image: require("../../../assets/images/medicom/topdoctor2.png"),
  },
  {
    id: 3,
    doctor: "Dr. Jasmin",
    specialty: "Opthalmologist",
    date: "17 September 2026",
    time: "04:00 PM",
    type: "Video Consultation",
    status: "Confirmed",
    image: require("../../../assets/images/medicom/topdoctor5.png"),
  },
];

export default function AppointmentsScreen({
  navigation,
  route,
}: any) {
  const [screen, setScreen] = useState<Screen>("list");
  const [tab, setTab] = useState<Tab>("Upcoming");
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [cancelled, setCancelled] = useState<Appointment[]>([]);
  const [selected, setSelected] = useState<Appointment | null>(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [resultType, setResultType] = useState<"cancelled" | "rescheduled">("cancelled");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM");

  /* ADD RECENT BOOKING */

  useEffect(() => {
    const newAppointment = route?.params?.newAppointment;

    if (!newAppointment) return;

    setAppointments((prev) => {
      // Prevent duplicate appointment
      const alreadyExists = prev.some(
        (item) => item.id === newAppointment.id
      );

      if (alreadyExists) {
        return prev;
      }

      return [newAppointment, ...prev];
    });

    // Remove the parameter after adding it
    navigation.setParams({
      newAppointment: undefined,
    });

    setTab("Upcoming");
    setScreen("list");
  }, [route?.params?.newAppointment]);

  /* OPEN DETAILS */

  const openDetails = (item: Appointment) => {
    setSelected(item);
    setScreen("details");
  };

  /* DELETE APPOINTMENT */

  const deleteAppointment = () => {
    if (!selected) return;

    setAppointments((prev) =>
      prev.filter((item) => item.id !== selected.id)
    );

    setCancelled((prev) => [
      ...prev,
      {
        ...selected,
        status: "Cancelled",
      },
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
          ? {
              ...item,
              date,
              time,
            }
          : item
      )
    );

    setScreen("list");
    setTab("Upcoming");
    setResultType("rescheduled");
    setResultVisible(true);
  };

  /* CURRENT LIST */

  const currentList =
    tab === "Cancelled" ? cancelled : appointments;

  /* DETAILS SCREEN */

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

  /* RESCHEDULE SCREEN */

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

  /* LIST SCREEN */

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        My Appointments
      </Text>

      {/* TABS */}

      <View style={styles.tabs}>
        {(
          [
            "Upcoming",
            "Completed",
            "Cancelled",
          ] as Tab[]
        ).map((item) => (
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
        ))}
      </View>

      {/* APPOINTMENT LIST */}

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
          <View style={styles.empty}>
            <Text style={styles.emptyText}>
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
  container: {
    flex: 1,
    backgroundColor: colors.white,
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

  empty: {
    alignItems: "center",
    paddingTop: 100,
  },

  emptyText: {
    fontSize: 15,
    color: colors.textSecondary,
  },
});