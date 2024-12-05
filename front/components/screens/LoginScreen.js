import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";
import { UserContext } from "../../contexts/UserContext";
import { useBaseUrl } from "../../contexts/BaseUrlContext";
import { LinearGradient } from 'expo-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { setUserInfo } = useContext(UserContext);
  const baseUrl = useBaseUrl();

  const handleLogin = async () => {
    if (!id || !password) {
      Alert.alert("오류", "아이디와 비밀번호를 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, password }),
      });

      if (response.ok) {
        const loginResult = await response.text();

        if (loginResult.trim() === "로그인 가능.") {
          const userResponse = await fetch(
            `${baseUrl}/user/find?email=${encodeURIComponent(id)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (userResponse.ok) {
            const userData = await userResponse.json();
            if (id === "a@a.com") {
              userData.role = "admin";
            } else {
              userData.role = "user";
            }
            setUserInfo(userData);
            Alert.alert(
              "로그인 성공",
              id === "a@a.com"
                ? "관리자로 로그인 되었습니다."
                : "메인 화면으로 이동합니다."
            );
            setId("");
            setPassword("");
            navigation.navigate("Main");
          } else {
            Alert.alert("오류", "유저 정보를 가져오는 데 실패했습니다.");
          }
        } else {
          Alert.alert("로그인 실패", "아이디 또는 비밀번호가 잘못되었습니다.");
        }
      } else {
        const errorText = await response.text();
        Alert.alert(
          "로그인 실패",
          errorText || "아이디 또는 비밀번호가 잘못되었습니다."
        );
      }
    } catch (error) {
      Alert.alert(
        "오류",
        `로그인 요청 중 문제가 발생했습니다: ${error.message}`
      );
    }
  };

  return (
    <LinearGradient
      colors={['#B721FF', '#FF69B4']}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <Text style={styles.subTitle}>청년들의 창업 순간을 가능하게 하는 연습장</Text>
          <Text style={styles.title}>청순가련</Text>

          <View style={styles.formContainer}>
            <Text style={styles.label}>ID</Text>
            <TextInput
              style={styles.input}
              value={id}
              onChangeText={setId}
              autoCapitalize="none"
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
            />

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>

            <View style={styles.bottomLinks}>
              <TouchableOpacity>
                <Text style={styles.linkText}>ID찾기</Text>
              </TouchableOpacity>
              <Text style={styles.linkSeparator}>|</Text>
              <TouchableOpacity>
                <Text style={styles.linkText}>비밀번호 찾기</Text>
              </TouchableOpacity>
              <Text style={styles.linkSeparator}>|</Text>
              <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                <Text style={styles.linkText}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
          </View>


          <TouchableOpacity
            style={styles.skipLoginButton}
            onPress={() => navigation.navigate("Main")}
          >
            <Text style={styles.skipLoginText}>로그인 없이 사용하기</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  subTitle: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  formContainer: {
    width: '100%',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    height: 45,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#8A2BE2',
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#fff',
    fontSize: 12,
  },
  linkSeparator: {
    color: '#fff',
    marginHorizontal: 8,
    fontSize: 12,
  }, dividerContainer: {
    paddingHorizontal: 20,
    marginTop: 100,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#fff',
    width: '100%',
  },
  skipLoginButton: {
    backgroundColor: '#FFCC00',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  skipLoginText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LoginScreen;