import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Header from "../common/Header";
import Footer from "../common/Footer";

const PopUpStoreScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("운영 중");
  const [searchQuery, setSearchQuery] = useState("");
  const [popUpStores, setPopUpStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = new Date(); // 오늘 날짜

  // 날짜 형식 변환 함수 (yyyy/MM/dd)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}/${String(date.getDate()).padStart(2, "0")}`;
  };

  // 상태와 D-Day 계산 함수
  const calculateStatusAndDday = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (today < startDate) {
      const diff = Math.ceil((startDate - today) / (1000 * 60 * 60 * 24));
      return { status: "오픈 예정", dday: `D-${diff}` };
    } else if (today >= startDate && today <= endDate) {
      const diff = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      return { status: "운영 중", dday: `D-${diff}` };
    } else {
      return { status: "종료됨", dday: "종료됨" };
    }
  };

  // API 데이터 가져오기
  const fetchPopUpStores = async () => {
    try {
      setLoading(true); // 로딩 상태 설정
      const response = await axios.get("http://192.168.0.74:8000/popupStore"); // 서버 요청
      const data = response.data;

      if (Array.isArray(data)) {
        const formattedStores = data.map((store) => {
          const { status, dday } = calculateStatusAndDday(
            store.start_Date,
            store.end_Date
          );
          return {
            id: store.id,
            title: store.popup_Name,
            address: store.address,
            date: `${formatDate(store.start_Date)} - ${formatDate(
              store.end_Date
            )}`,
            status,
            dday,
          };
        });
        setPopUpStores(formattedStores);
      } else {
        console.error("Unexpected data format:", data);
      }
    } catch (error) {
      console.error("Error fetching popup stores:", error.message || error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  useEffect(() => {
    fetchPopUpStores();
  }, []);

  // 현재 탭과 검색어를 기반으로 데이터 필터링
  const filteredStores = popUpStores.filter(
    (store) => store.status === activeTab && store.title.includes(searchQuery)
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="팝업 스토어 둘러보기" />
      <TextInput
        style={styles.searchInput}
        placeholder="팝업스토어명, 브랜드명 검색"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "운영 중" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("운영 중")}
        >
          <Text style={styles.tabText}>운영 중</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "오픈 예정" && styles.activeTab,
          ]}
          onPress={() => setActiveTab("오픈 예정")}
        >
          <Text style={styles.tabText}>오픈 예정</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.cardContainer}>
          {loading ? (
            <Text style={styles.loadingText}>로딩 중...</Text>
          ) : filteredStores.length > 0 ? (
            filteredStores.map((store) => (
              <TouchableOpacity
                key={store.id}
                style={styles.card}
                onPress={() =>
                  navigation.navigate("PopUpStoreDetails", { store })
                }
              >
                <View style={styles.cardContent}>
                  <Text style={styles.storeTitle}>{store.title}</Text>
                  <Text style={styles.date}>{store.date}</Text>
                  <Text style={styles.dday}>{store.dday}</Text>
                  <Text style={styles.remaining}>{store.status}</Text>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultText}>결과가 없습니다.</Text>
          )}
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tabButton: {
    paddingVertical: 15,
    flex: 1,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#DAA520",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    margin: 10,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    alignItems: "flex-start",
  },
  storeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#888",
  },
  dday: {
    fontSize: 14,
    color: "#007BFF",
    fontWeight: "bold",
  },
  remaining: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#DAA520",
  },
  loadingText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
  noResultText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#999",
  },
});

export default PopUpStoreScreen;
