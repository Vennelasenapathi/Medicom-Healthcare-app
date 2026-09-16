import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import ForgotPasswordSteps from "@/components/forgotpasswordcomponents/forgotpasswordsteps";
import SuccessModal from "@/components/common/SuccessModal";

import { colors } from "@/constants/colors";

type Step = "forgot" | "otp" | "password";
type Mode = "email" | "phone";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ForgotPasswordFlow({
  visible,
  onClose,
}: Props) {
  /* =====================================================
     STEP STATE
  ===================================================== */

  const [step, setStep] = useState<Step>("forgot");

  const [mode, setMode] = useState<Mode>("email");

  const [timer, setTimer] = useState(15);

  const [otpError, setOtpError] = useState(false);

  const [success, setSuccess] = useState(false);
  const [successVisible,setSuccessVisible]=useState(false);

  /* =====================================================
     OTP TIMER
  ===================================================== */

  useEffect(() => {
    if (step !== "otp" || timer <= 0) {
      return;
    }

    const id = setInterval(() => {
      setTimer((previous) => previous - 1);
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [step, timer]);

  /* =====================================================
     CLOSE FLOW
  ===================================================== */

  const closeFlow = () => {
    setStep("forgot");
    setMode("email");
    setTimer(15);
    setOtpError(false);
    setSuccess(false);

    onClose();
  };

  /* =====================================================
     FORGOT PASSWORD → OTP
  ===================================================== */

  const handleForgotNext = () => {
    setTimer(15);
    setOtpError(false);
    setStep("otp");
  };

  /* =====================================================
     OTP → PASSWORD
  ===================================================== */

  const handleOtpNext = () => {
    setOtpError(false);
    setStep("password");
  };

  /* =====================================================
     BACK BUTTON
  ===================================================== */

  const handleBack = () => {
    if (step === "forgot") {
      closeFlow();
      return;
    }

    if (step === "otp") {
      setOtpError(false);
      setStep("forgot");
      return;
    }

    if (step === "password") {
      setStep("otp");
    }
  };

  /* =====================================================
     OTP CHANGE
  ===================================================== */

  const handleOtpChange = (otp: string) => {
    if (otp.length === 6) {
      setOtpError(false);
    }
  };

  /* =====================================================
     RESEND OTP
  ===================================================== */

  const handleResend = () => {
    setTimer(15);
    setOtpError(false);
  };

  /* =====================================================
     PASSWORD SUCCESS
  ===================================================== */

  const handlePasswordSuccess = () => {
    setSuccess(true);
    setSuccessVisible(true);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={closeFlow}
    >
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scroll}
        >
          <View style={styles.content}>

            {/* =================================================
                ONE COMPONENT FOR ALL THREE STEPS
            ================================================= */}

            <ForgotPasswordSteps
              step={step}
              mode={mode}
              timer={timer}
              otpError={otpError}
              onModeChange={setMode}
              onForgotNext={ handleForgotNext }
              onOtpNext={ handleOtpNext  }
              onBack={ handleBack }
              onOtpChange={ handleOtpChange }
              onResend={ handleResend  }
              onPasswordSuccess={handlePasswordSuccess }
            />

          </View>
        </ScrollView>

        {/* =================================================
            SUCCESS MODAL
        ================================================= */}

        {success && (
          <SuccessModal
          visible={successVisible}
            title="Password Updated"
            description="Your new password is ready to use."
            buttonTitle="Proceed to Login"
            onPress={closeFlow}
          />
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  scroll: {
    flexGrow: 1,
  },

  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
  },
});