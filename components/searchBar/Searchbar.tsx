import React from "react";
import { View,TouchableOpacity } from "react-native";
import { AntDesign,MaterialIcons,MaterialCommunityIcons,Octicons } from '@expo/vector-icons'; 
import styles from './style'
import { useNavigation } from "@react-navigation/core";
const Searchbar = () => {
     const navigation =useNavigation();
 

  const onClick =()=>{
  navigation.navigate('Contacts')
    }

  return <TouchableOpacity onPress={onClick} ><View >
   <Octicons name="search" size={22} color={"white"} />

  </View></TouchableOpacity> 
};

export default Searchbar;
