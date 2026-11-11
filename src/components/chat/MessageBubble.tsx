
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";

export type Message = {
  id: number;
  text: string;
  sender: "user" | "doctor";
  time: string;
  imageUri?: string;
};

export default function MessageBubble({
  message,
}: {
  message: Message;
}) {
  const isUser = message.sender === "user";

  return (
    <View style={[s.row, isUser && s.userRow]}>
      {!isUser && (
        <View style={s.doctorIcon}>
          <Ionicons name="medical" size={20} color={colors.primaryDark} />
        </View>
      )}
      <View style={[s.bubble, isUser ? s.user : s.doctor]}>
        {message.imageUri && (
          <Image source={{ uri: message.imageUri }} style={s.image} />
        )}
        <Text style={[s.text, isUser && s.white]}>{message.text}</Text>
        <Text style={[s.time, isUser && s.userTime]}>{message.time}</Text>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  row: { 
    flexDirection: "row", 
    alignItems: "flex-end", 
    marginBottom: 19 
},
  userRow: { 
    justifyContent: "flex-end" 
},
  doctorIcon: {
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    marginRight: 9,
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: "#F0F3F7",
  },
  bubble: { 
    maxWidth: "79%", 
    padding: 14, 
    borderRadius: 17 
},
  doctor: { 
    backgroundColor: "#F0F3F7", 
    borderBottomLeftRadius: 4 
},
  user: {
    backgroundColor: colors.primaryDark,
    borderBottomRightRadius: 4,
  },
  text: { 
    fontSize: 14, 
    lineHeight: 21, 
    color: colors.textPrimary 
},
  white: { 
    color: colors.white 
},
  time: {
    marginTop: 7, 
    alignSelf: "flex-end",
    fontSize: 9, 
    color: colors.textSecondary,
  },
  userTime: { 
    color: "#DCE6FF" 
},
  image: { 
    width: 210, 
    height: 170, 
    borderRadius: 12, 
    marginBottom: 8 
},
});
