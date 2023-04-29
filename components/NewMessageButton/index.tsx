import React from "react";
import { View,TouchableOpacity } from "react-native";
import { AntDesign,MaterialIcons } from '@expo/vector-icons'; 
import styles from './style'
import { useNavigation } from "@react-navigation/core";
const NewMessageButton = () => {
     const navigation =useNavigation();
 

  const onClick =()=>{
  navigation.navigate('Contacts')
    }

  return <TouchableOpacity onPress={onClick} style={styles.container}><View >
<MaterialIcons name="contact-page" size={30} color="white" />
  </View></TouchableOpacity> 
};

export default NewMessageButton;
