import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';
import { Camera, CameraType } from 'expo-camera';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home';
import Details from './Details';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState([]);
  const Stack = createStackNavigator();

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
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        </Stack.Navigator>
    </NavigationContainer>
 
  );
}
// export default function App() {
  // 
//   const [type, setType] = useState(CameraType.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();

//   if (!permission)

//   if (!permission.granted)

//   function toggleCameraType() {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
