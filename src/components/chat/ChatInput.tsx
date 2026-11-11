
import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { EmojiPicker } from "rn-expo-emoji-picker/flatlist";
import { colors } from "@/constants/colors";
import AttachmentMenu from "./AttachmentMenu";

export default function ChatInput({onSend,onGallery,}: {
  onSend: (text: string) => void;
  onGallery: () => void;
}) {
  const [text, setText] = useState("");
  const [attachments, setAttachments] = useState(false);
  const [emojis, setEmojis] = useState(false);

  function send() {
    if (!text.trim()) return;

    onSend(text.trim());
    setText("");
    setEmojis(false);
    setAttachments(false);
    Keyboard.dismiss();
  }

  function selectAttachment(label: string) {
    setAttachments(false);
    if (label === "Gallery") onGallery();
  }

  return (
    <View style={s.container}>
      {/* Outside tap area */}
      {emojis && (
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => setEmojis(false)}
        />
      )}

      {/* Input Row */}
      <View style={s.row}>
        <Pressable
          style={s.icon}
          onPress={() => {
            setAttachments(!attachments);
            setEmojis(false);
            Keyboard.dismiss();
          }}
        >
          <Ionicons
            name={attachments ? "close" : "add"}
            size={29}
            color={colors.primaryDark}
          />
        </Pressable>

        <TextInput
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor="#999"
          multiline
          style={s.input}
          onFocus={() => {
            setEmojis(false);
            setAttachments(false);
          }}
        />

        <Pressable
          style={s.emoji}
          onPress={() => {
            setEmojis(!emojis);
            setAttachments(false);
            Keyboard.dismiss();
          }}
        >
          <Ionicons
            name="happy-outline"
            size={25}
            color={colors.primaryDark}
          />
        </Pressable>

        <Pressable style={s.send} onPress={send}>
          <Ionicons name="send" size={22} color={colors.white} />
        </Pressable>
      </View>

      {/* Attachment Menu */}
      {attachments && (
        <AttachmentMenu onSelect={selectAttachment} />
      )}

      {/* Emoji Picker */}
      {emojis && (
        <View style={s.picker}>
          <EmojiPicker
            onEmojiSelected={(emoji) =>
              setText((previous) => previous + emoji.emoji)
            }
          />
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 9,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: colors.white,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 40,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 95,
    marginHorizontal: 8,
    paddingVertical: 11,
    fontSize: 14,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 11,
  },
  emoji: {
    width: 34,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  send: {
    width: 48,
    height: 48,
    marginLeft: 5,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryDark,
  },
  picker: {
    height: 280,
    marginTop: 10,
    overflow: "hidden",
    borderRadius: 14,
    backgroundColor: colors.white,
    zIndex: 2,
    elevation: 2,
  },
});
