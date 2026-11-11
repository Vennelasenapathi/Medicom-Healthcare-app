
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const items = [
  { label: "Gallery", icon: "images", color: "#7C4DFF" },
  { label: "Camera", icon: "camera", color: "#E44868" },
  { label: "Document", icon: "document-text", color: "#3285E8" },
  { label: "Location", icon: "location", color: "#32A879" },
  { label: "Audio", icon: "musical-notes", color: "#E6A12A" },
  { label: "Contact", icon: "person", color: "#249DAB" },
  { label: "Medical report", icon: "medkit", color: "#D9534F" },
  { label: "Other files", icon: "folder", color: "#718096" },
];

export default function AttachmentMenu({
  onSelect,
}: {
  onSelect: (label: string) => void;
}) {
  return (
    <View style={s.panel}>
      {items.map((item) => (
        <Pressable
          key={item.label}
          style={s.option}
          onPress={() => onSelect(item.label)}
        >
          <View style={[s.icon, { backgroundColor: item.color }]}>
            <Ionicons name={item.icon as any} size={25} color="#FFF" />
          </View>
          <Text style={s.label}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const s = StyleSheet.create({
  panel: {
    flexDirection: "row", 
    flexWrap: "wrap",
    justifyContent: "flex-start", 
    paddingTop: 14,
  },
  option: { 
    width: "25%", 
    alignItems: "center", 
    marginBottom: 18 
},
  icon: {
    width: 52, 
    height: 52, 
    borderRadius: 17,
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 7,
  },
  label: { 
    fontSize: 11, 
    color: "#011133", 
    textAlign: "center" 
},
});
