import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // 나중에 회원가입 요청 넣어야됨
    if (password === confirmPassword) {
      navigation.navigate("Main");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Button title="Sign Up" onPress={handleSignUp} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 10,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default SignUpScreen;
