import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Card, Text } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";

export default function CardComponent({ item, onDelete, onPreview  }) {
  return (
    <Card containerStyle={styles.cardContainer}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(item.id)}
      >
        <AntDesign name="delete" size={20} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPreview(item.image)}>
        {item.image && (
          <Image source={{ uri: item.image }} style={styles.cardImage} />
        )}
      </TouchableOpacity>
      <Text style={styles.cardTitle}>{item.title}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    alignSelf: "flex-end",
  },

  cardContainer: {
    width: Dimensions.get("window").width / 2 - 20,
    margin: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
  },
  cardImage: {
    width: "100%",
    height: 180,
  },
});
