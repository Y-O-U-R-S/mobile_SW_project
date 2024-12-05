import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useBaseUrl } from "../../contexts/BaseUrlContext";
import Footer from "../common/Footer";

const NoticeScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = useBaseUrl();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(`${baseUrl}/notice`);
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
  }, [baseUrl]);

  const filteredNotices = notices.filter(notice =>
    notice.title.toLowerCase().includes(searchText.toLowerCase())
  );

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
    <View style={styles.container}>
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
        ) : filteredNotices.length > 0 ? (
          filteredNotices.map((notice) => <QnAItem key={notice.id} notice={notice} />)
        ) : (
          <Text style={styles.noData}>등록된 공지사항이 없습니다.</Text>
        )}
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
  noData: {
    textAlign: 'center',
    padding: 20,
    color: '#999',
  },
});

export default NoticeScreen;
