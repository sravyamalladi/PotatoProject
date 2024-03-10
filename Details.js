import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const Details = (props) => {
    return (
        <View style={styles.container}>
            <Text>This is a new Screen</Text>
            <TouchableOpacity style = {{backgroundColor: "blue", width: 400, height: 200, justifyContent: "center", alignItems:"center" }}
                onPress={()=>{
                    props.navigation.goBack()
                }
            }
            >
                <Text style = {{color: "black", fontSize: 24, textAlign: "center"}}>
                    Go Home
                </Text>
            </TouchableOpacity>
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
export default Details