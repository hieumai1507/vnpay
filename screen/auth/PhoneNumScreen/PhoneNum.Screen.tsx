import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import Header from "@/components/Header";
import fonts from "@/constants/fonts";
import { usePhone } from "@/components/PhoneContext";
import { useNavigation } from "expo-router";
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from "@/utils/RegistrationUtils";
const screenWidth = Dimensions.get("window").width;

const PhoneNumScreen = () => {
  const navigation = useNavigation();
  const [isFocused, setIsFocused] = useState(false);
  const [phoneNum, setPhoneNum] = useState("");
  const [error, setError] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { phoneNumber, setPhoneNumber } = usePhone();
  useEffect(() => {
    const isPhoneValid =
      !error && phoneNum.length >= 9 && phoneNum.length <= 12;
    setIsButtonEnabled(isPhoneValid);
  }, [phoneNum, error]);
  useEffect(() => {
    getRegistrationProgress("PhoneNum").then((progressData) => {
      if (progressData) {
        setPhoneNum(progressData.phoneNum || "");
      }
    });
  });
  const next = () => {
    if (phoneNum.trim() !== "") {
      saveRegistrationProgress("PhoneNum", { phoneNum });
    }
    navigation.navigate("Verify");
  };
  const handlePhoneChange = (text: string) => {
    // Updated regex to allow +84 format or 0xxx format
    const phoneRegex = /^(?:(?:\+84)|(?:0))?[0-9]{9}$/; // Chính xác 9 chữ số sau 0

    if (text.length === 0) {
      setError("Số điện thoại không được để trống");
    } else if (!phoneRegex.test(text)) {
      setError("Số điện thoại không hợp lệ");
    } else {
      setError(""); // Clear error if valid phone number
    }

    setPhoneNum(text);
    setPhoneNumber(text); // Update context or state
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View>
          <View>
            <Header />
            <View>
              <Image
                source={require("@/assets/images/logovnpay_1.png")}
                style={{
                  margin: 0,
                  padding: 0,
                  top: -75,
                  zIndex: 1,
                  width: 200, // Set your logo width
                  height: 200, // Set your logo height or adjust as needed
                  left: (screenWidth - 200) / 2,
                }}
              />
            </View>
          </View>
          <View style={{ alignItems: "center", top: -60 }}>
            <Text
              style={{
                fontFamily: fonts["roboto-regular"],
                fontSize: 13,
                color: "#82869E",
              }}
            >
              Nhập số điện thoại để đăng nhập
            </Text>
            <View style={{ marginHorizontal: 16, marginTop: 25, rowGap: 30 }}>
              <TextInput
                placeholder="Nhập số điện thoại"
                value={phoneNum}
                onChangeText={handlePhoneChange}
                style={[
                  {
                    borderColor: "#cccccc",
                    borderWidth: 1,
                    borderRadius: 5,
                    width: 311,
                    height: 48,
                    paddingLeft: 40,
                  },
                  isFocused && styles.inputFocused,
                ]}
                keyboardType="phone-pad"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                maxLength={12}
              />
              <Feather
                name="smartphone"
                size={20}
                color="#a7abc3"
                style={{
                  position: "absolute",
                  left: 10,
                  top: 15,
                  marginTop: -2,
                }}
              />
            </View>
            {error && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 8 }}>
                {error}
              </Text>
            )}
          </View>

          <TouchableOpacity
            disabled={!isButtonEnabled}
            style={[
              styles.button,
              {
                backgroundColor: isButtonEnabled ? "#3B82F6" : "#D1D5DB",
              },
            ]}
            onPress={next}
          >
            <Text style={{ color: "#fff", fontSize: 16 }}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PhoneNumScreen;
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    height: 48,
    borderRadius: 5,
    left: 50,
    width: 311,
  },
  inputFocused: {
    borderColor: "#3B82F6",
  },
});
