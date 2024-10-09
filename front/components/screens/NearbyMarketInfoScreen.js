import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../common/Header";
import Footer from "../common/Footer";

const NearbyMarketInfoScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="근처 상권 페이지" />
      <Text style={styles.title}>근처 상권 정보</Text>
      <Text>이 화면에는 근처 상권 정보가 표시됩니다.</Text>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default NearbyMarketInfoScreen;
