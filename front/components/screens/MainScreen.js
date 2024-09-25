import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../common/Header";
import Footer from "../common/Footer";

const MainScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header title="Onyang Oasis" showBackButton={false} />
      <ScrollView contentContainerStyle={styles.content}>
        {/* 예약 현황 */}
        <View style={styles.reservationStatus}>
          <Text style={styles.reservationText}>장소: 아이디어 및 호실</Text>
          <Text style={styles.reservationText}>날짜: 오늘</Text>
          <Text style={styles.reservationText}>시간: 12:00 - 13:00</Text>
        </View>

        {/* 버튼들 */}
        <TouchableOpacity
          style={styles.roomButton}
          onPress={() => navigation.navigate("BorrowRoom")}
        >
          <Text style={styles.buttonText}>
            외국인들과 문화 교류 가능한 소통의 방
          </Text>
          <Text style={styles.startText}>시작하기</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.roomButton}
          onPress={() => navigation.navigate("Map")}
        >
          <Text style={styles.buttonText}>
            배고파서 뭘 먹지? 주변 맛집 확인
          </Text>
          <Text style={styles.startText}>시작하기</Text>
        </TouchableOpacity>

        {/* 공지사항 */}
        <View style={styles.noticeBoard}>
          <Text style={styles.noticeTitle}>공지사항</Text>
          <View style={styles.noticeItem}>
            <Text style={styles.noticeText}>안내사항</Text>
            <Text style={styles.noticeDate}>2024-09-07</Text>
          </View>
          <View style={styles.noticeItem}>
            <Text style={styles.noticeText}>안내사항</Text>
            <Text style={styles.noticeDate}>2024-09-07</Text>
          </View>
          <View style={styles.noticeItem}>
            <Text style={styles.noticeText}>안내사항</Text>
            <Text style={styles.noticeDate}>2024-09-07</Text>
          </View>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 60, // Footer 공간 확보
  },
  reservationStatus: {
    backgroundColor: "#3a3a3a",
    borderRadius: 10,
    padding: 16,
    marginVertical: 16,
  },
  reservationText: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 5,
  },
  roomButton: {
    backgroundColor: "#c89d00",
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  startText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
  noticeBoard: {
    marginVertical: 16,
    padding: 16,
    borderRadius: 10,
    borderColor: "#c89d00",
    borderWidth: 1,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  noticeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  noticeText: {
    fontSize: 16,
  },
  noticeDate: {
    fontSize: 16,
    color: "#555",
  },
});

export default MainScreen;
