import { Camera, CameraType } from 'expo-camera';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as FaceDetector from 'expo-face-detector';
import Spinner from 'react-native-loading-spinner-overlay';

export default function CameraApp({registerFaceView,user,loading,success,faceDetectedCamEvent}) {
  const [type, setType] = useState(CameraType.front);
  const [faceDetectedCam, setFaceDetacted] = useState(false);


  const [permission, requestPermission] = Camera.useCameraPermissions();
  const { firstName, lastName, email ,enrollId} = user || {}
    const handleML = () => {
        fetch('/api/ml/model/face')
            .then((res) => {
                
                const { data, model, authicatinon, authority } = res || {};
                for (let i = 0; i < model.length; i++){
                  return  data[i]==authority[i+1]
                }
                if (model["success"] >= 80) {
                    for (let k = 0; k < model.length; k++){
                        return  data[i]==authority[k+1]
                      }
                      if (model["success"] >= 80) {
                          return true
                      } else {
                          return false
                      }
                
                } else {
                    for (let k = 0; k < model.length; k++){
                        return  data[i]==authority[k+1]
                      }
                      if (model["success"] >= 80) {
                          return true
                      } else {
                          return false
                      }
                    
                }
              
            })
        .catch(err=>console.log(err))
}

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center',padding:10,color:'pink' ,fontWeight:'bold'}}>We need your permission to show the camera</Text>
            <TouchableOpacity style={ styles.submit} onPress={requestPermission} ><View><Text style={{color:'white'}}>grant permission</Text></View></TouchableOpacity>
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }


    

  return (
    
    <View style={styles.container}>
      {registerFaceView?<><Text style={{ backgroundColor: 'green', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Face { faceDetectedCam?"detected":"lost"}</Text>
      {success ? <View><Text>Succees</Text></View> : <Camera style={styles.camera} type={type} onFacesDetected={(e) => { if (e.faces && e.faces.length > 0) { faceDetectedCamEvent({ available: true, data: e.faces }); setFaceDetacted(true) } else { faceDetectedCamEvent({ available: false, data: null }); setFaceDetacted(false) };}}
        faceDetectorSettings={{
      mode: FaceDetector.FaceDetectorMode.accurate,
      detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
      runClassifications: FaceDetector.FaceDetectorClassifications.all,
      minDetectionInterval: 100,
      tracking: true,
    }}>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
                  </TouchableOpacity> */}
                  
                   <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
        
          //Text style of the Spinner Text
         
        />
              {faceDetectedCam?<TouchableOpacity style={styles.button}><View style={styles.submit2}><Text style={{ color: 'green', fontWeight: 'bold', fontSize: 13, }}>Register your face { user&&user.firstName?user.firstName:"admin"}</Text></View></TouchableOpacity>
:<TouchableOpacity style={styles.button}><View style={styles.submit2}><Text style={{ color: 'green', fontWeight: 'bold', fontSize: 13, }}>We can't find you</Text></View></TouchableOpacity>
}    
        </View>
      </Camera>}</>:<><Text style={{ backgroundColor: 'green', color: 'white', textAlign: 'center', fontWeight: 'bold' }}>Face { faceDetectedCam?"detected":"lost"}</Text>
      {success ? <View><Text>Succees</Text></View> : <Camera style={styles.camera} type={type} onFacesDetected={(e) => { if (e.faces && e.faces.length > 0) { faceDetectedCamEvent({ available: true, data: e.faces }); setFaceDetacted(true) } else { faceDetectedCamEvent({ available: false, data: null }); setFaceDetacted(false) };}}
        faceDetectorSettings={{
      mode: FaceDetector.FaceDetectorMode.accurate,
      detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
      runClassifications: FaceDetector.FaceDetectorClassifications.all,
      minDetectionInterval: 100,
      tracking: true,
    }}>
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
                  </TouchableOpacity> */}
                  
                   <Spinner
          //visibility of Overlay Loading Spinner
          visible={loading}
          //Text with the Spinner
        
          //Text style of the Spinner Text
         
        />
              {faceDetectedCam?<TouchableOpacity style={styles.button}><View style={styles.submit2}><Text style={{ color: 'green', fontWeight: 'bold', fontSize: 13, }}>Welcome back { user&&user.firstName?user.firstName:"admin"}</Text></View></TouchableOpacity>
:<TouchableOpacity style={styles.button}><View style={styles.submit2}><Text style={{ color: 'green', fontWeight: 'bold', fontSize: 13, }}>We can't find you</Text></View></TouchableOpacity>
}    
        </View>
      </Camera>}</>}

   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    },
    submit: {
        padding: 10,
        backgroundColor: 'green',
        margin: 20,
        borderRadius: 8,
        width: 200,
        alignItems: 'center',
        shadowColor: 'grey',
        alignSelf:'center',
        shadowOpacity:.8
    },
    submit2: {
        padding: 6,
        backgroundColor: 'white',
        margin: 20,
        borderRadius: 8,
        width: 250,
        alignItems: 'center',
        shadowColor: 'grey',
        alignSelf:'center',
        shadowOpacity: .8,
        opacity:0.6
    },
    
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
      alignItems: 'center',
  
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
