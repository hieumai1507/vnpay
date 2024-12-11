import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import fonts from "@/constants/fonts";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { usePhone } from "@/components/PhoneContext";
import { SERVER_URI } from "@/utils/uri";
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from "@/utils/RegistrationUtils";

const screenWidth = Dimensions.get("window").width;

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isFocusedUserName, setIsFocusedUserName] = useState(false);
  const [errorUserName, setErrorUserName] = useState("");
  const [userName, setUserName] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  useEffect(() => {
    const isUserNameValid =
      !errorUserName && userName.length >= 3 && userName.length <= 20;

    // Enable button only if all fields are valid
    setIsButtonEnabled(isUserNameValid);
  }, [userName, errorUserName]);

  useEffect(() => {
    getRegistrationProgress("Register").then((progressData) => {
      if (progressData) {
        setUserName(progressData.userName || "");
      }
    });
  }, []);
  const next = () => {
    if (userName.trim() !== "") {
      saveRegistrationProgress("Register", { userName });
    }
    navigation.navigate("Password");
  };

  const handleUserNameChange = (text: string) => {
    setUserName(text);

    const minLength = 3;
    const maxLength = 20;
    if (text.length < minLength || text.length > maxLength) {
      setErrorUserName(
        `Tên người dùng phải từ ${minLength} đến ${maxLength} ký tự.`
      );
    } else if (!/^[a-zA-Z0-9]+$/.test(text)) {
      setErrorUserName("Tên người dùng chỉ được chứa chữ cái và số.");
    } else if (/[^\w\s]/.test(text)) {
      setErrorUserName("Tên người dùng không được chứa ký tự đặc biệt.");
    } else if (text.charAt(0) !== text.charAt(0).toUpperCase()) {
      setErrorUserName("Tên người dùng phải bắt đầu bằng chữ cái viết hoa.");
    } else {
      setErrorUserName("");
    }
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
              Nhập tên đăng nhập
            </Text>
          </View>

          <View style={{ alignItems: "center", top: -60 }}>
            <View style={{ marginHorizontal: 16, marginTop: 25, rowGap: 30 }}>
              <TextInput
                placeholder="Nhập tên đăng nhập"
                onChangeText={handleUserNameChange}
                value={userName}
                style={[
                  {
                    borderColor: "#cccccc",
                    borderWidth: 1,
                    borderRadius: 5,
                    width: 311,
                    height: 48,
                    paddingLeft: 40,
                  },
                  isFocusedUserName && styles.inputFocused,
                ]}
                keyboardType="default"
                onFocus={() => setIsFocusedUserName(true)}
                onBlur={() => setIsFocusedUserName(false)}
              />
              <Feather
                name="user"
                size={20}
                color="#a7abc3"
                style={{ position: "absolute", left: 10, top: 15 }}
              />
            </View>
            {errorUserName && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 8 }}>
                {errorUserName}
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

export default LoginScreen;
