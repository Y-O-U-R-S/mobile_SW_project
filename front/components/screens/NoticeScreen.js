import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

import Header from "../common/Header";
import Footer from "../common/StartupFooter";

const NoticeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch("http://192.168.0.74:8000/notice");
        if (!response.ok) {
          throw new Error("Failed to fetch notices");
        }
        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error("Error fetching notices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const QnAItem = ({ notice }) => {
    const [expanded, setExpanded] = useState(false);

    return (
      <View style={styles.qnaItem}>
        <TouchableOpacity
          style={styles.questionRow}
          onPress={() => setExpanded(!expanded)}
        >
          <Text style={styles.questionText}>{notice.title}</Text>
          <Icon
            name={expanded ? "chevron-up" : "chevron-down"}
            size={20}
            color="#666"
          />
        </TouchableOpacity>
        {expanded && (
          <View style={styles.answerContainer}>
            <Text style={styles.answerText}>{notice.detail}</Text>
            
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="공지사항" />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="제목 검색"
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchButtonText}>검색</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.qnaList}>
        {loading ? (
          <ActivityIndicator size="large" color="#FF00FF" />
        ) : notices.length > 0 ? (
          notices.map((notice) => <QnAItem key={notice.id} notice={notice} />)
        ) : (
          <Text style={styles.noData}>등록된 공지사항이 없습니다.</Text>
        )}
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
  searchContainer: {
    padding: 16,
    gap: 8,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  searchButton: {
    backgroundColor: "#FF00FF",
    padding: 12,
    borderRadius: 4,
  },
  searchButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
  qnaList: {
    flex: 1,
  },
  qnaItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  questionText: {
    flex: 1,
    fontSize: 14,
  },
  answerContainer: {
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  answerText: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
  writeButton: {
    position: "absolute",
    right: 16,
    bottom: 130,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FF00FF",
  },
  writeButtonText: {
    fontSize: 14,
    marginRight: 4,
  },
});

export default NoticeScreen;
