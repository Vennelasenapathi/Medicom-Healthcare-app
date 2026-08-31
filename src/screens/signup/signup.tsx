import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Image,
    Text,
    View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import DateOfBirthField from "@/components/signupcomponents/DateofBirthField";
import AppButton from "@/components/common/AppButton";
import InputField from "@/components/common/InputField";
import PasswordField from "@/components/common/PasswordField";
import GenderSelector from "@/components/signupcomponents/Genderselector";
import SuccessModal from "@/components/common/SuccessModal";
import ScreenHeader from "@/components/common/ScreenHeader";
import { signupValidationSchema } from "@/validations/signupvalidation";
import { colors } from "@/constants/colors";

const parseDate = (date: string) => {
    const [day, month, year] = date.split("/").map(Number);
    return new Date(year, month - 1, day);
};

export default function Signup({ navigation }: any) {
    const [showPicker, setShowPicker] = useState(false);
    const [success, setSuccess] = useState(false);

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    dob: "",
                    gender: "",
                    height: "",
                    weight: "",
                    terms: false,
                }}
                validationSchema={signupValidationSchema}
                onSubmit={(values) => {
                    console.log(values);
                    setSuccess(true);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                }) => {
                    const valid = (field: keyof typeof values) =>
                        !!touched[field] && !errors[field] &&
                        String(values[field]).length > 0;
                    return (
                        <>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={{ flexGrow: 1, paddingBottom: 30, }}
                            >
                                <View className="flex-1 px-8 pt-[100px]">
                                    {/* Logo */}
                                    <View className="items-center">
                                        <Image
                                            source={require("../../../assets/images/medicom/Logo2.png")}
                                            className="h-[68px] w-[68px]"
                                            resizeMode="contain"
                                        />
                                    </View>
                                    {/* Heading */}
                                    <View className=" items-center">
                                        <ScreenHeader title="Create Your Account" subtitle="Create an account to get started" />
                                    </View>
                                    {/* Name */}
                                    <View className="mt-6">
                                        <InputField
                                            icon="person-outline"
                                            value={values.name}
                                            onChangeText={(text) => setFieldValue("name", text)}
                                            onBlur={() => setFieldTouched("name", true)}
                                            placeholder="Enter your name"
                                            touched={touched.name}
                                            error={errors.name}
                                            valid={valid("name")}
                                            autoCapitalize="words"
                                        />
                                    </View>
                                    {/* Email */}
                                    <View className="mt-3">
                                        <InputField
                                            icon="mail-outline"
                                            value={values.email}
                                            onChangeText={(text) => setFieldValue("email", text)}
                                            onBlur={() => setFieldTouched("email", true)}
                                            placeholder="Enter your email"
                                            touched={touched.email}
                                            error={errors.email}
                                            valid={valid("email")}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                        />
                                    </View>
                                    {/* Password */}
                                    <View className="mt-3">
                                        <PasswordField
                                            value={values.password}
                                            onChangeText={(text) => setFieldValue("password", text)}
                                            onBlur={() => setFieldTouched("password", true)}
                                            touched={touched.password}
                                            error={errors.password}
                                        />
                                    </View>
                                    {/* DOB */}
                                    <View className="mt-3">
                                            <DateOfBirthField
                                                value={values.dob}
                                                touched={touched.dob}
                                                error={errors.dob}
                                                onChange={(date) => setFieldValue("dob", date)}
                                                onBlur={() => setFieldTouched("dob", true)}
                                            />
                                    </View>

                                    {/* Gender */}
                                    <View className="mt-3">
                                        <GenderSelector
                                            value={values.gender}
                                            onChange={(value) => setFieldValue("gender", value)}
                                            touched={touched.gender}
                                            error={errors.gender}
                                        />
                                    </View>

                                    {/* Height + Weight */}
                                    <View className="mt-3 flex-row gap-3">
                                        <View className="flex-1">
                                            <InputField
                                                icon="resize-outline"
                                                value={values.height}
                                                onChangeText={(text) =>
                                                    setFieldValue("height", text.replace(/[^0-9.]/g, ""))
                                                }
                                                onBlur={() => setFieldTouched("height", true)}
                                                placeholder="Height"
                                                touched={touched.height}
                                                error={errors.height}
                                                valid={valid("height")}
                                                keyboardType="decimal-pad"
                                            />
                                        </View>

                                        <View className="flex-1">
                                            <InputField
                                                icon="scale-outline"
                                                value={values.weight}
                                                onChangeText={(text) =>
                                                    setFieldValue("weight", text.replace(/[^0-9.]/g, ""))}
                                                onBlur={() => setFieldTouched("weight", true)}
                                                placeholder="Weight"
                                                touched={touched.weight}
                                                error={errors.weight}
                                                valid={valid("weight")}
                                                keyboardType="decimal-pad"
                                            />
                                        </View>
                                    </View>

                                    {/* Terms */}
                                    <Pressable
                                        onPress={() => setFieldValue("terms", !values.terms)}
                                        className="mt-4 flex-row items-start"
                                    >
                                        <View
                                            className="h-5 w-5 mb-4 items-center justify-center rounded"
                                            style={{
                                                borderWidth: 1,
                                                borderColor: values.terms ? colors.primaryDark : colors.border,
                                                backgroundColor: values.terms ? colors.primaryDark : colors.white,
                                            }}
                                        >
                                            {values.terms && (
                                                <Ionicons
                                                    name="checkmark"
                                                    size={13}
                                                    color={colors.white}
                                                />
                                            )}
                                        </View>
                                        <Text className="ml-2 flex-1 text-[12px] leading-4 " style={{ color: colors.textSecondary }}>
                                            I confirm that the information provided is accurate.
                                        </Text>
                                    </Pressable>

                                    {/* Sign Up */}
                                    <AppButton
                                        title="Sign Up"
                                        onPress={() => {
                                            Object.keys(values).forEach((field) =>
                                                setFieldTouched(field as any, true)
                                            );
                                            handleSubmit();
                                        }}
                                    />

                                    {/* Login */}
                                    <View className="mt-4 flex-row justify-center">
                                        <Text className="text-[14px] " style={{ color: colors.textSecondary }}> Already have an account?{" "} </Text>
                                        <Pressable onPress={() => navigation.navigate("Login")}  >
                                            <Text className="text-[14px] font-medium " style={{ color: colors.primaryDark }}> Log In </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </ScrollView>

                            {/* Success */}
                            {success && (
                                <SuccessModal
                                    title="All Set!"
                                    description="You've successfully created your account."
                                    buttonTitle="Get Started"
                                    onPress={() => navigation.replace("SplashScreen")}
                                />
                            )}
                        </>
                    );
                }}
            </Formik>
        </KeyboardAvoidingView>
    );
}