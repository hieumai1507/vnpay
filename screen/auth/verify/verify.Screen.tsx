import {
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Button,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import fonts from "@/constants/fonts";
import { usePhone } from "@/components/PhoneContext";
import OTPResendButton from "@/components/OTPResendButton";
import { router, useNavigation } from "expo-router";
const screenWidth = Dimensions.get("window").width;

const VerifyScreen = () => {
  const navigation = useNavigation();
  const { phoneNumber } = usePhone();
  const [code, setCode] = useState(new Array(6).fill(""));
  const inputs = useRef<any>([...Array(6)].map(() => React.createRef()));
  const [activeInput, setActiveInput] = useState(0);
  const handleInput = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;

    setCode(newCode);

    if (text) {
      // Nếu nhập ký tự mới, chuyển đến ô tiếp theo
      if (index < 5) {
        inputs.current[index + 1].current.focus();
        setActiveInput(index + 1);
      }
    }
  };
  const handleFocus = (index: number) => {
    setActiveInput(index);
  };
  const handleKeyPress = (nativeEvent: any, index: number) => {
    if (nativeEvent.key === "Backspace") {
      const newCode = [...code];

      // Nếu ô hiện tại rỗng, chuyển về ô trước
      if (code[index] === "" && index > 0) {
        newCode[index - 1] = ""; // Xóa ký tự ở ô trước
        setCode(newCode);
        inputs.current[index - 1].current.focus();
        setActiveInput(index - 1);
      } else {
        // Nếu không rỗng, xóa ô hiện tại
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      router.push("/(tabs)");
    }
  }, [code, navigation]);
  const handleDone = () => {
    Keyboard.dismiss();
    if (code.every((digit) => digit !== "")) {
      navigation.navigate("PreFinal");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }} // quan trọng!
        keyboardShouldPersistTaps="handled"
      >
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
          <View
            style={{
              alignItems: "center",
              top: -60,
            }}
          >
            <Text
              style={{
                fontFamily: fonts["roboto-regular"],
                fontSize: 13,
                color: "#82869E",
              }}
            >
              Nhập OTP được gửi tới số điện thoại{" "}
              <Text
                style={{
                  color: "#005eff",
                }}
              >
                {phoneNumber}
              </Text>
            </Text>

            <View
              style={{
                flexDirection: "row",
                marginBottom: -40,
                marginTop: 25,
              }}
            >
              {code.map((_, index) => (
                <TextInput
                  key={index}
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 1,
                    borderColor: activeInput === index ? "#4c8eff" : "#ddd",
                    textAlign: "center",
                    marginRight: 10,
                    borderRadius: 10,
                    fontSize: 20,
                  }}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={code[index]}
                  onChangeText={(text) => handleInput(text, index)}
                  autoFocus={index === 0}
                  ref={inputs.current[index]}
                  onBlur={() => {
                    if (activeInput === index) {
                      setActiveInput(-1);
                    }
                  }}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent, index)
                  }
                  onFocus={() => handleFocus(index)}
                />
              ))}
            </View>
          </View>

          <View>
            <OTPResendButton />
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity
              onPress={handleDone}
              style={{
                padding: 15,
                backgroundColor: "#4c8eff", // Or your preferred color
                width: (1 / 2) * screenWidth,
                alignItems: "center",
                borderRadius: 6,
              }}
              accessible={false} // Ensures the button is not read by screen readers as it's a visual accessory
            >
              <Text style={{ color: "white", fontWeight: "bold" }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default VerifyScreen;
