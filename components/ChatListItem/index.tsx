import React, { useEffect, useState } from "react";
import { Text, View, Image,TouchableWithoutFeedback } from "react-native";
import { ChatRoom } from "../../types";
import styles from "./style";
import moment from "moment";
import { useNavigation } from "@react-navigation/core";

import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { MaterialIcons } from '@expo/vector-icons'; 
import { useFocusEffect } from "@react-navigation/native";
import Colors from "../../constants/Colors";
export type ChatListItemProps = {
  chatRoom: ChatRoom;
};




const ChatListItem = (props: ChatListItemProps) => {

const [LastMessage,setLastMessage]=useState()
const [LastMessageTime,setLastMessageTime]=useState('')


  const { chatRoom } = props;
  const navigation =useNavigation();
  const user = chatRoom;

  const onClick =()=>{

   navigation.navigate('ChatRoom',{id:user.veroKey,name:user.name,imageUri:user.imageUri})
  }

  
//   const handleGetChat = async () => {

//  const verokey=chatRoom.veroKey

//     const tokenFromPersistentState = await SecureStore.getItemAsync(
//      verokey,
//     );
//     if (tokenFromPersistentState) {
//       console.log(tokenFromPersistentState)
//      let mydata = JSON.parse(tokenFromPersistentState)
     
    
//      console.log(mydata,"56sky")
    
   
//     (mydata? setLastMessage(mydata[mydata.length-1].message): console.log('no sky'))
//     // (mydata? setLastMessageTime(mydata[mydata.length-1].message.date): console.log('no sky'))
//       // setMChatMessage(old=>[...old,data])
   
//     }

   
//   };


  // const handleGetChat = (id) => {

  //   let hisId=route.params.id
  //     console.log(hisId,"fetching")
  //   db.transaction(tx => {
  //     // sending 4 arguments in executeSql
  //     tx.executeSql('SELECT * FROM chatData WHERE veroKey=?', [global.veroKey], // passing sql query and parameters:null
  //       // success callback which sends two things Transaction object and ResultSet Object
  //       (txObj, { rows: { _array } }) => {console.log(_array);
          
  //         let mydata = JSON.parse(_array[_array.length-1].chats);
  //         mydata = mydata.filter(user=>user.to!==chatRoom.veroKey)

  //         setLastMessage(mydata[mydata.length-1].message),console.log(mydata,"finalme sky")} ,
  //       // failure callback which sends two things Transaction object and Erro
  //       ) // end executeSQL
  //   }) // end transaction
  // }
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
  const getMyChat=()=>{
 
     axios.post(`https://messangerapi533cdgf6c556.amaprods.com/api/users/getMyChatData`,{
       to:user.veroKey,
       from:global.privateKey
     }).then((res)=>{
       console.log(res.data.message[0])
     setLastMessage(res.data.message[0]) ;
    //  console.log(JSON.parse(res.data.message[res.data.message.length-1].chat))
    
      })
      .catch((err)=>{
        console.log(err)
        
      })
  }

  useFocusEffect(
    React.useCallback(() => {
      getMyChat()
      
     }, [])
   );
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
          
          {LastMessage && !LastMessage.image && !LastMessage.video && !LastMessage.audio? <Text numberOfLines = { 1 } style={styles.lastMessage}>
            {LastMessage.text}
          </Text>:null}

          {LastMessage && LastMessage.image? <Image source={{uri:LastMessage.image}}  style={{width:20,height:20}}/>:null}
          {LastMessage && LastMessage.video?<MaterialIcons name="local-movies" size={20} color="black" />:null}
          {LastMessage && LastMessage.audio?<MaterialIcons name="audiotrack" size={20} color="black" />:null}
        </View>
      </View>
{LastMessage? <Text style={styles.time}>

{moment(LastMessage.createdAt).fromNow()}   
          </Text>:null}
     
    </View>
    
    </TouchableWithoutFeedback>
   
  );
};

export default ChatListItem;
