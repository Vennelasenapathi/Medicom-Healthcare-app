import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    Image,
    TextInput,
    View,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import { signupValidationSchema } from "@/validations/signupvalidation";

/* =====================================================
   COMPONENT
===================================================== */
const parseDate = (dateString: string) => {
    const [day, month, year] =
        dateString.split("/").map(Number);

    return new Date(
        year,
        month - 1,
        day
    );
};

export default function Signup({navigation}:any) {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    return (
        <KeyboardAvoidingView
            className="flex-1 bg-white"
            behavior={
                Platform.OS === "ios"
                    ? "padding"
                    : undefined
            }
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
                    console.log("Signup values:", values);
                    setShowSuccess(true);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                }) => {
                    /* ========================================== FIELD VALIDATION HELPERS ========================================== */

                    const isValid = (field: keyof typeof values
                    ) => {
                        return (
                            touched[field] &&
                            !errors[field] &&
                            String(values[field]).length > 0
                        );
                    };
                    const hasError = (field: keyof typeof values
                    ) => {
                        return (touched[field] && !!errors[field]);
                    };
                    return (
                        <>
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="handled"
                                contentContainerStyle={{
                                    flexGrow: 1,
                                    paddingBottom: 30,
                                }}
                            >
                                <View className="flex-1 px-8 pt-[100px]">

                                    {/* ================================================= LOGO ================================================= */}

                                    <View className="items-center">
                                        <View className="items-center">
                                            <Image
                                                source={require("../../../assets/images/medicom/Logo2.png")}
                                                resizeMode="contain"
                                                className="h-[68px] w-[68px]"
                                            />
                                        </View>
                                    </View>

                                    {/* ================================================= HEADING ================================================= */}

                                    <View className="mt-8 items-center">
                                        <Text className="text-[22px] font-bold text-[#011133]">
                                            Create Your Account
                                        </Text>

                                        <Text className="mt-3 text-[13px] text-[#989898]">
                                            Create an account to get started
                                        </Text>

                                    </View>

                                    {/* ================================================= NAME ================================================= */}

                                    <View className="mt-6">
                                        <View className="h-[56px] flex-row items-center rounded-lg bg-[#F9FAFB] px-3"
                                            style={{
                                                borderWidth: 1,
                                                borderColor:
                                                    hasError("name")
                                                        ? "#FF4D4F"
                                                        : isValid("name")
                                                            ? "#8DB2FF"
                                                            : "#E5E7EB",
                                            }}
                                        >
                                            <Ionicons
                                                name="person-outline"
                                                size={20}
                                                color={
                                                    hasError("name")
                                                        ? "#FF4D4F"
                                                        : isValid("name")
                                                            ? "#246AFD"
                                                            : "#A5A9B1"
                                                }
                                            />
                                            <TextInput
                                                value={values.name}
                                                onChangeText={handleChange("name")}
                                                onBlur={handleBlur("name")}
                                                placeholder="Enter your name"
                                                placeholderTextColor="#989898"
                                                autoCapitalize="words"
                                                className="ml-2 flex-1 text-[16px] text-[#011133]"
                                            />

                                            {isValid("name") && (
                                                <Ionicons
                                                    name="checkmark"
                                                    size={18}
                                                    color="#246AFD"
                                                />
                                            )}
                                        </View>
                                        {hasError("name") && (
                                            <Text className="mt-1 text-[9px] text-[#FF4D4F]">
                                                {errors.name}
                                            </Text>
                                        )}
                                    </View>

                                    {/* ================================================= EMAIL ================================================= */}

                                    <View className="mt-3">
                                        <View className="h-[56px] flex-row items-center rounded-xl bg-[#F9FAFB] px-3"
                                            style={{
                                                borderWidth: 1,
                                                borderColor:
                                                    hasError("email")
                                                        ? "#FF4D4F"
                                                        : isValid("email")
                                                            ? "#8DB2FF"
                                                            : "#E5E7EB",
                                            }}
                                        >
                                            <Ionicons
                                                name="mail-outline"
                                                size={20}
                                                color={
                                                    hasError("email")
                                                        ? "#FF4D4F"
                                                        : isValid("email")
                                                            ? "#246AFD"
                                                            : "#A5A9B1"
                                                }
                                            />
                                            <TextInput
                                                value={values.email}
                                                onChangeText={handleChange("email")}
                                                onBlur={handleBlur("email")}
                                                placeholder="Enter your email"
                                                placeholderTextColor="#989898"
                                                keyboardType="email-address"
                                                autoCapitalize="none"
                                                autoCorrect={false}
                                                className="ml-2 flex-1 text-[16px] text-[#011133]"
                                            />

                                            {isValid("email") && (
                                                <Ionicons
                                                    name="checkmark"
                                                    size={18}
                                                    color="#246AFD"
                                                />
                                            )}
                                        </View>
                                        {hasError("email") && (
                                            <Text className="mt-1 text-[9px] text-[#FF4D4F]">
                                                {errors.email}
                                            </Text>
                                        )}
                                    </View>

                                    {/* ================================================= PASSWORD ================================================= */}
                                    <View className="mt-3">
                                        <View className="h-[56px] flex-row items-center rounded-lg bg-[#F9FAFB] px-3"
                                            style={{
                                                borderWidth: 1,
                                                borderColor:
                                                    hasError("password")
                                                        ? "#FF4D4F"
                                                        : isValid("password")
                                                            ? "#8DB2FF"
                                                            : "#E5E7EB",
                                            }}
                                        >
                                            <Ionicons
                                                name="lock-closed-outline"
                                                size={20}
                                                color={
                                                    hasError("password")
                                                        ? "#FF4D4F"
                                                        : isValid("password")
                                                            ? "#246AFD"
                                                            : "#A5A9B1"
                                                }
                                            />

                                            <TextInput
                                                value={values.password}
                                                onChangeText={handleChange("password")}
                                                onBlur={handleBlur("password")}
                                                placeholder="Enter your password"
                                                placeholderTextColor="#989898"
                                                secureTextEntry={!showPassword}
                                                autoCapitalize="none"
                                                className="ml-2 flex-1 text-[16px] text-[#011133]"
                                            />

                                            <Pressable
                                                onPress={() => setShowPassword(!showPassword)}
                                            >
                                                <Ionicons
                                                    name={showPassword ? "eye-outline" : "eye-off-outline"}
                                                    size={18}
                                                    color="#717784"
                                                />
                                            </Pressable>
                                        </View>

                                        {hasError("password") && (
                                            <Text className="mt-1 text-[9px] text-[#FF4D4F]">
                                                {errors.password}
                                            </Text>
                                        )}
                                    </View>

                                    {/* =================================================  DATE OF BIRTH ================================================= */}

                                    <View className="mt-3">

                                        <View
                                            className="h-[50px] flex-row items-center rounded-lg bg-[#F9FAFB] px-3"
                                            style={{
                                                borderWidth: 1,
                                                borderColor:
                                                    touched.dob && errors.dob
                                                        ? "#FF4D4F"
                                                        : values.dob
                                                            ? "#8DB2FF"
                                                            : "#E5E7EB",
                                            }}
                                        >
                                            {/* Calendar Icon */}
                                            <Pressable onPress={() => setShowDatePicker(true)} >
                                                <Ionicons
                                                    name="calendar-outline"
                                                    size={19}
                                                    color={
                                                        touched.dob && errors.dob
                                                            ? "#FF4D4F"
                                                            : values.dob
                                                                ? "#2867FF"
                                                                : "#A5A9B1"
                                                    }
                                                />
                                            </Pressable>

                                            {/* DOB TextInput */}
                                            <TextInput
                                                value={values.dob}
                                                onChangeText={(text) => {
                                                    const cleaned = text.replace(/[^0-9/]/g, "");
                                                    if (cleaned.length <= 10) {
                                                        setFieldValue("dob", cleaned);
                                                    }
                                                }}
                                                onBlur={handleBlur("dob")}
                                                placeholder="Date of birth (DD/MM/YYYY)"
                                                placeholderTextColor="#989898"
                                                keyboardType="numeric"
                                                maxLength={10}
                                                className="ml-2 flex-1 text-[12px] text-[#071B44]"
                                            />

                                            {/* Check Icon */}
                                            {values.dob && !errors.dob && touched.dob && (
                                                <Ionicons
                                                    name="checkmark"
                                                    size={19}
                                                    color="#2867FF"
                                                />
                                            )}
                                        </View>
                                        {/* Validation Error */}
                                        {touched.dob && errors.dob && (
                                            <Text className="mt-1 text-[9px] text-[#FF4D4F]"> {errors.dob} </Text>
                                        )}
                                        {/* Date Picker */}
                                        {showDatePicker && (
                                            <DateTimePicker
                                                value={values.dob ? parseDate(values.dob) : new Date()}
                                                mode="date"
                                                display="default"
                                                maximumDate={new Date()}
                                                onValueChange={(event, selectedDate) => {
                                                    if (selectedDate) {
                                                        const day = String(selectedDate.getDate()).padStart(2, "0");
                                                        const month = String(
                                                            selectedDate.getMonth() + 1
                                                        ).padStart(2, "0");
                                                        const year = selectedDate.getFullYear();

                                                        const formattedDate = `${day}/${month}/${year}`;

                                                        setFieldValue("dob", formattedDate);
                                                    }

                                                    setShowDatePicker(false);
                                                }}
                                                onDismiss={() => {
                                                    setShowDatePicker(false);
                                                }}
                                            />
                                        )}
                                    </View>
                                    {/* ================================================= GENDER ================================================= */}
                                    <View className="mt-3">
                                        <Text className="mb-2 text-[16px] font-medium text-[#011133]"> Gender </Text>
                                        <View className="flex-row gap-2">
                                            {/* FEMALE */}
                                            <Pressable
                                                onPress={() => setFieldValue("gender", "Female")}
                                                className="h-[56px] flex-1 items-center justify-center rounded-xl"
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: values.gender === "Female" ? "#246AFD" : "#E5E7EB",
                                                    backgroundColor: values.gender === "Female" ? "#F0F5FF" : "#F9FAFB",
                                                }}
                                            >
                                                <Text
                                                    className="text-[14px]"
                                                    style={{
                                                        color: values.gender === "Female" ? "#246AFD" : "#777777",
                                                        fontWeight: values.gender === "Female" ? "600" : "400",
                                                    }}
                                                >
                                                    Female
                                                </Text>
                                            </Pressable>

                                            {/* MALE */}

                                            <Pressable
                                                onPress={() => setFieldValue("gender", "Male")}
                                                className="h-[56px] flex-1 items-center justify-center rounded-lg"
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: values.gender === "Male" ? "#246AFD" : "#E5E7EB",
                                                    backgroundColor: values.gender === "Male" ? "#F0F5FF" : "#F9FAFB",
                                                }}
                                            >
                                                <Text
                                                    className="text-[14px]"
                                                    style={{
                                                        color: values.gender === "Male" ? "#246AFD" : "#777777",
                                                        fontWeight: values.gender === "Male" ? "600" : "400",
                                                    }}
                                                >
                                                    Male
                                                </Text>
                                            </Pressable>

                                            {/* OTHER */}

                                            <Pressable
                                                onPress={() => setFieldValue("gender", "Other")}
                                                className="h-[56px] flex-1 items-center justify-center rounded-lg"
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: values.gender === "Other" ? "#246AFD" : "#E5E7EB",
                                                    backgroundColor: values.gender === "Other" ? "#F0F5FF" : "#F9FAFB",
                                                }}
                                            >
                                                <Text
                                                    className="text-[14px]"
                                                    style={{
                                                        color: values.gender === "Other" ? "#246AFD" : "#777777",
                                                        fontWeight: values.gender === "Other" ? "600" : "400",
                                                    }}
                                                >
                                                    Other
                                                </Text>
                                            </Pressable>
                                        </View>
                                        {touched.gender && errors.gender && (
                                            <Text className="mt-1 text-[12px] text-[#FF4D4F]"> {errors.gender} </Text>
                                        )}
                                    </View>

                                    {/* ================================================= HEIGHT + WEIGHT ================================================= */}

                                    <View className="mt-3 flex-row gap-3">
                                        {/* HEIGHT */}
                                        <View className="flex-1">
                                            <View className="h-[56px] flex-row items-center rounded-xl bg-[#F9FAFB] px-3"
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor:
                                                        hasError("height")
                                                            ? "#FF4D4F"
                                                            : isValid("height")
                                                                ? "#8DB2FF" : "#E5E7EB",
                                                }}
                                            >
                                                <Ionicons
                                                    name="resize-outline"
                                                    size={20}
                                                    color="#989898"
                                                />

                                                <TextInput
                                                    value={values.height}
                                                    onChangeText={(text) => {
                                                        const cleaned = text.replace(/[^0-9.]/g, "");
                                                        setFieldValue("height", cleaned);
                                                    }}
                                                    onBlur={handleBlur("height")}
                                                    placeholder="Height"
                                                    placeholderTextColor="#989898"
                                                    keyboardType="decimal-pad"
                                                    className="ml-2 flex-1 text-[16px] text-[#011133]"
                                                />
                                                <Text className="text-[16px] text-[#989898]"> cm </Text>
                                            </View>

                                            {hasError("height") && (
                                                <Text className="mt-1 text-[8px] text-[#FF4D4F]"> {errors.height} </Text>
                                            )}
                                        </View>

                                        {/* WEIGHT */}
                                        <View className="flex-1">
                                            <View className="h-[56px] flex-row items-center rounded-lg bg-[#F9FAFB] px-3"
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor:
                                                        hasError("weight")
                                                            ? "#FF4D4F"
                                                            : isValid("weight")
                                                                ? "#8DB2FF" : "#E5E7EB",
                                                }}
                                            >
                                                <Ionicons
                                                    name="scale-outline"
                                                    size={20}
                                                    color="#989898"
                                                />
                                                <TextInput
                                                    value={values.weight}
                                                    onChangeText={(text) => {
                                                        const cleaned = text.replace(/[^0-9.]/g, "");
                                                        setFieldValue("weight", cleaned);
                                                    }}
                                                    onBlur={handleBlur("weight")}
                                                    placeholder="Weight"
                                                    placeholderTextColor="#989898"
                                                    keyboardType="decimal-pad"
                                                    className="ml-2 flex-1 text-[16px] text-[#071B44]"
                                                />
                                                <Text className="text-[16px] text-[#989898]"> kg </Text>
                                            </View>
                                            {hasError("weight") && (
                                                <Text className="mt-1 text-[8px] text-[#FF4D4F]"> {errors.weight} </Text>
                                            )}
                                        </View>
                                    </View>

                                    {/* ================================================= TERMS ================================================= */}
                                    <Pressable onPress={() => setFieldValue("terms", !values.terms)}
                                        className="mt-4 flex-row items-start"
                                    >
                                        <View
                                            className="h-[20px] w-[20px] items-center justify-center rounded"
                                            style={{
                                                borderWidth: 1,
                                                borderColor:
                                                    errors.terms &&
                                                        touched.terms
                                                        ? "#FF4D4F"
                                                        : values.terms
                                                            ? "#2867FF" : "#D9DDE5",
                                                backgroundColor: values.terms ? "#2867FF" : "#FFFFFF",
                                            }}
                                        >
                                            {values.terms && (
                                                <Ionicons
                                                    name="checkmark"
                                                    size={13}
                                                    color="#FFFFFF"
                                                />
                                            )}
                                        </View>
                                        <Text className="ml-2 flex-1 text-[12px] leading-4 text-[#989898]">
                                            I confirm that the information provided is accurate.
                                        </Text>
                                    </Pressable>

                                    {touched.terms && errors.terms && (
                                        <Text className="mt-1 text-[9px] text-[#FF4D4F]"> {errors.terms} </Text>
                                    )}
                                    {/* ================================================= SIGN UP BUTTON ================================================= */}

                                    <Pressable onPress={() => {
                                        setFieldTouched("name", true);
                                        setFieldTouched("email", true);
                                        setFieldTouched("password", true);
                                        setFieldTouched("dob", true);
                                        setFieldTouched("gender", true);
                                        setFieldTouched("height", true);
                                        setFieldTouched("weight", true);
                                        setFieldTouched("terms", true);
                                        handleSubmit();
                                    }}
                                        className="mt-5 h-[56px] flex-row items-center justify-center rounded-lg bg-[#2867FF]"
                                    >
                                        <Text className="text-[16px] font-semibold text-white"> Sign Up </Text>
                                        <Ionicons
                                            name="chevron-forward"
                                            size={16}
                                            color="#FFFFFF"
                                            style={{ marginLeft: 3, }}
                                        />
                                    </Pressable>

                                    {/* ================================================= LOGIN ================================================= */}
                                    <View className="mt-4 flex-row justify-center">
                                        <Text className="text-[14px] text-[#989898]">  Already have an account?{" "} </Text>
                                        <Pressable onPress={() =>navigation.navigate("Login")} >
                                            <Text className="text-[14px] font-medium text-[#2867FF]">Log In </Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </ScrollView>
                            {/* ===================================================== SUCCESS POPUP ===================================================== */}
                            {showSuccess && (
                                <View className="absolute inset-0 items-center justify-center bg-black/20">
                                    <View className="mx-8 w-[90%] h-[360px] rounded-2xl bg-white px-6 py-7">
                                        {/* SUCCESS ICON */}
                                        <View className="mb-5 self-center rounded-full bg-[#F0F4FF] p-5">
                                            <View className="h-[105px] w-[105px] items-center justify-center rounded-full bg-[#E7EEFF]">
                                                <Ionicons
                                                    name="checkmark"
                                                    size={60}
                                                    color="#246AFD"
                                                />
                                            </View>
                                        </View>
                                        {/* TITLE */}
                                        <Text className="text-center text-[22px] font-bold text-[#011133]">All Set!</Text>
                                        {/* DESCRIPTION */}

                                        <Text className="mt-2 text-center text-[13px] leading-4 text-[#989898]">
                                            You've successfully created your account.
                                        </Text>
                                        {/* GET STARTED */}
                                        <Pressable onPress={() => navigation.replace("SplashScreen")}
                                            className="mt-9 h-[56px] flex-row items-center justify-center rounded-lg bg-[#2867FF]"
                                        >
                                            <Text className="text-[16px] font-semibold text-white">
                                                Get Started
                                            </Text>
                                            <Ionicons
                                                name="chevron-forward"
                                                size={16}
                                                color="#FFFFFF"
                                                style={{ marginLeft: 3, }}
                                            />
                                        </Pressable>
                                    </View>
                                </View>
                            )}
                        </>
                    );
                }}
            </Formik>
        </KeyboardAvoidingView>
    );
}