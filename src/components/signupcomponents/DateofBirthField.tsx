import React, { useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker,{DateTimePickerEvent} from "@react-native-community/datetimepicker";

import { colors } from "../../constants/colors";

type Props = {
    value: string;
    touched?: boolean;
    error?: string;
    onChange: (value: string) => void;
    onBlur: () => void;
};

const parseDate = (date: string) => {
    const [day, month, year] = date.split("/").map(Number);
    return new Date(year, month - 1, day);
};

export default function DateOfBirthField({
    value,
    touched,
    error,
    onChange,
    onBlur,
}: Props) {
    const [showPicker, setShowPicker] = useState(false);

    const pickDate = (event: DateTimePickerEvent, date?: Date) => {
        setShowPicker(false);

        if (event.type !== "set" || !date) return;

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        onChange(`${day}/${month}/${year}`);
        onBlur();
    };

    return (
        <View>
            <Pressable
                onPress={() => setShowPicker(true)}
                className="h-[50px] flex-row items-center rounded-lg px-3"
                style={{
                    backgroundColor: colors.background,
                    borderWidth: 1,
                    borderColor:
                        touched && error
                            ? colors.error
                            : value
                                ? colors.primaryLight
                                : colors.border,
                }}
            >
                <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={value ? colors.primaryDark : colors.dobcolor}
                />

                <Text
                    className={`ml-3 flex-1 text-[12px] ${value ? "text-[#071B44]" : "text-[#989898]"
                        }`}
                >
                    {value || "Date of birth (DD/MM/YYYY)"}
                </Text>

                {value && !error && touched && (
                    <Ionicons
                        name="checkmark"
                        size={19}
                        color={colors.primaryDark}
                    />
                )}
            </Pressable>

            {showPicker && (
                <DateTimePicker
                    value={value ? parseDate(value) : new Date()}
                    mode="date"
                    display={
                        Platform.OS === "android"
                            ? "calendar"
                            : "spinner"
                    }
                    maximumDate={new Date()}
                    onChange={pickDate}
                />
            )}

            {touched && error && (
                <Text
                    className="mt-1 text-[9px]"
                    style={{ color: colors.error }}
                >
                    {error}
                </Text>
            )}
        </View>
    );
}