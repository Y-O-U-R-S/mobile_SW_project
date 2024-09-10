import React from "react";
import { View, Button, StyleSheet } from "react-native";
import Header from "../common/Header";
import Footer from "../common/Footer";

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Main Screen" showBackButton={false} /> {/* Back 버튼 숨기기 */}
      <View style={styles.content}>
        <Button
          title="Go to Borrow Room"
          onPress={() => navigation.navigate("BorrowRoom")}
        />
        <Button
          title="Go to Map"
          onPress={() => navigation.navigate("Map")}
        />
        <Button
          title="Go to Notice"
          onPress={() => navigation.navigate("Notice")}
        />
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
    paddingHorizontal: 16,
    gap: 10,
  },
});

export default MainScreen;
