import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../common/Header";
import Footer from "../common/Footer";

const MapScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Map" />
      <View style={styles.content}>
        <Text>Map Screen</Text>
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

export default MapScreen;
