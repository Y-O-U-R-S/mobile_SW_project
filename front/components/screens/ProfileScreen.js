import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Header from "../common/Header";
import Footer from "../common/Footer";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Profile" showBackButton={true} />
      <View style={styles.content}>
        <Text style={styles.profileText}>개인정보수정</Text>
      </View>
      <Footer />
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
    alignItems: "center",
    paddingHorizontal: 16,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ProfileScreen;
