import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import fonts from "@/config/fonts";
import { AuthContext } from "@/context/AuthContext";
import { useNavigation } from "expo-router";
import { getRegistrationProgress } from "@/utils/RegistrationUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SERVER_URI } from "@/utils/uri";
import axios from "axios";

interface UserData {
  [key: string]: any;
}
const PreFinalScreen = () => {
  const { token, setToken } = useContext(AuthContext);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigation = useNavigation();
  useEffect(() => {
    if (token) {
      navigation.replace("RootLayoutNav", { screen: "Main" });
      console.log("Token login: ", token);
    }
  }, [token, navigation]);
  const getAllScreenData = async () => {
    try {
      const screens = ["Register", "Password", "PhoneNum"];
      let userData: UserData = {};
      for (const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName);
        if (screenData) {
          userData = { ...userData, ...screenData };
        }
      }
      setUserData(userData);
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    getAllScreenData();
  }, []);

  const ClearAllScreenData = async () => {
    try {
      const screens = ["Register", "Password", "PhoneNum"];
      for (const screenName of screens) {
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.removeItem(key);
      }
      console.log("ALl screen data cleared");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const registerUser = async () => {
    try {
      await axios.post(`${SERVER_URI}/register`, userData).then((res) => {
        console.log(res);
        const token = res.data.token;
        console.log("token", token);
        AsyncStorage.setItem("token", token);
        setToken(token);
      });
      ClearAllScreenData();
    } catch (error) {
      console.log("Error", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ marginTop: 80 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            fontFamily: fonts["roboto-regular"],
            marginLeft: 20,
            marginBottom: 20,
          }}
        >
          Đã sẵn sàng để đăng ký
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            fontFamily: fonts["roboto-regular"],
            marginLeft: 20,
            marginTop: 10,
          }}
        >
          Thiết lập hồ sơ cho bạn Đi thôi nào!!
        </Text>
      </View>

      <TouchableOpacity
        onPress={registerUser}
        style={{ backgroundColor: "#6CA6CD", padding: 15, marginTop: "auto" }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: "600",
            fontSize: 15,
          }}
        >
          Kết thúc quá trình đăng ký
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PreFinalScreen;
