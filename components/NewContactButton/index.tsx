import React from "react";
import { View,TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import styles from './style'
import { useNavigation } from "@react-navigation/core";
const NewContactButton = (props) => {
     const navigation =useNavigation();

  const onClick =()=>{
    props.onCreateContact(true)
    }

  return <TouchableOpacity onPress={onClick} style={styles.container}><View >
<AntDesign name="plus" size={28} color="white" />
  </View></TouchableOpacity> 
};

export default NewContactButton;
