import React, { useContext } from "react";
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
import { useFonts } from "expo-font";
import fonts from "@/constants/fonts";
import { AuthContext, AuthProvider } from "@/context/AuthContext";
import Loading from "./(routes)/Loading";
import { ModalPortal } from "react-native-modals";

const Stack = createNativeStackNavigator();
export default function RootLayout() {
  return (
    <AuthProvider>
      <GluestackUIProvider mode="light">
        <PhoneProvider>
          <AppContent />
        </PhoneProvider>
      </GluestackUIProvider>
    </AuthProvider>
  );
}
function AppContent() {
  const [fontLoaded] = useFonts(fonts);
  const { isLoading, token } = useContext(AuthContext);
  if (!fontLoaded) {
    return null;
  }
  if (isLoading) {
    return <Loading />;
  }
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
        <Stack.Screen name="Loading" component={Loading} />
      </Stack.Navigator>
    );
  };
  return (
    <>{token === null || token === "" ? <AuthStack /> : <RootLayoutNav />}</>
  );
}
