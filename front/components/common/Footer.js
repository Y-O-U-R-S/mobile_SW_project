import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Footer = () => {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerText}>나형진</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    height: 50,
    backgroundColor: "rgba(244, 81, 30, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Footer;
