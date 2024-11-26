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
      title: "온통 냠냠 온냠 투게더",
      description:
        "두근 두근 온통 냠냠 온냠 투게더",
      address: "충청남도 아산시 시민로393번길 12-2",
      image: require("../../assets/together.jpg"),
    },
    {
      id: 2,
      title: "시몬스 하드웨어",
      description: "시몬스 하드웨어 스토어는 온양와 함께합니다!",
      address: "충청남도 아산시 시민로393번길 10-10",
      image: require("../../assets/simmons.jpg"),
    },
    {
      id: 3,
      title: "빨간 지하철",
      description: "빨간 구두 빨간 가방 빨간 지하철",
      address: "충청남도 아산시 시민로393번길 10-18",
      image: require("../../assets/game.jpg"),
    },
    {
      id: 4,
      title: "HOOPER's STORE",
      description: "HOOPER's STORE 드디어 대한민국 입점! 오직 온양에서만",
      address: "충청남도 아산시 시민로393번길 10-21",
      image: require("../../assets/hooper.jpg"),
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
                    source={marker.image}
                    style={styles.markerImage}
                  />
                  <Text style={styles.markerTitle}>{marker.title}</Text>
                </View>
              </View>
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Image
                    source={marker.image}
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
