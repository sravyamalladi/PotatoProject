import React,{useState} from "react";
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
      }
    };
    const getData = async () => {
      try {
        const ourData = await axios.get("https://dummyjson.com/products")
        console.log(ourData.data.products[0])
        setProduct(ourData.data.products)
      } catch(error){
        console.log(error)
      }
    }
    return (
        <View style={styles.container}>
      <Text style={{fontSize:24, color:"purple", width: "100%", textAlign: "center"}}>Hello World!</Text>
      <TouchableOpacity 
        style ={{width: 400, height: 200, backgroundColor: "violet", justifyContent: "center", alignItems: "center"}}
        onPress={() => 
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