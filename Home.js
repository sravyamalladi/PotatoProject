import React,{useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from "axios";
const Home = (props) => {
    const [image, setImage] = useState(null);
    const [product, setProduct] = useState([]);
  
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
          // ImagePicker saves the taken photo to disk and returns a local URI to it
        let localUri = result.assets[0].uri;
        let filename = localUri.split('/').pop();
      
        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
      
        // Upload the image using the fetch and FormData APIs
        let formData = new FormData();
        // Assume "photo" is the name of the form field the server expects
        formData.append('photo', { uri: localUri, name: filename, type });
        const response =  await fetch("http://localhost:8000/predict", {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      console.log(response)
      }
    };
    const getData = async () => {
      try {
        const ourData = await axios.post("http://localhost:8000/predict")
        console.log(ourData.data.products[0])
        setProduct(ourData.data.products)
      } catch(error){
        console.log(error)
      }
    }

    async function takeAndUploadPhotoAsync() {
      // Display the camera to the user and wait for them to take a photo or to cancel
      // the action
      let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });
    
      if (result.cancelled) {
        return;
      }
    
      // ImagePicker saves the taken photo to disk and returns a local URI to it
      let localUri = result.uri;
      let filename = localUri.split('/').pop();
    
      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
    
      // Upload the image using the fetch and FormData APIs
      let formData = new FormData();
      // Assume "photo" is the name of the form field the server expects
      formData.append('photo', { uri: localUri, name: filename, type });
      try {
        const ourData = await axios.post("http://localhost:8000/predict", formData)
        console.log(ourData)
      } catch(error){
        console.log(error)
      }
      return await fetch("http://localhost:8000/predict", {
        method: 'POST',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
    }
    
    return (
        <View style={styles.container}>
      <Text style={{fontSize:24, color:"purple", width: "100%", textAlign: "center"}}>Hello World!</Text>
      <TouchableOpacity 
        style ={{width: 400, height: 200, backgroundColor: "violet", justifyContent: "center", alignItems: "center"}}
        onPress={() => 
          // takeAndUploadPhotoAsync()
          pickImage()
        }
      >
        <Text style={{fontSize:24, color:"white"}}>
            Press Me
        </Text>
        {image && <Image source={{ uri: image }} style={{ width: 150, height: 150,justifyContent: "center", alignItems: "center" }} />}
      </TouchableOpacity>
      <TouchableOpacity 
        style ={{width: 400, height: 100, backgroundColor: "purple", justifyContent: "center", alignItems: "center"}}
        onPress={() => 
          getData()
        }
      >
        <Text style={{fontSize:24, color:"#eafcb6"}}>
            Get Data
        </Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style ={{width: 400, height: 100, backgroundColor: "green", justifyContent: "center", alignItems: "center", marginTop: 20}}
        onPress={() => 
            props.navigation.navigate("Details")
        }
      >
        <Text style={{fontSize:24, color:"black"}}>
            Go To Next Screen
        </Text>
      </TouchableOpacity>
      
      
      <View style = {{width: "100%", height: 500, backgroundColor:"indigo"}}>
        {
          product && product.length >0 && product.map((p) => {
            return (
              <Text key = {p.key} style = {{fontSize: 12 , color: "violet",justifyContent: "center", alignItems: "center"}}>
                {p.description}
              </Text>
            ) 
          })
        }
      </View>
      <StatusBar style="auto" />
      
    </View>
    );

};
const styles = StyleSheet.create({
    background:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default Home