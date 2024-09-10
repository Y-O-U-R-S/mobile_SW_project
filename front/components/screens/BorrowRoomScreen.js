import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../common/Header";
import Footer from "../common/Footer";

const BorrowRoomScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Borrow Room" />
      <View style={styles.content}>
        <Text>Borrow Room Screen</Text>
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
  },
});

export default BorrowRoomScreen;