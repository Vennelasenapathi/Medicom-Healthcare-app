import React, { useState } from "react";
import {
  Image,
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

type Message = {
  id: number;
  text: string;
  sender: "user" | "doctor";
  time: string;
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

  const getReply = (text: string) => {
    const value = text.toLowerCase();

    if (
      value.includes("chest pain") ||
      value.includes("breathing") ||
      value.includes("shortness")
    )
      return "Chest pain or difficulty breathing can sometimes require urgent attention. Please seek immediate medical care if the symptoms are severe or getting worse.";

    if (
      value.includes("fever") ||
      value.includes("temperature")
    )
      return "For fever, please stay hydrated and monitor your temperature. If the fever is high, persistent, or accompanied by severe symptoms, please consult a doctor.";

    if (
      value.includes("headache") ||
      value.includes("migraine")
    )
      return "For a headache, try resting in a quiet environment and staying hydrated. Please let me know if the headache is severe, unusual, or persistent.";

    if (
      value.includes("medicine") ||
      value.includes("medication") ||
      value.includes("tablet")
    )
      return "Please take your medication exactly as prescribed. If you are experiencing side effects or have questions about a medicine, let me know which medication you are taking.";

    if (
      value.includes("appointment") ||
      value.includes("book")
    )
      return "Sure. You can manage your appointments from the Appointments tab. I can also help you understand your upcoming consultation.";

    if (
      value.includes("report") ||
      value.includes("test")
    )
      return "I can help you understand your medical report. Please make sure the complete report is available so the doctor can review it properly.";

    if (
      value.includes("hello") ||
      value.includes("hi") ||
      value.includes("hey")
    )
      return "Hello! I'm here to help. Please tell me what you are experiencing.";

    if (value.includes("thank"))
      return "You're welcome! Please feel free to message me if you need any further help.";

    return "Thanks for sharing that. Could you tell me a little more about your symptoms or concern so I can guide you better?";
  };

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        sender: "user",
        time: "Now",
      },
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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.back}
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="chevron-back"
            size={28}
            color={colors.white}
          />
        </Pressable>

        <Image
          source={doctor?.image}
          style={styles.headerAvatar}
        />

        <View style={styles.headerInfo}>
          <Text style={styles.doctorName}>
            {doctor?.name || "Doctor"}
          </Text>

          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>Online</Text>
          </View>
        </View>

        <Pressable style={styles.call}>
          <Ionicons
            name="call-outline"
            size={25}
            color={colors.primaryDark}
          />
        </Pressable>
      </View>

      {/* CHAT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.messages}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.today}>TODAY</Text>

        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}
      </ScrollView>

      {/* MESSAGE INPUT */}
      <View style={styles.inputArea}>
        <Pressable style={styles.attach}>
          <Ionicons
            name="add"
            size={29}
            color={colors.primaryDark}
          />
        </Pressable>

        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          style={styles.input}
          multiline
        />

        <Pressable
          style={styles.send}
          onPress={sendMessage}
        >
          <Ionicons
            name="send"
            size={22}
            color={colors.white}
          />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

/* REUSABLE MESSAGE COMPONENT */

function MessageBubble({  message, }: {message: Message;}) {
  const isUser = message.sender === "user";

  return (
    <View  style={[ styles.messageRow,  isUser && styles.userRow, ]}>
      {!isUser && (
        <View style={styles.doctorIcon}>
          <Ionicons
            name="medical"
            size={20}
            color={colors.primaryDark}
          />
        </View>
      )}

      <View style={[ styles.bubble,  isUser ? styles.userBubble : styles.doctorBubble, ]}>
        <Text
          style={[
            styles.messageText,
            isUser && styles.userMessageText,
          ]}
        >
          {message.text}
        </Text>

        <Text  style={[  styles.messageTime, isUser && styles.userTime, ]} >
          {message.time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  /* HEADER */

  header: {
    height: 120,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },

  back: {
    width: 48,
    height: 48,
    borderRadius: 11,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },

  headerAvatar: {
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

  onlineRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },

  onlineDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#35B779",
    marginRight: 6,
  },

  onlineText: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  call: {
    width: 48,
    height: 48,
    borderRadius: 11,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  /* MESSAGES */

  messages: {
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
    width: "100%",
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
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
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

  userMessageText: {
    color: colors.white,
  },

  messageTime: {
    marginTop: 7,
    alignSelf: "flex-end",
    fontSize: 9,
    color: colors.textSecondary,
  },

  userTime: {
    color: "#DCE6FF",
  },

  /* INPUT */

  inputArea: {
    minHeight: 82,
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderLight,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
  },

  attach: {
    width: 48,
    height: 48,
    borderRadius: 11,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },

  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 95,
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 11,
    borderRadius: 11,
    backgroundColor: colors.background,
    fontSize: 14,
    color: colors.textPrimary,
  },

  send: {
    width: 50,
    height: 50,
    borderRadius: 11,
    backgroundColor: colors.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },
});