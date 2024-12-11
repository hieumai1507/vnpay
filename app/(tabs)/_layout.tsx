import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Home from "./Home";
import Personal from "./Personal";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import QR from "./QR";

const Tab = createBottomTabNavigator();
const tabIcons: Record<string, { focused: string; unfocused: string }> = {
  HOME: { focused: "home", unfocused: "home-outline" },
  PERSONAL: { focused: "person", unfocused: "person-outline" },
};
const TabLayout = ({ navigation }) => {
  // Thêm navigation props
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#005eff",
          tabBarInactiveTintColor: "gray",
          tabBarIcon: ({ focused, color, size }) => {
            const iconName = focused
              ? tabIcons[route.name].focused
              : tabIcons[route.name].unfocused;
            return (
              <Ionicons
                name={iconName as keyof typeof Ionicons.glyphMap}
                size={size}
                color={color}
              />
            );
          },
          tabBarStyle: {
            // Đẩy tabBar lên trên để tạo khoảng trống cho nút QR
            height: Platform.OS === "ios" ? 90 : 70, // Điều chỉnh giá trị nếu cần
            paddingBottom: Platform.OS === "ios" ? 25 : 15, // Điều chỉnh giá trị nếu cần
            ...styles.tabBar,
          },
        })}
      >
        <Tab.Screen
          name="HOME"
          component={Home}
          options={{
            title: "Trang chủ",
          }}
        />

        <Tab.Screen
          name="PERSONAL"
          component={Personal}
          options={{
            title: "Tài khoản",
          }}
        />
      </Tab.Navigator>

      {/* Nút QR */}
      <TouchableOpacity
        onPress={() => navigation.navigate("QRCode")} // Thay "QR_SCREEN" bằng tên màn hình quét QR của bạn
        style={styles.qrButton}
      >
        <Ionicons name="qr-code-outline" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 0, // Ẩn đường viền trên của tabBar
    backgroundColor: "#fff", // Màu nền tabBar
    elevation: 5, // Đổ bóng cho Android
    shadowColor: "#000", // Đổ bóng cho iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  qrButton: {
    position: "absolute",
    bottom: 50, // Điều chỉnh vị trí theo mong muốn
    alignSelf: "center",
    backgroundColor: "#005eff",
    borderRadius: 25,
    padding: 15,
    elevation: 5, // Đổ bóng cho Android
    shadowColor: "#000", // Đổ bóng cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default TabLayout;
