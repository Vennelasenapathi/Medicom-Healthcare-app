import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding from "@/screens/onboarding/onboarding";
import Auth from "@/screens/onboarding/auth";
import Login from "@/screens/login/login";
import SplashScreen from "@/screens/splash/SplashScreen";
import Signup from "@/screens/signup/signup";
import HomeScreen from "@/screens/home/Homescreen";
import TopDoctorScreen from "@/screens/home/TopDoctorscreen";
import SearchScreen from "@/screens/home/searchscreen";
import NotificationSettingsScreen from "@/screens/profile/NotificationScreen";
import EditProfileScreen from "@/screens/profile/Editscreen";
import profileScreen from "@/screens/profile/profilescreen";
import settingsScreen from "@/screens/profile/SettingScreen";
import AppointmentScreen from "@/screens/Appointment/AppointmentScreen";
import ChatScreen from "@/screens/chat/chatscreen";
import ChatListScreen from "@/screens/chat/chatListscreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="onboarding" component={Onboarding} />
      <Stack.Screen name="auth" component={Auth} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TopDoctors" component={TopDoctorScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Profile" component={profileScreen} />
      <Stack.Screen name="Settings" component={settingsScreen} />
      <Stack.Screen name="Appointments" component={AppointmentScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="ChatList" component={ChatListScreen} />
    </Stack.Navigator>
  );
}