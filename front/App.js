import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./components/screens/LoginScreen";
import SignUpScreen from "./components/screens/SignUpScreen";
import MainScreen from "./components/screens/MainScreen";
import BorrowRoomScreen from "./components/screens/BorrowRoomScreen";
import MapScreen from "./components/screens/MapScreen";
import NoticeScreen from "./components/screens/NoticeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false, // 모든 스크린에서 기본 헤더 숨기기
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="BorrowRoom" component={BorrowRoomScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Notice" component={NoticeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
