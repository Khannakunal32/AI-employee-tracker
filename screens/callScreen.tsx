import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons'; 
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '../constants/Colors';
export default function CallScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

//   useEffect(() => {
//     const cameraPickerHandler = async () => {
//       const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  
//       if (permissionResult.granted === false) {
//         alert("You've refused to allow this appp to access your camera!");
//         return;
//       }
  
//       // let result = await ImagePicker.launchCameraAsync();
  
  
      
//       let result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.All,
//         allowsEditing: true,
//         quality: 1,
//         base64:true,
//         aspect: [9, 16],
//       });
//       // Explore the result
//       console.log(result);
  
//       if (!result.cancelled) {
      
//         console.log('success');
     
//       }
     
  
//       // let result = await ImagePicker.launchImageLibraryAsync({
//       //   mediaTypes: ImagePicker.MediaTypeOptions.All,
//       //   allowsEditing: true,
//       //   quality: 1,
//       //   base64:true,
//       //   aspect: [9, 16],
//       // });
  
    
//       // console.log(result);
  
//       // if (!result.cancelled) {
//       //   setImage(result.uri);
//       //   let message = {
//       //     to:route.params.id,
//       //     message: result,
//       //     from: user.id,
//       //     userName:user.name
//       //   }
//       //  setMChatMessage(old => [...old,message])
//       // socket.emit('message', message)
//       // }
//     };
//     cameraPickerHandler()
//   }, []);

  return (
    <View style={styles.container}>
      {/* <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera> */}
      <View style={styles.user1}>
  {/* <Spinner
          visible={true}
          textContent={'Calling'}
          textStyle={styles.spinnerTextStyle}
        /> */}
      </View>
      <View style={styles.user2}></View>
      <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:20}}><Text style={{textAlign:'center',backgroundColor:'green',width:50,height:50,padding:3,borderRadius:50}}><Ionicons name="call" size={24} color="white" /></Text>
      <Text style={{textAlign:'center',width:50,height:50,padding:3,borderRadius:50}}><FontAwesome name="microphone" size={44} color={Colors.light.tint} /></Text>

 <Text style={{textAlign:'center',backgroundColor:'red',width:50,height:50,padding:3,borderRadius:50}}><Ionicons name="call" size={24} color="white" /></Text>
     </View>
 
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10
  },
  user1: {
  width:'100%',
  height:'40%',
  backgroundColor:'grey',
  minWidth:200,
  minHeight:200,
  marginBottom:30,
  borderRadius:10
  },
  user2: {
    width:'100%',
    height:'40%',
    backgroundColor:'grey',
    minWidth:200,
    minHeight:200,
    borderRadius:10
    },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});