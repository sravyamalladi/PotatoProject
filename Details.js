import React from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const Details = (props) => {
    return (
        <View style={styles.container}>
            <Text>{props.route.params.data.class}</Text>
            <Text>{Number(props.route.params.data.confidence)*100}</Text>
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