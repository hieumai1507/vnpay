import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { Feather } from "@expo/vector-icons";
import fonts from "@/constants/fonts";
import { useNavigation } from "expo-router";
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from "@/utils/RegistrationUtils";
const screenWidth = Dimensions.get("window").width;
const PasswordScreen = () => {
  const navigation = useNavigation();
  const [isFocusedPass, setIsFocusedPass] = useState(false);
  const [errorPassword, setErrorPassword] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  useEffect(() => {
    getRegistrationProgress("Password").then((progressData) => {
      if (progressData) {
        setPassword(progressData.password || "");
      }
    });
  }, []);
  const next = () => {
    if (password.trim() !== "") {
      saveRegistrationProgress("Password", { password });
    }
    navigation.navigate("PhoneNum");
  };
  useEffect(() => {
    const isPasswordValid =
      !errorPassword && password.length >= 8 && password.length <= 16;
    setIsButtonEnabled(isPasswordValid);
  }, [password, errorPassword]);

  const handlePasswordChange = (text: string) => {
    setPassword(text);

    const hasUpperCase = /[A-Z]/.test(text);
    const hasDigit = /\d/.test(text);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(text);

    if (!hasUpperCase) {
      setErrorPassword("Mật khẩu phải chứa ít nhất một chữ cái viết hoa.");
    } else if (!hasDigit) {
      setErrorPassword("Mật khẩu phải chứa ít nhất một chữ số.");
    } else if (!hasSpecialChar) {
      setErrorPassword("Mật khẩu phải chứa ít nhất một ký tự đặc biệt.");
    } else if (text.includes(" ")) {
      setErrorPassword("Mật khẩu không được chứa khoảng trắng.");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,16}$/.test(
        text
      )
    ) {
      setErrorPassword(
        "Mật khẩu phải chứa ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt."
      );
    } else {
      setErrorPassword("");
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
              Nhập mật khẩu
            </Text>
          </View>

          <View style={{ alignItems: "center", top: -60 }}>
            <View style={{ marginHorizontal: 16, marginTop: 25, rowGap: 30 }}>
              <TextInput
                placeholder="Nhập mật khẩu"
                value={password}
                onChangeText={handlePasswordChange}
                style={[
                  {
                    borderColor: "#cccccc",
                    borderWidth: 1,
                    borderRadius: 5,
                    width: 311,
                    height: 48,
                    paddingLeft: 40,
                  },
                  isFocusedPass && styles.inputFocused,
                ]}
                secureTextEntry
                onFocus={() => setIsFocusedPass(true)}
                onBlur={() => setIsFocusedPass(false)}
              />
              <Feather
                name="lock"
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
            {errorPassword && (
              <Text style={{ color: "red", fontSize: 12, marginTop: 8 }}>
                {errorPassword}
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

export default PasswordScreen;
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
