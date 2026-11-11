
import React, { useState } from "react";
import {
  Alert, Image, KeyboardAvoidingView, Platform, Pressable,
  ScrollView, StatusBar, StyleSheet, Text, View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useChats } from "@/context/ChatContext";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";
import MessageBubble, { Message } from "@/components/chat/MessageBubble";
import ChatInput from "@/components/chat/ChatInput";

const getReply = (text: string) => {
  const value = text.toLowerCase();

  if (/chest pain|breathing|shortness/.test(value))
    return "Chest pain or difficulty breathing can sometimes require urgent attention. Please seek immediate medical care if symptoms are severe or getting worse.";
  if (/fever|temperature/.test(value))
    return "For fever, stay hydrated and monitor your temperature. If it is high, persistent, or accompanied by severe symptoms, please consult a doctor.";
  if (/headache|migraine/.test(value))
    return "For a headache, try resting in a quiet environment and staying hydrated. Let me know if it is severe, unusual, or persistent.";
  if (/medicine|medication|tablet/.test(value))
    return "Please take your medication exactly as prescribed. If you have side effects or questions, let me know which medication you are taking.";
  if (/report|test/.test(value))
    return "I can help you understand your medical report. Please make sure the complete report is available for review.";
  if (/hello|hi|hey/.test(value))
    return "Hello! I'm here to help. Please tell me what you are experiencing.";

  return "Thanks for sharing that. Could you tell me a little more about your symptoms or concern?";
};

export default function ChatScreen({ navigation, route }: any) {
  const { updateLastMessage } = useChats();
  const doctor = route?.params?.doctor;

  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    text: doctor?.message || "Hello! How are you feeling today?",
    sender: "doctor",
    time: doctor?.time || "10:30 AM",
  }]);

  function sendMessage(text: string) {
    const userMessage: Message = {
      id: Date.now(), text, sender: "user", time: "Now",
    };

    setMessages((previous) => [...previous, userMessage]);
    if (doctor?.id) updateLastMessage(doctor.id, text, "Now");

    setTimeout(() => {
      const reply = getReply(text);
      setMessages((previous) => [...previous, {
        id: Date.now(), text: reply, sender: "doctor", time: "Now",
      }]);
      if (doctor?.id) updateLastMessage(doctor.id, reply, "Now");
    }, 700);
  }

  async function openGallery() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Gallery permission", "Please allow photo access.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], allowsEditing: false, quality: 0.8,
    });

    if (result.canceled || !result.assets.length) return;

    const imageUri = result.assets[0].uri;
    setMessages((previous) => [...previous, {
      id: Date.now(), text: "Photo attachment", sender: "user",
      time: "Now", imageUri,
    }]);

    if (doctor?.id) updateLastMessage(doctor.id, "📷 Photo", "Now");
  }

  return (
    <KeyboardAvoidingView
      style={[globalStyles.keyboardContainer, s.screen]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={s.header}>
        <Pressable style={s.back} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={colors.white} />
        </Pressable>

        {doctor?.image && <Image source={doctor.image} style={s.avatar} />}

        <View style={s.headerInfo}>
          <Text style={s.name}>{doctor?.name || "Doctor"}</Text>
          <View style={globalStyles.row}>
            <View style={s.dot} />
            <Text style={s.online}>Online</Text>
          </View>
        </View>

        <Pressable
          style={s.call}
          onPress={() => navigation.navigate("AudioCall", { doctor })}
        >
          <Ionicons name="call-outline" size={25} color={colors.primaryDark} />
        </Pressable>
      </View>

      <ScrollView
        style={globalStyles.scroll}
        contentContainerStyle={globalStyles.messages}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="interactive"
      >
        <Text style={s.today}>TODAY</Text>
        {messages.map((message) =>
          <MessageBubble key={message.id} message={message} />
        )}
      </ScrollView>

      <ChatInput onSend={sendMessage} onGallery={openGallery} />
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white
  },
  header: {
    height: 120,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    flexDirection: "row",
    alignItems: "center",
  },
  back: {
    width: 48,
    height: 48,
    borderRadius: 11,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginLeft: 12
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  online: {
    marginTop: 5,
    fontSize: 12,
    color: colors.textSecondary
  },
  call: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  today: {
    alignSelf: "center",
    marginBottom: 25,
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
  },
});
