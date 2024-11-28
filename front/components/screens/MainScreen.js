import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../common/Header";
import Footer from "../common/Footer";
import axios from 'axios'

const MainScreen = () => {
  const navigation = useNavigation();
  const [popUps, setPopUps] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://10.20.33.5:8000/popupStore');
        console.log(response.data);
        setPopUps(response.data);
      } catch (error) {
        console.error(error); // 에러 처리
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', options); // 한국 형식으로 변환
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="청순가련" />

      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.bannerContainer}
      >
        {popUps.length > 0 && (
          <>
            <View style={styles.bannerSlide}>
              <Image
                source={{ uri: popUps[0].image }} // 첫 번째 팝업 이미지
                style={styles.bannerImage}
              />
              <Text style={styles.bannerText}>
                여기 안 가봤어!? 가장 핫한 팝업🔥
              </Text>
            </View>
            <View style={styles.bannerSlide}>
              <Image
                source={{ uri: popUps[0].image }} // 첫 번째 팝업 이미지 재사용
                style={styles.bannerImage}
              />
              <Text style={styles.bannerText}>지금 가야할 팝업!</Text>
            </View>
          </>
        )}
      </ScrollView>

      <Text style={styles.sectionHeader}>🔥 뜨끈 뜨끈 신상 팝업!</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.popUpList}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.popUpList}>
          {popUps.map((popUp, index) => ( // 데이터 맵핑
            <TouchableOpacity key={index} style={styles.popUpCard}>
              <Image
                source={{ uri: popUp.image }} // 이미지 URL을 서버에서 가져온 값으로 설정
                style={styles.popUpImage}
              />
              <Text style={styles.popUpTitle}>{popUp.popup_Name}</Text>
              <Text style={styles.popUpDate}>{formatDate(popUp.start_Date)} ~ {formatDate(popUp.end_Date)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bannerContainer: {
    height: 200,
    marginVertical: 10,
  },
  bannerSlide: {
    width: 400,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: 400,
    borderRadius: 10,
  },
  bannerText: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
    borderRadius: 5,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  sectionHeader: {
    
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  popUpList: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popUpCard: {
    width: 110,
    alignItems: "center",
    marginVertical: 10,
  },
  popUpImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  popUpTitle: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  popUpDate: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
});

export default MainScreen;
