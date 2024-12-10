import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useBaseUrl } from "../../contexts/BaseUrlContext";
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";

const AddPopupStoreModal = ({
  visible,
  onClose,
}) => {
  const initialFormData = {
    popup_name: '',
    address: '',
    status: '',
    start_date: '',
    end_date: '',
    description: '',
    image: null,
  };
  const [formData, setFormData] = useState(initialFormData);
  const baseUrl = useBaseUrl();

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const handleClose = () => {
    setFormData(initialFormData); 
    onClose();
  };
  const handleSelectImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "권한 필요",
        "사진 라이브러리에 접근하려면 권한이 필요합니다."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      handleInputChange("image", result.assets[0].uri);
    }
  };

  const validateForm = () => {
    const { popup_name, address, status, start_date, end_date, description, image } = formData;
    if (!popup_name || !address || !status || !start_date || !end_date || !description || !image) {
      Alert.alert("오류", "모든 필수 입력값을 입력해주세요.");
      return false;
    }
    return true;
  };

  const handleRegisterSpace = async () => {
    if (!validateForm()) return; // 유효성 검사

    const formatDateTime = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}T00:00:00`;
    };

    const startDate = formatDateTime(formData.start_date);
    const endDate = formatDateTime(formData.end_date);

    const formDataToSend = new FormData();
    formDataToSend.append("popup_Name", formData.popup_name);
    formDataToSend.append("address", formData.address);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("start_Date", startDate);
    formDataToSend.append("end_Date", endDate);
    formDataToSend.append("description", formData.description);

    if (formData.image) {
      formDataToSend.append("image", {
        uri: formData.image,
        name: "popup-image.jpg",
        type: "image/jpeg",
      });
    }

    try {
      const response = await axios.post(`${baseUrl}/popupStore`, formDataToSend, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        Alert.alert("등록 성공", "팝업 스토어가 성공적으로 등록되었습니다.");
        onClose();
        setFormData(initialFormData);
      } else {
        Alert.alert("등록 실패", "팝업 스토어 등록 중 문제가 발생했습니다.");
      }
    } catch (error) {
      Alert.alert("오류", `팝업 스토어 등록 중 문제가 발생했습니다: ${error.message}`);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>팝업 스토어 등록</Text>
            <TouchableOpacity onPress={handleClose}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="팝업 이름"
            value={formData.popup_name}
            onChangeText={(text) => handleInputChange("popup_name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="주소"
            value={formData.address}
            onChangeText={(text) => handleInputChange("address", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="상태"
            value={formData.status}
            onChangeText={(text) => handleInputChange("status", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="시작 날짜"
            value={formData.start_date}
            onChangeText={(text) => handleInputChange("start_date", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="종료 날짜"
            value={formData.end_date}
            onChangeText={(text) => handleInputChange("end_date", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="설명"
            multiline
            numberOfLines={4}
            value={formData.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />

          <TouchableOpacity
            style={styles.selectImageButton}
            onPress={handleSelectImage}
          >
            <Text style={styles.selectImageButtonText}>이미지 선택</Text>
          </TouchableOpacity>
          {formData.image && (
            <Image
              source={{ uri: formData.image }}
              style={styles.previewImage}
            />
          )}

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleRegisterSpace}
          >
            <Text style={styles.saveButtonText}>등록</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
            <Text style={styles.cancelButtonText}>취소</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 15,
    padding: 10,
  },
  selectImageButton: {
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  selectImageButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  previewImage: {
    width: "100%",
    height: 150,
    marginTop: 10,
  },
  saveButton: {
    backgroundColor: "#FF6B6B",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  cancelButton: {
    marginTop: 10,
  },
  cancelButtonText: {
    textAlign: "center",
    color: "#FF6B6B",
  },
});

export default AddPopupStoreModal;
