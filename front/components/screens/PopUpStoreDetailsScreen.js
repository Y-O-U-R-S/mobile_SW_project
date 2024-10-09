import React from "react";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import Header from "../common/Header";
import Footer from "../common/Footer";

const PopUpStoreDetailsScreen = ({ route }) => {
  const { store } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="팝업 디테일 페이지" />
      <View style={styles.contentContainer}>
        <Image source={{ uri: store.image }} style={styles.image} />
        <Text style={styles.title}>{store.title}</Text>
        <Text style={styles.date}>{store.date}</Text>
        <Text style={styles.remaining}>{store.remainingDays}</Text>
      </View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    fontSize: 16,
    color: "#888",
  },
  remaining: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#DAA520",
  },
});

export default PopUpStoreDetailsScreen;
