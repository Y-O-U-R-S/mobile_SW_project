import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Footer from "../common/Footer";
import { useBaseUrl } from "../../contexts/BaseUrlContext";

const PopUpStoreScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("운영 중");
  const [searchQuery, setSearchQuery] = useState("");
  const baseUrl = useBaseUrl();
  const [popUpStoresRunning, setPopUpStoresRunning] = useState([]);
  const [popUpStoresUpcoming, setPopUpStoresUpcoming] = useState([]);

  const calculateDaysRemaining = (status, startDate, endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const start = new Date(startDate);
    
    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);

    if (status === "운영중") {
      const diffTime = end - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } else {
      const diffTime = start - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
  };

  const calculateRemainingDays = (status, startDate, endDate) => {
    const today = new Date();
    const end = new Date(endDate);
    const start = new Date(startDate);

    today.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);

    if (status === "운영중") {
      if (today >= start && today <= end) {
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 0) return "오늘 종료";
        return diffDays > 0 ? `종료까지 ${diffDays}일` : "종료됨";
      }
    } else if (status === "오픈 예정") {
      const diffTime = start - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays === 0) return "오늘 오픈";
      return diffDays > 0 ? `오픈까지 ${diffDays}일` : "오픈됨";
    }
    
    return "기간 종료";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/popupStore`);
        console.log(response.data);

        const runningStores = [];
        const upcomingStores = [];

        response.data.forEach(item => {
          const store = {
            id: item.id,
            image: { uri: item.image },
            title: item.popup_Name,
            date: `${item.start_Date.split("T")[0]} - ${item.end_Date.split("T")[0]}`,
            remainingDays: calculateRemainingDays(item.status, item.start_Date, item.end_Date),
            daysNumber: calculateDaysRemaining(item.status, item.start_Date, item.end_Date)
          };

          if (item.status === "운영중") {
            runningStores.push(store);
          } else if (item.status === "오픈 예정") {
            upcomingStores.push(store);
          }
        });

        // 운영 중인 스토어는 종료일이 가까운 순으로 정렬
        runningStores.sort((a, b) => a.daysNumber - b.daysNumber);
        // 오픈 예정인 스토어는 오픈일이 가까운 순으로 정렬
        upcomingStores.sort((a, b) => a.daysNumber - b.daysNumber);

        setPopUpStoresRunning(runningStores);
        setPopUpStoresUpcoming(upcomingStores);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const filteredRunningStores = popUpStoresRunning.filter((store) =>
    store.title.includes(searchQuery)
  );

  const filteredUpcomingStores = popUpStoresUpcoming.filter((store) =>
    store.title.includes(searchQuery)
  );

  return (
    <View style={styles.safeArea}>
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
          {activeTab === "운영 중" ? (
            filteredRunningStores.length > 0 ? (
              filteredRunningStores.map((store) => (
                <TouchableOpacity
                  key={store.id}
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("PopUpStoreDetails", { id: store.id })
                  }
                >
                  <Image source={store.image} style={styles.image} />
                  <View style={styles.cardContent}>
                    <Text style={styles.storeTitle}>{store.title}</Text>
                    <Text style={styles.date}>{store.date}</Text>
                    <Text style={styles.remaining}>{store.remainingDays}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noResultText}>결과가 없습니다.</Text>
            )
          ) : (
            filteredUpcomingStores.length > 0 ? (
              filteredUpcomingStores.map((store) => (
                <TouchableOpacity
                  key={store.id}
                  style={styles.card}
                  onPress={() =>
                    navigation.navigate("PopUpStoreDetails", { id: store.id })
                  }
                >
                  <Image source={store.image} style={styles.image} />
                  <View style={styles.cardContent}>
                    <Text style={styles.storeTitle}>{store.title}</Text>
                    <Text style={styles.date}>{store.date}</Text>
                    <Text style={styles.dday}>{store.dday}</Text>
                    <Text style={styles.remaining}>{store.remainingDays}</Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.noResultText}>결과가 없습니다.</Text>
            )
          )}
        </View>
      </ScrollView>
      <Footer />
    </View>
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