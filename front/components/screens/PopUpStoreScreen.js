import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../common/Header";
import Footer from "../common/Footer";


const PopUpStoreScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("운영 중");
  const [searchQuery, setSearchQuery] = useState("");

  const popUpStoresRunning = [
    {
      id: 1,
      image: {
        uri: "https://yoursyhs3bucket.s3.ap-northeast-2.amazonaws.com/57244592-b103265c24947e0e06.jpeg"
      },
      title: "두근 두근 온통 냠냠 온냠 투게더",
      date: "9월 11일 - 12월 31일",
      remainingDays: "운영중 D-26",
    },
    {
      id: 2,
      image: require("../../assets/simmons.jpg"),
      title: "시몬스 하드웨어 스토어",
      date: "9월 11일 - 11월 29일",
      remainingDays: "운영중 D-29",
    },
    {
      id: 3,
      image: require("../../assets/game.jpg"),
      title: "빨간 구두 빨간 가방 빨간 지하철",
      date: "10월 2일 - 11월 31일",
      remainingDays: "운영중",
    },
    {
      id: 4,
      image: require("../../assets/hooper.jpg"),
      title: "HOOPER's STORE",
      date: "10월 11일 - 1월 31일",
      remainingDays: "운영중",
    },
  ];

  const popUpStoresUpcoming = [
    {
      id: 5,
      image: require("../../assets/maru.jpg"),
      title: "추억의 정글짐 마루 마켓",
      date: "12월 3일 - 3월 8일",
      remainingDays: "오픈 예정",
    },
    {
      id: 6,
      image: require("../../assets/kakao.jpg"),
      title: "카카오프랜즈 Beach Pub",
      date: "12월 9일 - 4월 1일",
      remainingDays: "오픈 예정",
    },
    {
      id: 7,
      image: require("../../assets/backyard.jpg"),
      title: "BACKYARD ● BUILDER 팝업",
      date: "10월 1일 - 1월 31일",
      remainingDays: "오픈 예정",
    },
  ];

  const filteredRunningStores = popUpStoresRunning.filter((store) =>
    store.title.includes(searchQuery)
  );

  const filteredUpcomingStores = popUpStoresUpcoming.filter((store) =>
    store.title.includes(searchQuery)
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
          {activeTab === "운영 중" &&
            filteredRunningStores.map((store) => (
              <TouchableOpacity
                key={store.id}
                style={styles.card}
              // onPress={() =>
              //   navigation.navigate("PopUpStoreDetails", { store })
              // }
              >
                <Image source={store.image} style={styles.image} />
                <View style={styles.cardContent}>
                  <Text style={styles.storeTitle}>{store.title}</Text>
                  <Text style={styles.date}>{store.date}</Text>
                  <Text style={styles.remaining}>{store.remainingDays}</Text>
                </View>
              </TouchableOpacity>
            ))}
          {activeTab === "오픈 예정" &&
            filteredUpcomingStores.map((store) => (
              <TouchableOpacity
                key={store.id}
                style={styles.card}
              // onPress={() =>
              //   navigation.navigate("PopUpStoreDetails", { store })
              // }
              >
                <Image source={store.image} style={styles.image} />
                <View style={styles.cardContent}>
                  <Text style={styles.storeTitle}>{store.title}</Text>
                  <Text style={styles.date}>{store.date}</Text>
                  <Text style={styles.remaining}>{store.remainingDays}</Text>
                </View>
              </TouchableOpacity>
            ))}
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
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
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
  remaining: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#DAA520",
  },
});

export default PopUpStoreScreen;
