import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Image,
} from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import axios from "axios";
import Header from "../common/Header";
import Footer from "../common/Footer";

const MapScreen = () => {
  const [coordinates, setCoordinates] = useState([]);
  const mapRef = useRef(null);

  const markers = [
    {
      id: 1,
      title: "전통시장 옆 분위기 좋은 팝업 공간",
      description:
        "전통시장 옆 분위기 좋은 팝업 공간입니다. 1층만 사용 가능하며 전용면적 130평으로 감성을 담아 컨셉에 잘 녹아내기 좋은 공간.",
      address: "충청남도 아산시 시민로405번길 11",
      image: "https://cdn2.thecatapi.com/images/9ev.jpg",
    },
    {
      id: 2,
      title: "청년 팝업 스토어",
      description: "여기서 팝업스토어를 확인하세요!",
      address: "충청남도 아산시 시민로393번길 10-10",
      image: "https://cdn2.thecatapi.com/images/YQtmOXP0_.jpg",
    },
  ];

  const getCoordinates = async () => {
    try {
      const results = await Promise.all(
        markers.map(async (marker) => {
          const response = await axios.get(
            `https://dapi.kakao.com/v2/local/search/address.json`,
            {
              headers: {
                Authorization: `KakaoAK 6a5618b5907079f2ecf86363b3e26637`, // 여기에 API 키 입력
              },
              params: {
                query: marker.address,
              },
            }
          );
          if (response.data.documents.length > 0) {
            const { y, x } = response.data.documents[0];
            return {
              ...marker,
              coordinate: {
                latitude: parseFloat(y),
                longitude: parseFloat(x),
              },
            };
          } else {
            console.warn(`No coordinates found for address: ${marker.address}`);
            return marker;
          }
        })
      );
      setCoordinates(results);
    } catch (error) {
      console.error("Geocoding error: ", error);
    }
  };

  useEffect(() => {
    getCoordinates();
  }, []);

  // 지도 위치를 마커에 맞게 조정
  useEffect(() => {
    if (coordinates.length > 0 && mapRef.current) {
      mapRef.current.fitToCoordinates(
        coordinates.map((marker) => marker.coordinate),
        {
          edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          animated: true,
        }
      );
    }
  }, [coordinates]);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="지도" />
      <SafeAreaView style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: 36.7809,
            longitude: 127.0048,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {coordinates.map((marker) => (
            <Marker key={marker.id} coordinate={marker.coordinate}>
              <View style={styles.markerContainer}>
                <View style={styles.markerBackground}>
                  <Image
                    source={{ uri: marker.image }}
                    style={styles.markerImage}
                  />
                  <Text style={styles.markerTitle}>{marker.title}</Text>
                </View>
              </View>
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Image
                    source={{ uri: marker.image }}
                    style={styles.calloutImage}
                  />
                  <View style={styles.calloutTextContainer}>
                    <Text style={styles.calloutTitle}>{marker.title}</Text>
                    <Text style={styles.calloutAddress}>{marker.address}</Text>
                    <Text style={styles.calloutDescription}>
                      {marker.description}
                    </Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </SafeAreaView>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  markerContainer: {
    alignItems: "center",
    width: 120,
  },
  markerBackground: {
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  markerImage: {
    width: 100,
    height: 60,
    borderRadius: 8,
  },
  markerTitle: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  calloutContainer: {
    width: 250,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  calloutImage: {
    width: "100%",
    height: 120,
  },
  calloutTextContainer: {
    padding: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 12,
    color: "#333",
  },
});

export default MapScreen;
