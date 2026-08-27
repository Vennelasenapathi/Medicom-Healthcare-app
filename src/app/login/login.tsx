import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import {loginValidationSchema} from "../../validations/validation";

export default function Login() {
    const router = useRouter();
    /* =========================  STATES========================= */

    const [showPassword, setShowPassword] = useState(false);
    // Login errors are separate
    const [emailLoginError, setEmailLoginError] =  useState(false);
    const [passwordLoginError, setPasswordLoginError] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);    

    /* ========================= LOGIN FUNCTION========================= */

    const handleLogin = (
        email: string,
        password: string
    ) => {
        const correctEmail = "vennela@medicom.com";
        const correctPassword = "12345678";

        // Reset previous login errors
        setEmailLoginError(false);
        setPasswordLoginError(false);
        setLoginSuccess(false);

        /* Check email separately */
        const isEmailCorrect = email.trim().toLowerCase() === correctEmail;

        /*Check password separately*/
        const isPasswordCorrect = password === correctPassword;

        /*Wrong email*/

        if (!isEmailCorrect) {
            setEmailLoginError(true);
        }

        /* Wrong password */

        if (!isPasswordCorrect) {
            setPasswordLoginError(true);
        }
        /*Both are correct */
        if ( isEmailCorrect && isPasswordCorrect ) {
            setLoginSuccess(true);
            setTimeout(() => {
            }, 500);
        }
    };

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={ Platform.OS === "ios" ? "padding" : undefined }
        >
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={ loginValidationSchema }
                onSubmit={(values) => {
                    handleLogin(
                        values.email,
                        values.password
                    );
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldTouched,
                }) => (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View className="flex-1 px-6 pt-[125px]">

                            {/* =========================LOGO========================= */}
                            <View className="items-center">
                                <Image
                                    source={require("../../../assets/images/medicom/Logo2.png")}
                                    resizeMode="contain"
                                    className="h-[68px] w-[68px]"
                                />
                            </View>
                            {/* =========================HEADING========================= */}
                            <View className="mt-8 items-center">
                                <Text className="text-[22px] font-bold text-[#011133]">
                                    Log in to your account
                                </Text>
                                <Text className="mt-1 text-[14px] text-[#989898]">
                                    Your journey to better health starts here!
                                </Text>
                            </View>

                            {/* ========================= EMAIL ========================= */}
                            <View className="mt-10">
                                <View
                                    className="h-[58px] flex-row items-center rounded-lg bg-[#F9FAFB] px-3"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: emailLoginError ||
                                                (touched.email &&
                                                    errors.email)
                                                ? "#FF4D4F"
                                                : "#E5E7EB",
                                    }}
                                >
                                    {/* Email Icon */}
                                    <Ionicons
                                        name="mail-outline"
                                        size={24}
                                        color={  emailLoginError ? "#FF4D4F" : "#989898"
                                    }/>

                                    {/* Email Input */}
                                    <TextInput
                                        value={values.email}
                                        onChangeText={(text) => {
                                            handleChange("email")(text);
                                            setEmailLoginError(false);
                                        }}
                                        onBlur={handleBlur("email")}
                                        placeholder="Enter your email"
                                        placeholderTextColor="#989898"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        className="ml-2 flex-1 text-[16px] text-[#071B44]"
                                    />

                                    {/* Email Check */}

                                    {values.email.length > 0 &&
                                        !errors.email &&
                                        !emailLoginError && (
                                            <Ionicons
                                                name="checkmark"
                                                size={24}
                                                color="#2867FF"
                                            />
                                        )}
                                </View>

                                {/* ========================= EMAIL VALIDATION ERROR ========================= */}
                                {touched.email && errors.email && (
                                        <Text className="mt-1 text-[12px] text-[#FF4D4F]"> {errors.email} </Text>
                                    )}
                                {/* ========================= WRONG EMAIL ========================= */}

                                {emailLoginError &&
                                    !errors.email && (
                                        <Text className="mt-1 text-[12px] text-[#FF4D4F]"> *That email isn't correct </Text>
                                    )}
                            </View>

                            {/* ========================= PASSWORD ========================= */}

                            <View className="mt-4">
                                <View className="h-[58px] flex-row items-center rounded-lg bg-[#F9FAFB] px-3"
                                    style={{
                                        borderWidth: 1,
                                        borderColor: passwordLoginError ||
                                                (touched.password &&
                                                    errors.password)
                                                ? "#FF4D4F"
                                                : loginSuccess
                                                    ? "#4D8DFF"
                                                    : "#E5E7EB",
                                    }}
                                >
                                    {/* Password Icon */}
                                    <Ionicons
                                        name="lock-closed-outline"
                                        size={24}
                                        color={ passwordLoginError ? "#FF4D4F"  : "#989898" }
                                    />
                                    {/* Password Input */}
                                    <TextInput
                                        value={values.password}
                                        onChangeText={(text) => {
                                            handleChange("password")(text);
                                            setPasswordLoginError(false);
                                        }}
                                        onBlur={handleBlur("password")}
                                        placeholder="Enter your password"
                                        placeholderTextColor="#989898"
                                        secureTextEntry={ !showPassword }
                                        className="ml-2 flex-1 text-[16px] text-[#071B44]"
                                    />

                                    {/* Show / Hide Password */}
                                    <Pressable
                                        onPress={() => setShowPassword( !showPassword ) }
                                    >
                                        <Ionicons
                                            name={ showPassword ? "eye-outline" : "eye-off-outline" }
                                            size={24}
                                            color="#717784"
                                        />
                                    </Pressable>
                                </View>
                                {/* ========================= PASSWORD VALIDATION ========================= */}

                                {touched.password && errors.password && (
                                    <Text className="mt-1 text-[12px] text-[#FF4D4F]"> {errors.password} </Text>
                                )}
                                {/* ========================= WRONG PASSWORD ========================= */}

                                {passwordLoginError &&
                                    !errors.password && (
                                        <View className="mt-1 flex-row justify-between">
                                            <Text className="text-[12px] text-[#FF4D4F]">
                                                *That password isn't correct
                                            </Text>
                                        </View>
                                    )}

                                {/* ========================= FORGOT PASSWORD ========================= */}

                                {!passwordLoginError && (
                                    <Pressable onPress={() =>
                                        router.push(
                                            "/forgot-password/forgot-password"
                                        )}>
                                        <Text className="mt-7 text-right text-[16px] font-medium text-[#246AFD]">
                                            Forgot Password?
                                        </Text>
                                    </Pressable>
                                )}
                            </View>

                            {/* ========================= LOGIN BUTTON ========================= */}

                            <Pressable
                                onPress={() => {
                                    /*
                                      Mark both fields as touched
                                      so Yup validation appears
                                    */
                                    setFieldTouched( "email", true );
                                    setFieldTouched( "password",  true );
                                    handleSubmit();
                                }}
                                className="mt-8 h-[58px] items-center justify-center rounded-xl bg-[#2867FF]"
                            >

                                <View className="flex-row items-center">

                                    <Text className="text-[16px] font-semibold text-white">
                                        Log In
                                    </Text>
                                    {/* Right Arrow */}
                                    <Ionicons
                                        name="chevron-forward"
                                        size={16}
                                        color="#FFFFFF"
                                        style={{
                                            marginLeft: 3,
                                        }}
                                    />
                                </View>
                            </Pressable>

                            {/* ========================= SIGN UP ========================= */}

                            <View className="mt-7 flex-row justify-center">

                                <Text className="text-[13px] text-[#717784">
                                    Don't have an account?{" "}
                                </Text>

                                <Pressable
                                    onPress={() =>
                                        router.push(
                                            "/signup/signup"
                                        )
                                    }
                                >
                                    <Text className="text-[13px] font-medium text-[#246AFD]">
                                        Sign Up
                                    </Text>
                                </Pressable>

                            </View>

                            {/* ========================= DIVIDER========================= */}

                            {/* <View className="mt-7 h-[21px] flex-row items-center">
                                <View className="h-[1px] flex-1 bg-[#989898]" />
                                <Text className="mx-3 text-[10px] text-[#989898]">
                                    OR
                                </Text>
                                <View className="h-[1px] flex-1 bg-[#989898]" />
                            </View> */}

                            {/* =========================GOOGLE ========================= */}

                             {/* <Pressable
                                onPress={toggleColor}
                                className="mt-8 h-[56px] flex-row items-center justify-center rounded-lg border border-[#EEEEEE] bg-[#FAFAFA]"
                            >

                                <Ionicons
                                    name="logo-google"
                                    size={18}
                                    color={iconColor}
                                />
                                <Text className="ml-2 text-[12px] text-[#717784]">
                                    Continue with Google
                                </Text>
                            </Pressable> */}

                            {/* ========================= APPLE ========================= */}

                            {/* <Pressable
                                className="mt-2 h-[56px] flex-row items-center justify-center rounded-lg border border-[#EEEEEE] bg-[#FAFAFA]"
                            >
                                <Ionicons
                                    name="logo-apple"
                                    size={18}
                                    color="#333333"
                                />
                                <Text className="ml-2 text-[12px] text-[#717784]">
                                    Continue with Apple
                                </Text>
                            </Pressable>  */}
                        </View>
                    </ScrollView>
                )}
            </Formik>

            {/* ========================= SUCCESS POPUP ========================= */}

            {loginSuccess && (
                <View className="absolute inset-0 items-center justify-center bg-black/20">
                    <View className="mx-10 w-[90%] h-[377px] rounded-xl bg-white px-6 py-6">
                        {/* Success Icon */}

                        <View className="mb-5 self-center rounded-full bg-[#F0F4FF] p-5">

                            <View className="h-[102px] w-[102px] items-center justify-center rounded-full bg-[#E7EEFF]">

                                <Ionicons
                                    name="checkmark"
                                    size={60}
                                    color="#246AFD"
                                />
                            </View>
                        </View>

                        {/* Title */}

                        <Text className="text-center text-[22px] font-bold text-[#011133]">
                            Welcome back!
                        </Text>

                        {/* Description */}

                        <Text className="mt-4 text-center text-[13px] leading-4 text-[#989898]">
                            You've successfully logged into the{"\n"}
                            Medicom app.
                        </Text>

                        {/* Home Button */}

                        <Pressable
                            onPress={() => router.replace("/") }
                            className="mt-8 h-[56px] flex-row items-center justify-center rounded-xl bg-[#246AFD]"
                        >
                            <Text className="text-[16px] font-semibold text-white">
                                Go to Home
                            </Text>
                            <Ionicons
                                name="chevron-forward"
                                size={15}
                                color="#FFFFFF"
                                style={{
                                    marginLeft: 3,
                                }}
                            />
                        </Pressable>
                    </View>
                </View>
            )}
        </KeyboardAvoidingView>
    );
}