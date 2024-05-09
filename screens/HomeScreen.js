import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
} from "react-native";
import { Overlay, Text, Input } from "react-native-elements";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import CardComponent from "../components/CardComponent";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [cards, setCards] = useState([]);
  const [imagePreviewUri, setImagePreviewUri] = useState(null);
  const [isImagePreviewVisible, setIsImagePreviewVisible] = useState(false);

  const toggleOverlay = () => {
    setIsVisible(!isVisible);
  };

  const handleUploadDocument = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Please allow camera access in order to upload documents."
      );
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (result && !result.cancelled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!name || !imageUri) {
      Alert.alert(
        "Incomplete Form",
        "Please fill in all fields and upload a document."
      );
      return;
    }

    const newCard = {
      id: cards.length.toString(),
      title: name,
      content: "Content added by the user",
      image: imageUri,
    };
    setCards([...cards, newCard]);
    setName("");
    setImageUri(null);
    toggleOverlay();
  };

  const handleDeleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };

  const handlePreviewImage = (imageUri) => {
    setImagePreviewUri(imageUri);
    setIsImagePreviewVisible(true);
  };

  const renderItem = ({ item }) => (
    <CardComponent
      item={item}
      onDelete={handleDeleteCard}
      onPreview={handlePreviewImage}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.cardCount}>Total Cards: {cards.length}</Text>
      <FlatList
        data={cards}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListEmptyComponent={() => (
          <View style={styles.emptyListComponent}>
            <Text>No items yet</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.floatingButtonContainerEmpty}
        onPress={toggleOverlay}
      >
        <AntDesign
          name="plus"
          style={{ fontWeight: "900" }}
          size={24}
          color="white"
        />
      </TouchableOpacity>
      <Overlay
        isVisible={isVisible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.overlay}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <View
          style={{
            height: 50,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View style={{ width: "90%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>Upload Form</Text>
          </View>
          <View
            style={{
              width: "10%",
              backgroundColor: "#efefef",
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={toggleOverlay}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.modalContent}>
          <Input
            placeholder="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            inputStyle={styles.input}
            inputContainerStyle={styles.inputContainer}
          />
          <TouchableOpacity onPress={handleUploadDocument}>
            <Input
              placeholder="Upload File"
              value={imageUri}
              editable={false}
              onChangeText={(text) => setName(text)}
              inputStyle={styles.input}
              inputContainerStyle={styles.inputContainer}
              rightIconContainerStyle={{ height: 30 }}
              rightIcon={<AntDesign name="upload" size={20} color="#000000" />}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              width: wp("65%"),
              height: 45,
              borderRadius: 5,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "blue",
            }}
          >
            <Text
              style={{ fontSize: 20, color: "#FFFFFF", fontWeight: "bold" }}
            >
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </Overlay>
      <Overlay
        isVisible={isImagePreviewVisible}
        onBackdropPress={() => setIsImagePreviewVisible(false)}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
      >
        <Image
          source={{ uri: imagePreviewUri }}
          style={{ width: 300, height: 300 }}
        />
      </Overlay>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    height: hp("100%"),
    paddingTop: hp("5%"),
  },
  overlay: {
    width: wp("80%"),
    height: hp("40%"),
    display: "flex",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
  },
  modalContent: {
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 0,
    width: wp("70%"),
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "lightgray",
  },
  input: {
    paddingLeft: 10,
    paddingRight: 10,
    color: "black",
  },
  uploadButton: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadButtonText: {
    color: "white",
    fontSize: 16,
  },
  imageContainer: {
    marginBottom: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  closeButton: {
    borderColor: "blue",
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
  },

  floatingButtonContainerEmpty: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  emptyListComponent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
});
