// components/common/Header.js
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/Ionicons';

const Header = ({ title, showBackButton = true }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: "rgba(244, 81, 30, 0.7)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  backButton: {
    padding: 10, // 터치 범위 확장
    position: "absolute",
    left: 10, // 왼쪽 여백
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Header;
