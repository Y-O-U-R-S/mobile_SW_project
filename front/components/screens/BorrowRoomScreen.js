import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../common/Header";
import Footer from "../common/Footer";

const BorrowRoomScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Borrow Room" />
      <ScrollView contentContainerStyle={styles.content}>
        <Text>Borrow Room Screen</Text>
        {/* 여기에 추가적인 콘텐츠를 넣을 수 있습니다 */}
      </ScrollView>
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
    flexGrow: 1, // ScrollView에서 flexGrow를 사용하여 컨텐츠가 꽉 차도록 설정
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20, // 스크롤 시 약간의 패딩 추가
  },
});

export default BorrowRoomScreen;
