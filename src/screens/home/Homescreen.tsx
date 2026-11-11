import React, { useCallback,useState,useEffect } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import NotificationScreen from "./NotificationScreen";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doctors } from "@/data/doctors";
import HomeHeader from "@/components/home/HomeHeader";
import QuickActions from "@/components/home/QuickActions";
import CareBanner from "@/components/home/CareBanner";
import AppointmentCard from "@/components/home/AppointmentCard";
import DoctorCard from "@/components/home/DoctorCard";
import BottomTabBar from "@/components/Bottombar/BottomBar";
import {Appointment,initialAppointments} from "@/data/Appointments";

export default function HomeScreen({ navigation,route }: any) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 600;
  const [showNotifications, setShowNotifications] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);

  useEffect(() => {
  const updatedAppointment = route?.params?.updatedAppointment;

  if (!updatedAppointment) return;

  setAppointments((prev) =>
    prev.map((item) =>
      item.id === updatedAppointment.id
        ? updatedAppointment
        : item
    )
  );

  navigation.setParams({ updatedAppointment: undefined });
}, [route?.params?.updatedAppointment]);
const deleteAppointment = (id: number) => {
  setAppointments((previous) =>
    previous.filter((appointment) => appointment.id !== id)
  );
};

useFocusEffect(
  useCallback(() => {
    let isActive = true;

    const loadProfile = async () => {
      try {
        const savedUser = await AsyncStorage.getItem("user");

        if (savedUser && isActive) {
          const user = JSON.parse(savedUser);
          setProfileImage(user.profileImage ?? null);
        }
      } catch (error) {
        console.error("Error loading profile photo:", error);
      }
    };

    loadProfile();

    return () => {
      isActive = false;
    };
  }, [])
);

  return (
    <View style={[globalStyles.container, styles.container]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <HomeHeader
  onProfilePress={() => navigation.navigate("Profile")}
  onSearch={() => navigation.navigate("Search")}
  onNotificationPress={() => setShowNotifications(true)}
/>

        <View
          style={[
            styles.content,
            isTablet && styles.tabletContent,
          ]}
        >
          <QuickActions
            onDoctorPress={() => navigation.navigate("Doctors")}
            onAmbulancePress={() => navigation.navigate("Ambulance")}
            onHospitalPress={() => navigation.navigate("Hospitals")}
            onPharmacyPress={() => navigation.navigate("Pharmacy")}
          />

          <CareBanner />

          <View
            style={[
              globalStyles.spaceBetween,
              styles.sectionHeader,
            ]}
          >
            <Text style={styles.sectionTitle}>
              Your Next Appointment
            </Text>
          </View>

          {appointments.length > 0 ? (
  <AppointmentCard
    appointment={appointments[0]}
    press={() =>
      navigation.navigate("Chat", {
        doctor: {
          doctor: appointments[0].doctor,
          specialty: appointments[0].specialty,
          image: appointments[0].image,
        },
        consultation: {
          type: appointments[0].type,
          date: appointments[0].date,
          time: appointments[0].time,
          reason: "General Consultation",
        },
      })
    }
    onDelete={() => deleteAppointment(appointments[0].id)}
    onEdit={() =>
  navigation.navigate("Appointments", {
    editAppointment: appointments[0],
  })
}
  />
) : (
  <View style={styles.noAppointment}>
    <Text style={styles.noAppointmentText}>
      No upcoming appointments
    </Text>
  </View>
)}
          <View
            style={[
              globalStyles.spaceBetween,
              styles.sectionHeader,
            ]}
          >
            <Text style={styles.sectionTitle}>
              Top Doctors
            </Text>

            <Text
              onPress={() =>
                navigation.navigate("TopDoctors")
              }
              style={styles.seeAll}
            >
              See All
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            {doctors.map((doctor) => (
              <DoctorCard
                key={doctor.name}
                doctor={doctor}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      <BottomTabBar
        navigation={navigation}
        activeTab="Home"
      />

      {showNotifications && (
      <View style={styles.notificationOverlay}>
        <NotificationScreen
          onClose={() => setShowNotifications(false)}
        />
      </View>
    )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },

  scroll: {
    paddingBottom: 90,
  },

  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  tabletContent: {
    maxWidth: 700,
    alignSelf: "center",
    width: "100%",
  },

  notificationOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  },

  sectionHeader: {
    marginTop: 25,
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  seeAll: {
    fontSize: 12,
    color: colors.primaryDark,
    fontWeight: "600",
    backgroundColor: "#EAF0FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  noAppointment: {
  padding: 25,
  backgroundColor: "#F7F9FC",
  borderRadius: 12,
  alignItems: "center",
},
noAppointmentText: {
  fontSize: 14,
  color: colors.textSecondary,
},
});