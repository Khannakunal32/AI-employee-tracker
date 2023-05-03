import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { Camera } from "expo-camera";
// import { FaceDetector } from "react-native-camera";
import * as FaceDetector from "expo-face-detector";

export default function RegisterFacePage({user}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
  const [faceDetectedCam, faceDetectedCamEvent] = useState(false);
  const [faceDetacted, setFaceDetacted] = useState(false);
  const [faceDataStore, setFaceDataStore] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const askCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const faceDetectedHandler = (e) => {
    if (e.faces && e.faces.length > 0) {
      faceDetectedCamEvent({ available: true, data: e.faces });
      setFaceDetacted(true);
    } else {
      faceDetectedCamEvent({ available: false, data: null });
      setFaceDetacted(false);
    }
  };

  const handelStoreFace = (data) => {
    setFaceDataStore((prev) => [...prev, data]);
  };
  
  const registerFace = () => {
    if (faceDetacted) {
      let fdata = faceDataStore[faceDataStore.length - 1][0];
      console.log(JSON.stringify(fdata));
      const body = { attendence: true, email: user.email, faceUser: fdata };
      console.log(body);
      setLoading(true);
      axios
        .post(`${server_url}/BSA/registerFace`, body)
        .then((res) => {
          if (res.data.status) {
            setLoading(false);
            setIsAttendanceMarked(true);
          } else {
            throw new Error(res.data.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          alert(err || "Error | Could not register");
        });
    } else {
      alert("Could not validate without face");
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        onFacesDetected={(e) => {
          faceDetectedHandler(e);
        }}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.accurate,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        {/* <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {
            setType(
              type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View> */}
      </Camera>
      <View style={styles.buttonContainer}>
        {isAttendanceMarked ? (
          <Text style={styles.attendanceMarked}>Attendance marked!</Text>
        ) : (
          <Button title="Register Face" onPress={registerFace} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Ask for camera permission"
          onPress={askCameraPermission}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 0.1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 18,
    color: "black",
  },
  attendanceMarked: {
    fontSize: 18,
    fontWeight: "bold",
    color: "green",
  },
});
