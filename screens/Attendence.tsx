import React from 'react'
import { View,Text,Image, FlatList , StyleSheet} from 'react-native'
import soapLogo from '../assets/images/soapLogo.png'
import kali from '../assets/images/kali2.png'

import {Camera} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';



import Colors from '../constants/Colors'

export default function Attendence() {
    const [hasPermission, setHasPermission] = React.useState();
const [faceData, setFaceData] = React.useState([]);
 var torf = false;

React.useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
//   else return <Text>wow</Text>;


function getFaceDataView() {
    if (faceData.length === 0) {
      return (
        <View style={styles.faces}>
          <Text style={styles.faceDesc}>No faces :(</Text>
        </View>
      );
    } else if(torf===false){
  torf= true;
      return (
        <View style={styles.faces}>
          <Text style={styles.faceDesc}>Face Detected</Text>

        </View>
      );
      
    }
    else { return (<View> <Text>already marked</Text> </View>);  }
  }

  const handleFacesDetected = ( {faces} ) => {
    setFaceData(faces);
    console.log(faces);

  }
  

    return (

        <Camera 
      type={Camera.Constants.Type.front}
      style={styles.camera}
      onFacesDetected={handleFacesDetected}
      >
      {getFaceDataView()}
    </Camera>

    );
}


const styles = StyleSheet.create({
    camera: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    faces: {
      backgroundColor: '#ffffff',
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 16
    },
    faceDesc: {
      fontSize: 20
    }
  });   