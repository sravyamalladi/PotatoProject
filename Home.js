import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import LottieView from "lottie-react-native";

const Home = (props) => {
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState([]);
  const [loader, showLoader] = useState(false);
  const animation = useRef(null);

  useEffect(() => {
    animation.current?.play();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    await ImagePicker.requestCameraPermissionsAsync();
    result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
    });
    console.log(result);
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };

  const getData = async () => {
    try {
      const ourData = await axios.post("http://localhost:8000/predict");
      console.log(ourData.data.products[0]);
      setProduct(ourData.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const predictTheImage = async () => {
    showLoader(true);
    let localUri = image;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let formData = new FormData();
    formData.append("photo", { uri: localUri, name: filename, type });
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/predict",
        formData,
      );
      console.log("response", response.data, response.status);
      showLoader(false);
    } catch (error) {
      console.log("error", error);
      showLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <Text
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: 25,
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        Write your project title here.
      </Text>
      <Text
        style={{
          width: "95%",
          textAlign: "center",
          fontSize: 14,
        }}
      >
        Write your project description here. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit. Pellentesque posuere, metus eu tincidunt
        tincidunt, enim arcu condimentum libero, non viverra risus mauris eu
        tellus. In id arcu quam. In eros turpis, maximus vitae lacus ut, rutrum
        mattis mi. Suspendisse quis tristique risus. Nullam non gravida velit.
        Donec metus sapien, lobortis luctus magna ut, viverra mollis ex. Mauris
        lacus libero, iaculis vitae arcu quis, gravida efficitur risus. Sed
        auctor risus ac pharetra tempor.
      </Text>
      <View
        style={{
          width: 300,
          height: 300,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        {loader ? (
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: 250,
              height: 250,
              backgroundColor: "#eee",
            }}
            source={require("./assets/leaf_lottie.json")}
          />
        ) : image ? (
          <Image
            source={{ uri: image }}
            style={{
              width: 250,
              height: 250,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        ) : null}
      </View>
      <View
        style={{
          width: "90%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={{
            width: "45%",
            height: 50,
            backgroundColor: "purple",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => pickImage()}
        >
          <Text style={{ fontSize: 24, color: "#eafcb6" }}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "45%",
            height: 50,
            backgroundColor: "purple",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 10,
          }}
          onPress={() => openCamera()}
        >
          <Text style={{ fontSize: 24, color: "#eafcb6" }}>Camera</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          width: "90%",
          height: 50,
          borderRadius: 10,
          alignSelf: "center",
          backgroundColor: "violet",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
        onPress={() => predictTheImage()}
      >
        <Text style={{ fontSize: 24, color: "white" }}>Predict</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#C1E1C150",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default Home;
