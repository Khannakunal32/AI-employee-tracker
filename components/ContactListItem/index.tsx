import React from "react";
import { Text, View, Image,TouchableWithoutFeedback } from "react-native";
import { User } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from "@react-navigation/core";

export type ContactListItemProps = {
  user: User;
};

const componentToHex=(c)=> {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

const rgbToHex=(r, g, b)=> {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
const getRandomColor=(name) =>{
  // get first alphabet in upper case
  const firstAlphabet = name.charAt(0).toLowerCase();
 
  // get the ASCII code of the character
  const asciiCode = firstAlphabet.charCodeAt(0);
 
  // number that contains 3 times ASCII value of character -- unique for every alphabet
  const colorNum = asciiCode.toString() + asciiCode.toString() + asciiCode.toString();
 
  var num = Math.round(0xffffff * parseInt(colorNum));
  var r = num >> 16 & 255;
  var g = num >> 8 & 255;
  var b = num & 255;

  return {
 
    color:rgbToHex(r, g, b),
    character: firstAlphabet.toUpperCase()  
  };
}

const ContactListItem = (props: ContactListItemProps) => {
  const { user } = props;
  console.log(user)
  const navigation =useNavigation();
 
  const onClick =()=>{

    navigation.navigate('individualContact',{id:user.veroKey,name:user.name,imageUri:user.profileImage})
   }
  return (
    <TouchableWithoutFeedback onPress={onClick}> 
    
    <View style={styles.container}>
      <View style={styles.leftContainer}>
      {user.profileImage?  <Image source={{ uri:user.profileImage }} style={styles.avatar} />:<View><Text  style={{fontSize:30,
    width:60,
    textAlign:'center',
    height:60,
    marginRight:15,
    borderRadius:50,
    backgroundColor:'white',
    color:getRandomColor(user.name).color,
    fontWeight:'bold',
    textAlignVertical:'center'
    }}>{user.name.charAt(0).toUpperCase()}</Text></View>}
      
        <View style={styles.midContainer}>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.status}>{user.veroKey}</Text>
        </View>
      </View>

    </View>
    </TouchableWithoutFeedback>
   
  );
};

export default ContactListItem;
