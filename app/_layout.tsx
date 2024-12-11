import React from "react";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabLayout from "./(tabs)/_layout";
import Verify from "./(routes)/verify";
import { PhoneProvider } from "@/components/PhoneContext";
import QR from "./(tabs)/QR";
import Register from "./(routes)/register";
import Password from "./(routes)/password";
import PhoneNum from "./(routes)/PhoneNum";
import PreFinal from "./(routes)/PreFinal";

const Stack = createNativeStackNavigator();
export default function RootLayout() {
  const RootLayoutNav = () => {
    return (
      <GluestackUIProvider mode="light">
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Main" component={TabLayout} />
          <Stack.Screen name="QRCode" component={QR} />
        </Stack.Navigator>
      </GluestackUIProvider>
    );
  };
  const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Password" component={Password} />
        <Stack.Screen name="PhoneNum" component={PhoneNum} />
        <Stack.Screen name="Verify" component={Verify} />
        <Stack.Screen name="PreFinal" component={PreFinal} />
      </Stack.Navigator>
    );
  };

  return (
    <GluestackUIProvider mode="light">
      <PhoneProvider>
        <AuthStack />
      </PhoneProvider>
    </GluestackUIProvider>
  );
}
