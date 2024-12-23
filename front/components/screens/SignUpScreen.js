import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { useBaseUrl } from "../../contexts/BaseUrlContext";

const SelectOption = ({ label, options, selectedValue, onValueChange }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.selectContainer}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.selectText}>{selectedValue}</Text>
      </TouchableOpacity>
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.optionList}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.option}
                  onPress={() => {
                    onValueChange(option);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const SignUpScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [job, setJob] = useState("");
  const [birthYear, setBirthYear] = useState("2000");
  const [birthMonth, setBirthMonth] = useState("01");
  const [birthDay, setBirthDay] = useState("01");

  const baseUrl = useBaseUrl();

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,11}$/;
    const choSungRegex = /^[ㄱ-ㅎ]+$/;
    const validTextRegex = /^[가-힣a-zA-Z0-9\s.,()-]+$/;

    if (!id || !password || !confirmPassword || !name || !phone || !address || !job) {
      Alert.alert("오류", "모든 필드를 입력해주세요.");
      return false;
    }

    if (!emailRegex.test(id)) {
      Alert.alert("오류", "올바른 이메일 주소를 입력해주세요.");
      return false;
    }

    if (!phoneRegex.test(phone)) {
      Alert.alert("오류", "올바른 전화번호를 입력해주세요. (숫자만 입력)");
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.");
      return false;
    }

    if (choSungRegex.test(address)) {
      Alert.alert("입력 오류", "초성만으로는 주소를 입력할 수 없습니다.");
      return false;
    }
    if (!validTextRegex.test(address)) {
      Alert.alert("입력 오류", "올바른 형식으로 주소를 입력해주세요.");
      return false;
    }

    if (choSungRegex.test(job)) {
      Alert.alert("입력 오류", "초성만으로는 직업을 입력할 수 없습니다.");
      return false;
    }
    if (!validTextRegex.test(job)) {
      Alert.alert("입력 오류", "올바른 형식으로 직업을 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;
    const formattedDate = `${birthYear}-${birthMonth}-${birthDay}`;

    try {
      const response = await fetch(`${baseUrl}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          password,
          name,
          email: id,
          phone,
          address,
          job,
          birth: formattedDate,
        }),
      });

      if (response.ok) {
        Alert.alert("회원가입 성공", "로그인 화면으로 이동합니다.");
        navigation.navigate("Login");
      } else {
        const errorText = await response.text();
        Alert.alert(
          "회원가입 실패",
          errorText || "회원가입 중 문제가 발생했습니다."
        );
      }
    } catch (error) {
      Alert.alert(
        "오류",
        `회원가입 요청 중 문제가 발생했습니다: ${error.message}`
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.backButton}>＜</Text>
              </TouchableOpacity>
              <Text style={styles.headerText}>회원가입</Text>
            </View>

            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="아이디(이메일)"
                value={id}
                onChangeText={setId}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.input}
                placeholder="비밀번호"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="비밀번호 확인"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              <TextInput
                style={styles.input}
                placeholder="이름"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="전화번호"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              <View style={styles.birthContainer}>
                <SelectOption
                  label="년"
                  options={[...Array(100)].map((_, i) => `${1924 + i}`)}
                  selectedValue={birthYear}
                  onValueChange={setBirthYear}
                />
                <SelectOption
                  label="월"
                  options={[...Array(12)].map((_, i) =>
                    String(i + 1).padStart(2, "0")
                  )}
                  selectedValue={birthMonth}
                  onValueChange={setBirthMonth}
                />
                <SelectOption
                  label="일"
                  options={[...Array(31)].map((_, i) =>
                    String(i + 1).padStart(2, "0")
                  )}
                  selectedValue={birthDay}
                  onValueChange={setBirthDay}
                />
              </View>
              <TextInput
                style={styles.input}
                placeholder="주소"
                value={address}
                onChangeText={setAddress}
              />
              <TextInput
                style={styles.input}
                placeholder="직업"
                value={job}
                onChangeText={setJob}
              />
              <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
                <Text style={styles.submitButtonText}>회원가입</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: {
    fontSize: 24,
    color: "#FF6F61",
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6F61",
  },
  form: {
    padding: 20,
    paddingBottom: 40, // 폼 하단에 여유 공간 추가
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#FF6F61",
    fontSize: 18,
    paddingVertical: 8,
    marginBottom: 20,
  },
  birthContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  selectContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#FF6F61",
  },
  selectButton: {
    borderWidth: 1,
    borderColor: "#FF6F61",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  selectText: {
    fontSize: 16,
    color: "#333",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "70%",
    borderRadius: 15,
    padding: 20,
    maxHeight: "50%",
  },
  optionList: {
    paddingVertical: 10,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#FF6F61",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#FF6F61",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 30,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SignUpScreen;