import moment from "moment";
import React, { useEffect } from "react";
import { Text, View,Image } from "react-native";
import { Message } from "../../types";
import styles from "./style";
import { Audio } from 'expo-av';
import { useState } from 'react'
import AudioPlayer from "../audioPlayer";

// export type ChatMessageProps = {
//   message: Message;
// };
// async function playSound(audio) {
//   const [sound, setSound] = useState();
//   console.log('Loading Sound');
//   // const { sound } = await Audio.Sound.createAsync(
//   //    require('./assets/Hello.mp3')
//   // );
//   setSound(audio);

//   console.log('Playing Sound');
//   await sound.playAsync(); }

const ChatMessage = (props) => {
  const [startImageLoading, setStartImageLaoding] = useState(false)
console.log(props.message,"sky")
  const { message } = props;

  const isMyMessage = () => {
   return message.from ===global.privateKey;
   
  };

  const startLoading=()=>{
setStartImageLaoding(true)
  }
  const stopLoading=()=>{
    setStartImageLaoding(false)
  }

  
  return (
    <View style={styles.container}>
      {(message.to==props.hisid || message.from==props.hisid)? <View
        style={[
          styles.messageBox,
          {
            backgroundColor: isMyMessage() ? "#e8dcef" : "white",
            marginLeft: isMyMessage() ? 50 : 0,
            marginRight: isMyMessage() ? 0 : 50,
          },
        ]}
      >
        {!isMyMessage() && <Text style={styles.name}>{message.user.name}</Text>}
        {isMyMessage() && <Text style={styles.name}>You</Text>}
        {message.audio?<AudioPlayer uri={message.audio} />:null}
       
        {/* {message.message.type=="emoji"?<Text style={{fontSize:50}}>{message.text}</Text>:null} */}
        {message.image? <Image onLoadStart={startLoading} onLoadEnd={stopLoading}
              style={{ width: 300, height: 300 }}
              source={{uri:message.image}}></Image>:<Text style={styles.message}>{message.text?message.text:null}</Text>}
   
      
        <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
      </View>:null}
      
     
    </View>
  );
};

export default ChatMessage;
