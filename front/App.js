import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StatusBar, StyleSheet, View } from "react-native";

import LoginScreen from "./components/screens/LoginScreen";
import SignUpScreen from "./components/screens/SignUpScreen";
import MainScreen from "./components/screens/MainScreen";
import SpaceRentalDetailScreen from "./components/screens/SpaceRentalDetailScreen";
import NearbyMarketInfoScreen from "./components/screens/NearbyMarketInfoScreen";
import PopUpStoreScreen from "./components/screens/PopUpStoreScreen";
import ChatbotScreen from "./components/screens/ChatbotScreen";
import PersonalInfoScreen from "./components/screens/PersonalInfoScreen";
import SpaceRentalListScreen from "./components/screens/SpaceRentalListScreen";
import PopUpStoreDetailsScreen from "./components/screens/PopUpStoreDetailsScreen";
import MyPageScreen from "./components/screens/MyPageScreen";
import NoticeScreen from "./components/screens/NoticeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            headerShown: false,
            animationEnabled: false,
          }}
        >
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen
            name="SpaceRentalDetailScreen"
            component={SpaceRentalDetailScreen}
          />
          <Stack.Screen
            name="NearbyMarketInfo"
            component={NearbyMarketInfoScreen}
          />
          <Stack.Screen name="PopUpStore" component={PopUpStoreScreen} />
          <Stack.Screen name="Chatbot" component={ChatbotScreen} />
          <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
          <Stack.Screen
            name="SpaceRentalListScreen"
            component={SpaceRentalListScreen}
          />
          <Stack.Screen
            name="PopUpStoreDetails"
            component={PopUpStoreDetailsScreen}
          />
          <Stack.Screen name="MyPage" component={MyPageScreen} />
          <Stack.Screen name="Notice" component={NoticeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
