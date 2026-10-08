import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { registerForNotifications } from "@/utils/notifications";
import { ChatProvider } from "@/context/ChatContext";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  useEffect(()=>{
    registerForNotifications();
  },[]);
  return (
    <ChatProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </ChatProvider>
  );
}