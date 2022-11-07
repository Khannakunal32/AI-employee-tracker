import React, { useState, useEffect } from "react";
import { Platform, Text, View, StyleSheet, BackHandler, Image } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { AutoFocus } from "expo-camera";

export default function MissingChildScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    var longitude = location.coords.longitude;
    var latitude = location.coords.latitude;
    var speed = location.coords.speed;
    var accuracy = location.coords.accuracy;
    var mock = "false";
    console.log(location.mocked);
    // alert("Elegible :)");
  }

  if (location && location.mocked === true) {
    alert("mocklocation detected");
    mock = "true";
    setTimeout(() => {
      BackHandler.exitApp();
    }, 2000);
  }

  return (
    // <View style={styles.container}>
    //   <Text>mock: {mock}</Text>
    //   <Text>longitude: {longitude} </Text>
    //   <Text>latitude: {latitude}</Text>
    //   <Text>accuracy: {accuracy}</Text>
    //   <Text>speed: {speed}</Text>
    //   </View>

       <View style = {styles.container}>
        {/* <View style={styles.picture} >
          </View> */}
          <Image 
          style = {styles.picture} 
          source = {require('../assets/images/avatar-1.jpg')} />

        <View style={{ backgroundColor: "red", flex: 0.5 }}>
          <Text>Name</Text>
          <Text>Age</Text>
          <Text>Dob</Text>
        </View>
      </View> 

  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  picture: {
    width: '30%',
    color: 'green',
  }


});
