import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Footer from "../common/Footer";
import axios from 'axios';
import { useBaseUrl } from "../../contexts/BaseUrlContext";

const { width } = Dimensions.get('window');

const MainScreen = () => {
  const navigation = useNavigation();
  const [popUps, setPopUps] = useState([]);
  const baseUrl = useBaseUrl();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/popupStore`);
        setPopUps(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${month}월 ${day}일`;
  };

  const calculateDday = (startDate, endDate, status) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(0, 0, 0, 0);

    if (status === "운영중") {
      const remainingDays = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
      return remainingDays > 0 ? `종료 D-${remainingDays}` : "종료";
    } else if (status === "오픈 예정") {
      const daysUntilStart = Math.ceil((start - today) / (1000 * 60 * 60 * 24));
      return daysUntilStart > 0 ? `오픈 D-${daysUntilStart}` : "오픈 예정";
    }
    return "";
  };

  const calculateRemainingDays = (dateString) => {
    const today = new Date();
    const date = new Date(dateString);
    return Math.ceil((date - today) / (1000 * 60 * 60 * 24));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.bannerContainer}
        >
          {popUps.slice(0, 3).map((popup, index) => (
            <TouchableOpacity
              key={index}
              style={styles.bannerSlide}
              onPress={() => navigation.navigate("PopUpStoreDetails", { id: popup.id })}
            >
              <Image source={{ uri: popup.image }} style={styles.bannerImage} />
              <View style={styles.bannerOverlay}>
                <Text style={styles.bannerTitle}>
                  {index === 0 ? "이런 팝업은 어때?" : "가장 핫한 팝업 🔥"}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>🔥 뜨끈 뜨끈 신상 팝업 🔥</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {popUps
              .filter(popup => popup.status === "운영중")
              .sort((a, b) => calculateRemainingDays(b.end_Date) - calculateRemainingDays(a.end_Date)) // 종료일이 가장 많이 남은 순으로 정렬
              .map((popup, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.gridItem}
                  onPress={() => navigation.navigate("PopUpStoreDetails", { id: popup.id })}
                >
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: popup.image }} style={styles.gridImage} />
                    <View style={styles.ddayContainer}>
                      <Text style={styles.ddayText}>
                        {calculateDday(popup.start_Date, popup.end_Date, popup.status)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.gridTitle} numberOfLines={2}>
                    {popup.popup_Name}
                  </Text>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                      {formatDate(popup.start_Date)} ~ {formatDate(popup.end_Date)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>🤩 오픈 예정 팝업 미리보기!!</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {popUps
              .filter(popup => popup.status === "오픈 예정")
              .sort((a, b) => calculateRemainingDays(a.start_Date) - calculateRemainingDays(b.start_Date)) // 오픈 예정일이 얼마 남지 않은 순으로 정렬
              .map((popup, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.gridItem}
                  onPress={() => navigation.navigate("PopUpStoreDetails", { id: popup.id })}
                >
                  <View style={styles.imageContainer}>
                    <Image source={{ uri: popup.image }} style={styles.gridImage} />
                    <View style={[styles.ddayContainer, styles.comingSoonDday]}>
                      <Text style={styles.ddayText}>
                        {calculateDday(popup.start_Date, popup.end_Date, popup.status)}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.gridTitle} numberOfLines={2}>
                    {popup.popup_Name}
                  </Text>
                  <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>
                      {formatDate(popup.start_Date)} ~ {formatDate(popup.end_Date)}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    height: 400,
  },
  bannerSlide: {
    width: width,
    height: 400,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  }, horizontalScroll: {
    paddingVertical: 10,
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    padding: 15,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: (width - 45) / 2,
    marginBottom: 20,
    marginRight: 15,
  },
  imageContainer: {
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  }, dateContainer: {
    flexDirection: 'row',
  },
  ddayContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF385C',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  comingSoonDday: {
    backgroundColor: '#8B3EFF',
  },
  ddayText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gridTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 10,
    color: '#666',
  },
});

export default MainScreen;