import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import Footer from "../common/Footer";
import { useNavigation } from "@react-navigation/native";
import AddPopupStoreModal from "../modals/AddPopupStoreModal"; // 모달 컴포넌트 임포트
import { UserContext } from "../../contexts/UserContext";

const MyPageScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 가시성 상태 관리
  const { userInfo } = useContext(UserContext);
  const { setUserInfo } = useContext(UserContext);

  const handleLogout = () => {
    setUserInfo(null);
    navigation.navigate("Login");
  };

  return (
    <View style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Notice")}
          >
            <Text style={styles.menuText}>공지사항 / 이벤트</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <Text style={styles.menuText}>로그아웃</Text>
          </TouchableOpacity>
          {userInfo?.role === "admin" && (
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.menuText}>팝업스토어 등록</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Footer />

      <AddPopupStoreModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View >
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  menuSection: {
    marginTop: 20,
    paddingTop: 20,
  },
  menuItem: {
    marginBottom: 15,
  },
  menuText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "500",
  },
  addButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
    backgroundColor: "orange",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MyPageScreen;