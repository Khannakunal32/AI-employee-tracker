import React from "react";
import { View,TouchableOpacity } from "react-native";
import { AntDesign,MaterialIcons,FontAwesome5 } from '@expo/vector-icons'; 
import styles from './style'
import { useNavigation } from "@react-navigation/core";
const VideoButton = () => {
     const navigation =useNavigation();
 

  const onClick =()=>{
  navigation.navigate('CallScreen')
    }

  return <TouchableOpacity onPress={onClick} ><View >
 <FontAwesome5 name="video" size={22} color={'white'} />
  </View></TouchableOpacity> 
};

export default VideoButton;
