import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Formik } from "formik";
import ForgotPasswordForm from "../../components/forgotpasswordcomponents/forgotpasswordform";
import OTPSection from "../../components/forgotpasswordcomponents/OtpSection";
import CreatePasswordForm from "../../components/forgotpasswordcomponents/Createpassword";
import BackButton from "../../components/forgotpasswordcomponents/BackButton";
import ScreenHeader from "@/components/common/ScreenHeader";
import AppButton from "@/components/common/AppButton";
import SuccessModal from "@/components/common/SuccessModal";
import { otpValidationSchema } from "@/validations/forgotpassword";
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
    const [step, setStep] = useState<Step>("forgot");
    const [mode, setMode] = useState<Mode>("email");
    const [timer, setTimer] = useState(15);
    const [otpError, setOtpError] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (step !== "otp" || timer <= 0) return;
        const id = setInterval(
            () => setTimer((t) => t - 1),
            1000
        );
        return () => clearInterval(id);
    }, [step, timer]);

    const closeFlow = () => {
        setStep("forgot");
        setMode("email");
        setTimer(15);
        setOtpError(false);
        setSuccess(false);
        onClose();
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
                    Platform.OS === "ios" ? "padding" : undefined
                }
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={styles.scroll}
                >
                    <View style={styles.content}>

                        {/* FORGOT */}
                        {step === "forgot" && (
                            <ForgotPasswordForm
                                mode={mode}
                                onModeChange={setMode}
                                onNext={() => {
                                    setTimer(15);
                                    setStep("otp");
                                }}
                                onBack={closeFlow}
                            />
                        )}

                        {/* OTP */}
                        {step === "otp" && (
                            <Formik
                                initialValues={{ otp: "" }}
                                validationSchema={otpValidationSchema}
                                onSubmit={(values) => {
                                    if (values.otp.length !== 6) {
                                        setOtpError(true);
                                        return;
                                    }
                                    setOtpError(false);
                                    setStep("password");
                                }}
                            >
                                {({
                                    values,
                                    handleSubmit,
                                    setFieldValue,
                                }) => (
                                    <>
                                        <BackButton
                                            onPress={() => setStep("forgot")}
                                        />

                                        <ScreenHeader
                                            title="Confirm OTP"
                                            subtitle="Code has been sent to your registered number"
                                        />

                                        <OTPSection
                                            otp={values.otp}
                                            error={otpError}
                                            onChange={(value) => {
                                                setFieldValue("otp", value);
                                                setOtpError(false);
                                            }}
                                        />

                                        <View style={styles.button}>
                                            <AppButton
                                                title="Submit"
                                                onPress={() => handleSubmit()}
                                            />
                                        </View>

                                        <View style={styles.resend}>
                                            <Text style={styles.resendText}>
                                                Didn't receive code?{" "}
                                            </Text>

                                            {timer > 0 ? (
                                                <Text style={styles.resendText}>
                                                    Resend in {timer}s
                                                </Text>
                                            ) : (
                                                <Pressable
                                                    onPress={() => setTimer(15)}
                                                >
                                                    <Text style={styles.resendButton}>
                                                        Resend
                                                    </Text>
                                                </Pressable>
                                            )}
                                        </View>
                                    </>
                                )}
                            </Formik>
                        )}

                        {/* PASSWORD */}
                        {step === "password" && (
                            <CreatePasswordForm
                                onBack={() => setStep("otp")}
                                onSuccess={() => setSuccess(true)}
                            />
                        )}

                    </View>
                </ScrollView>

                {/* SUCCESS */}
                {success && (
                    <SuccessModal
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

    button: {
        marginTop: 30,
    },

    resend: {
        marginTop: 28,
        flexDirection: "row",
        justifyContent: "center",
    },

    resendText: {
        fontSize: 14,
        color: colors.textSecondary,
    },

    resendButton: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.primaryDark,
    },
});