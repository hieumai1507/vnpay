import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import fonts from "@/constants/fonts";

const OTPResendButton = () => {
  const [buttonText, setButtonText] = useState("Gửi lại OTP");
  const [timer, setTimer] = useState(30);
  const [disabled, setDisabled] = useState(false);
  const handleResendOTP = () => {
    if (!disabled) {
      setButtonText("Đã gửi lại OTP");
      setDisabled(true);

      setTimeout(() => {
        setButtonText("Gửi lại OTP sau 30s");
        setTimer(30);

        const countdown = setInterval(() => {
          setTimer((prevTimer) => {
            const newTimer = prevTimer - 1; // Calculate newTimer first
            if (newTimer === 0) {
              // Check newTimer IMMEDIATELY
              clearInterval(countdown);
              setButtonText("Gửi lại OTP");
              setDisabled(false);
            }
            return newTimer; // Then return the updated value
          });
        }, 1000);
      }, 2000);
    }
  };

  useEffect(() => {
    if (timer > 0 && buttonText !== "Gửi lại OTP") {
      setButtonText(`Gửi lại OTP sau ${timer}s`);
    }
  }, [timer]);
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
      }}
      onPress={handleResendOTP}
      disabled={disabled}
    >
      <Text
        style={{
          fontFamily: fonts["roboto-regular"],
          fontSize: 13,
          color: disabled ? "#A0A0A0" : "#1990FF",
        }}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default OTPResendButton;
