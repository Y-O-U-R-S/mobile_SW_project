import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Footer = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Main")}
        style={styles.footerButton}
      >
        <Icon name="home-outline" size={35} color="#000" />
        <Text style={styles.footerText}>홈</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("SpaceRentalListScreen")}
        style={styles.footerButton}
      >
        <Icon name="store-outline" size={35} color="#000" />
        <Text style={styles.footerText}>창업 공간</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        onPress={() => navigation.navigate("PopUpStore")}
        style={styles.footerButton}
      >
        <Icon name="shopping-outline" size={35} color="#000" />
        <Text style={styles.footerText}>팝업 스토어</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("MyPage")}
        style={styles.footerButton}
      >
        <Icon name="account-outline" size={35} color="#000" />
        <Text style={styles.footerText}>마이페이지</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  footerButton: {
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 13,
    color: "#000",
    marginTop: 4,
    fontWeight: "bold",
  },
});

export default Footer;
