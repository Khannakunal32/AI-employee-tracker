import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function AttendancePage() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  const askCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  const markAttendance = () => {
    setIsAttendanceMarked(true);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
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
          <Button title="Mark Attendance" onPress={markAttendance} />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Ask for camera permission" onPress={askCameraPermission} />
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
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
  attendanceMarked: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
});
