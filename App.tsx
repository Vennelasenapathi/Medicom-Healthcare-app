import React, { useEffect } from "react";
import "./globals.css";
import { NavigationContainer } from "@react-navigation/native";
import { registerForNotifications } from "@/utils/notifications";

import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  useEffect(()=>{
    registerForNotifications();
  },[]);
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer> 
  );
}