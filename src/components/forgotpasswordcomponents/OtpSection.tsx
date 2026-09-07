import React, { useRef } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors } from "@/constants/colors";

type Props = {
  otp: string;
  error?: boolean;
  onChange: (otp: string) => void;
};

export default function OTPSection({
  otp,
  error,
  onChange,
}: Props) {
  const refs = useRef<(TextInput | null)[]>([]);

  const updateOTP = (index: number, text: string) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const values = otp.split("");

    values[index] = digit;
    onChange(values.join(""));

    if (digit && index < 5) {
      refs.current[index + 1]?.focus();
    }

    if (digit && index === 5) {
      Keyboard.dismiss();
    }
  };

  return (
    <View>
      <View style={styles.container}>
        {Array.from({ length: 6 }).map((_, index) => {
          const digit = otp[index] || "";

          return (
            <TextInput
              key={index}
              ref={(ref) => {
                refs.current[index] = ref;
              }}
              value={digit}
              onChangeText={(text) =>
                updateOTP(index, text)
              }
              onKeyPress={({ nativeEvent }) => {
                if ( nativeEvent.key === "Backspace" && !digit && index > 0  ) {
                  refs.current[index - 1]?.focus();
                }
              }}
              keyboardType="number-pad"
              maxLength={1}
              selectTextOnFocus
              textAlign="center"
              style={[styles.input,
                {
                  borderColor: error
                    ? colors.error
                    : digit
                    ? colors.primaryLight
                    : colors.borderLight,
                },
              ]}
            />
          );
        })}
      </View>

      {error && (
        <Text style={styles.error}>
          Incorrect OTP. Please try again.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.background,
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  error: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 12,
    color: colors.error,
  },
});