import React, { useState } from "react";
import { Platform, Text } from "react-native";
import { View ,TextInput,KeyboardAvoidingView,TouchableOpacity,SafeAreaView } from "react-native";
import styles from './style'
import {MaterialCommunityIcons,
    FontAwesome5,Entypo,Fontisto,MaterialIcons, Ionicons} from '@expo/vector-icons'
    import EmojiSelector from 'react-native-emoji-selector'
const InputBox = (props) => {
  
    const [message,setMessage]=useState('');
    const [showEmoji,setshowEmoji]=useState(false);
    const [recordingStart,setrecordingStart]=useState(false);
const onMicroPhonePressIn=()=>{

props.microPhoneClickedIn()
}
const onMicroPhonePressOut=()=>{
  console.log('MicroPhone Press')
  props.microPhoneClickedOut()
  }
const startTyping=(data)=>{
  setMessage(data)
  props.onStartTyping()
  
}


const microphoneLongPressStart=()=>{
  setrecordingStart(true)
  props.microphoneLongPressStart()
}


const microphoneclickagain=()=>{
  setrecordingStart(false)
  props.microphoneLongPressOut()
}
const onSendPress=()=>{
    // console.warn('send Press')  
    props.onMessageSend(message)
    setMessage('')
} 
const onPress=()=>{
        if(!message){
console.log('presed micro phone')
        }else{
onSendPress()
        }
    }

    const onPressCamera=()=>{
      props.cameraPicker()
    }

    const onPressFile=()=>{
      props.onPressFile()
    }

    const onFlamePresses=()=>{
      props.onFlamePresses()
    }
  return (
    <View style={styles.container}>
      {!recordingStart? <View style={styles.mainContainer}>
           
      <TouchableOpacity onPress={()=>{props.onEmojiClick()}}><FontAwesome5 name="laugh-beam" size={24} color="grey"   /></TouchableOpacity>
            <TextInput
            placeholder="MegaHoot Message"
             style={styles.textInput} multiline
            value={message}
            onChangeText={(e)=>{startTyping(e)}}
       
            
             />
             {!message?<TouchableOpacity  onPress={props.purgeClicked}><Ionicons name="skull" size={24} color="red" /></TouchableOpacity>:null}
            
               {message? <TouchableOpacity 
            onPress={onFlamePresses}>
               <Ionicons name="flame" size={24} color="orange" />
              </TouchableOpacity> :null}
             <TouchableOpacity 
            onPress={onPressFile}>
               <Entypo name="attachment" size={24} color="grey"  style={styles.icons} /></TouchableOpacity> 
           
           {!message&&   
            <TouchableOpacity 
            onPress={onPressCamera}>
              <Fontisto name="camera" size={24} color="grey" style={styles.icons} /></TouchableOpacity> 
          }
             
        </View>

:<View style={styles.mainContainer}><Text style={{margin:2,textAlign:'center',color:"red",fontWeight:'bold',fontSize:20}}>Audio Recording</Text></View>}
       
          {message? <TouchableOpacity onPress={onPress}  ><View style={styles.buttonContainer}>
          <MaterialIcons name="send" size={28} color="white"  />
   
          </View></TouchableOpacity>:null}

          {!message? <TouchableOpacity onPressIn={microphoneLongPressStart} onPressOut={microphoneclickagain}  ><View style={styles.buttonContainer}>
          <MaterialCommunityIcons name="microphone" size={28} color="white" />
   
          </View></TouchableOpacity>:null}
         
     
     
    </View>
   
  );
};
export default InputBox;
