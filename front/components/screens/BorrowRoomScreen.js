import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { Calendar } from "react-native-calendars"; // For calendar
import DatePicker from "react-native-date-picker"; // For time picker
import Header from "../common/Header";
import Footer from "../common/Footer";

const BorrowRoomScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null); // Stores selected calendar date
  const [entryTime, setEntryTime] = useState(new Date()); // Stores entry time
  const [exitTime, setExitTime] = useState(new Date()); // Stores exit time

  const [isEntryTimePickerVisible, setIsEntryTimePickerVisible] =
    useState(false); // Controls entry time picker visibility
  const [isExitTimePickerVisible, setIsExitTimePickerVisible] = useState(false); // Controls exit time picker visibility

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);

  // Confirm reservation
  const confirmReservation = () => {
    setShowConfirmation(false);
    setShowLimitWarning(true);
  };

  // Close reservation warning
  const closeLimitWarning = () => {
    setShowLimitWarning(false);
  };

  return (
    <View style={styles.container}>
      <Header title="Onyang Oasis" />
      <ScrollView contentContainerStyle={styles.content}>
        {/* 이미지 및 QR코드 입실/퇴실 버튼 */}
        <View style={styles.imageSection}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }} // You can replace this with the actual image
            style={styles.roomImage}
          />
          <View style={styles.qrButtons}>
            <TouchableOpacity style={styles.qrButton}>
              <Text style={styles.qrButtonText}>QR코드로 입실하기</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.qrButton}>
              <Text style={styles.qrButtonText}>퇴실하기</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 예약 날짜 선택 부분 */}
        <View style={styles.reservationSection}>
          <Text style={styles.sectionTitle}>예약 입자</Text>

          {/* 달력 선택 */}
          <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#F4511E" },
            }}
            theme={{
              arrowColor: "#F4511E",
              selectedDayBackgroundColor: "#F4511E",
              todayTextColor: "#F4511E",
            }}
          />
          {selectedDate && <Text>선택한 날짜: {selectedDate}</Text>}

          {/* 입실 시간 설정 */}
          <TouchableOpacity onPress={() => setIsEntryTimePickerVisible(true)}>
            <Text style={styles.timeText}>
              입실 시간: {entryTime.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>

          {/* 퇴실 시간 설정 */}
          <TouchableOpacity onPress={() => setIsExitTimePickerVisible(true)}>
            <Text style={styles.timeText}>
              퇴실 시간: {exitTime.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>

          {/* 예약하기 버튼 */}
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => setShowConfirmation(true)}
          >
            <Text style={styles.reserveButtonText}>예약하기</Text>
          </TouchableOpacity>
        </View>

        {/* 예약 확인 모달 */}
        {showConfirmation && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showConfirmation}
            onRequestClose={() => setShowConfirmation(false)}
          >
            <View style={styles.modalView}>
              <Text>{`${selectedDate} ${entryTime.toLocaleTimeString()} ~ ${exitTime.toLocaleTimeString()}에 예약하시겠습니까?`}</Text>
              <View style={styles.modalButtons}>
                <Button title="확인" onPress={confirmReservation} />
                <Button
                  title="아니오"
                  onPress={() => setShowConfirmation(false)}
                />
              </View>
            </View>
          </Modal>
        )}

        {/* 최대 예약 시간 경고 모달 */}
        {showLimitWarning && (
          <Modal
            animationType="slide"
            transparent={true}
            visible={showLimitWarning}
            onRequestClose={closeLimitWarning}
          >
            <View style={styles.modalView}>
              <Text>최대 3시간 예약까지 가능합니다</Text>
              <Button title="확인" onPress={closeLimitWarning} />
            </View>
          </Modal>
        )}

        {/* 입실 시간 선택기 */}
        <DatePicker
          modal
          open={isEntryTimePickerVisible}
          date={entryTime}
          mode="time"
          onConfirm={(time) => {
            setIsEntryTimePickerVisible(false);
            setEntryTime(time);
          }}
          onCancel={() => setIsEntryTimePickerVisible(false)}
        />

        {/* 퇴실 시간 선택기 */}
        <DatePicker
          modal
          open={isExitTimePickerVisible}
          date={exitTime}
          mode="time"
          onConfirm={(time) => {
            setIsExitTimePickerVisible(false);
            setExitTime(time);
          }}
          onCancel={() => setIsExitTimePickerVisible(false)}
        />
      </ScrollView>

      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  content: {
    flexGrow: 1,
    padding: 16,
    justifyContent: "flex-start",
  },
  imageSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  roomImage: {
    width: 300,
    height: 150,
    marginBottom: 10,
    borderRadius: 10,
  },
  qrButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
  },
  qrButton: {
    backgroundColor: "#F4511E",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  qrButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  reservationSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 10,
  },
  reserveButton: {
    backgroundColor: "#F4511E",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  reserveButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
});

export default BorrowRoomScreen;
