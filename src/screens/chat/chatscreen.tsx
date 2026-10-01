import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/constants/colors";
import { globalStyles } from "@/constants/Styles";

type Message = {
  id: number;
  text: string;
  sender: "user" | "doctor";
  time: string;
};

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
  const doctor = route?.params?.doctor;
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How are you feeling today?",
      sender: "doctor",
      time: "10:30 AM",
    },
  ]);

  

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text, sender: "user", time: "Now" },
    ]);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: getReply(text),
          sender: "doctor",
          time: "Now",
        },
      ]);
    }, 700);
  };

  return (
    
<KeyboardAvoidingView
  style={globalStyles.container}
  behavior={Platform.OS === "ios" ? "padding" : undefined}
>

      <View style={styles.header}>
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={28} color={colors.white} />
        </Pressable>

        <Image source={doctor?.image} style={styles.avatar} />

        <View style={styles.headerInfo}>
          <Text style={styles.doctorName}>{doctor?.name || "Doctor"}</Text>
          <View style={globalStyles.row}>
            <View style={styles.onlineDot} />
            <Text style={styles.online}>Online</Text>
          </View>
        </View>

        <Pressable style={styles.iconButton}>
          <Ionicons
            name="call-outline"
            size={25}
            color={colors.primaryDark}
          />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messages}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.today}>TODAY</Text>

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </ScrollView>

      <View style={styles.inputArea}>
        <Pressable style={styles.iconButton}>
          <Ionicons name="add" size={29} color={colors.primaryDark} />
        </Pressable>

        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          multiline
          style={[globalStyles.input, styles.input]}
        />

        <Pressable style={styles.send} onPress={sendMessage}>
          <Ionicons name="send" size={22} color={colors.white} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const user = message.sender === "user";

  return (
    <View style={[styles.messageRow, user && styles.userRow]}>
      {!user && (
        <View style={styles.doctorIcon}>
          <Ionicons name="medical" size={20} color={colors.primaryDark} />
        </View>
      )}

      <View style={[styles.bubble, user ? styles.userBubble : styles.doctorBubble]}>
        <Text style={[styles.messageText, user && styles.userText]}>
          {message.text}
        </Text>
        <Text style={[styles.time, user && styles.userTime]}>
          {message.time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 120,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
    ...globalStyles.row,
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
    width: 58,
    height: 58,
    borderRadius: 29,
    marginLeft: 15,
  },

  headerInfo: {
    flex: 1,
    marginLeft: 13,
  },

  doctorName: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  onlineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: colors.success,
    marginRight: 6,
  },

  online: {
    marginTop: 5,
    fontSize: 12,
    color: colors.textSecondary,
  },

  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 11,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  messages: {
  flex: 1,
  paddingHorizontal: 17,
  paddingTop: 22,
  paddingBottom: 35,
},

  today: {
    alignSelf: "center",
    marginBottom: 25,
    fontSize: 12,
    fontWeight: "700",
    color: colors.textSecondary,
  },

  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 19,
  },

  userRow: {
    justifyContent: "flex-end",
  },

  doctorIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },

  bubble: {
    maxWidth: "79%",
    paddingHorizontal: 17,
    paddingVertical: 14,
    borderRadius: 17,
  },

  doctorBubble: {
    backgroundColor: "#F0F3F7",
    borderBottomLeftRadius: 4,
  },

  userBubble: {
    backgroundColor: colors.primaryDark,
    borderBottomRightRadius: 4,
  },

  messageText: {
    fontSize: 14,
    lineHeight: 21,
    color: colors.textPrimary,
  },

  userText: {
    color: colors.white,
  },

  time: {
    marginTop: 7,
    alignSelf: "flex-end",
    fontSize: 9,
    color: colors.textSecondary,
  },

  userTime: {
    color: "#DCE6FF",
  },

  inputArea: {
    minHeight: 82,
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    backgroundColor: colors.white,
    ...globalStyles.row,
  },

  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 95,
    marginHorizontal: 10,
    paddingVertical: 11,
    fontSize: 14,
  },

  send: {
    width: 50,
    height: 50,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryDark,
  },
});