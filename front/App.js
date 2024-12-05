import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StatusBar, StyleSheet, View, Text } from "react-native";
import MainScreen from "./components/screens/MainScreen";
import PopUpStoreScreen from "./components/screens/PopUpStoreScreen";
import PopUpStoreDetailsScreen from "./components/screens/PopUpStoreDetailsScreen";
import NoticeScreen from "./components/screens/NoticeScreen";
import MapScreen from "./components/screens/MapScreen";
import MyPageScreen from "./components/screens/MyPageScreen";
import LoginScreen from "./components/screens/LoginScreen";
import SignUpScreen from "./components/screens/SignUpScreen";
import { UserProvider } from "./contexts/UserContext";

const Stack = createStackNavigator();

const CustomHeader = ({ title }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>
);

const screenTitles = {
  Main: "홈",
  PopUpStore: "팝업 스토어",
  QnAScreen: "문의하기",
  MyPage: "마이페이지",
  PopUpStoreDetails: "스토어 상세",
  Notice: "공지사항",
  Map: "지도",
};

export default function App() {
  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <UserProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={({ route }) => ({
              header: () => {
                // Login과 SignUp 화면에서는 헤더를 숨김
                if (route.name === "Login" || route.name === "SignUp") {
                  return null;
                }
                // 나머지 화면에서는 커스텀 헤더를 보여줌
                return <SafeAreaView><CustomHeader title={screenTitles[route.name] || route.name} /></SafeAreaView>;
              },
              headerMode: 'screen',
              animationEnabled: false,
              gestureEnabled: false // 스와이프로 뒤로가기 비활성화
            })}
          >
            
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="PopUpStore" component={PopUpStoreScreen} />
            <Stack.Screen name="MyPage" component={MyPageScreen} />
            <Stack.Screen name="PopUpStoreDetails" component={PopUpStoreDetailsScreen} />
            <Stack.Screen name="Notice" component={NoticeScreen} />
            <Stack.Screen name="Map" component={MapScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    height: 60,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    elevation: 3, // Android 그림자
    shadowColor: '#000', // iOS 그림자
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  }
});
