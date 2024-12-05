import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, Button, TouchableOpacity } from "react-native";
import Footer from "../common/Footer";
import axios from "axios";
import { useBaseUrl } from "../../contexts/BaseUrlContext";
import { useNavigation } from "@react-navigation/native";

const PopUpStoreDetailsScreen = ({ route }) => {
  const { id } = route.params;
  const [store, setStore] = useState(null);
  const baseUrl = useBaseUrl();
  const navigation = useNavigation();

  useEffect(() => {
    const fetchStoreDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/popupStore/${id}`);
        setStore(response.data);
      } catch (error) {
        console.error("상세 정보 조회 실패: ", error);
      }
    };
    fetchStoreDetails();
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '오픈 예정':
        return '#4CAF50';  // Green
      case '진행중':
        return '#2196F3';  // Blue
      case '종료':
        return '#F44336';  // Red
      default:
        return '#757575';  // Grey
    }
  };

  if (!store) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>로딩 중...</Text>
        </View>
        <Footer />
      </SafeAreaView>
    );
  }


  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Image
            source={{ uri: store.image }}
            style={styles.image}
            resizeMode="cover"
          />
          <View style={styles.infoContainer}>
            <Text style={{
              ...styles.status,
              color: getStatusColor(store.status)
            }}>
              {store.status}
            </Text>
            <Text style={styles.title}>{store.popup_Name}</Text>
            <Text style={styles.date}>
              {`${formatDate(store.start_Date)} - ${formatDate(store.end_Date)}`}
            </Text>
            <Text style={styles.address}>{store.address}</Text>
            <Text style={styles.descriptionTitle}>상세 설명</Text>
            <Text style={styles.description}>{store.description}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("PopUpStore")} >
            <Text style={styles.backText}>&lt;- 다른 팝업 스토어 보러가기</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  contentContainer: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 250,
  },
  infoContainer: {
    padding: 20,
  },
  status: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  address: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#444',
  }, backText: {
    fontWeight: 'bold',
    fontSize: '19',
    marginLeft:'10',
    marginTop:'50'
  }
});
export default PopUpStoreDetailsScreen;