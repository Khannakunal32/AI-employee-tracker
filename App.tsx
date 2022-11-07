import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import socket, { startSocket } from "./socket";
import { notificationCustom } from "./notifications";
import { AppState, TouchableOpacity } from "react-native";
import * as Updates from "expo-updates";
import { View, Text } from "./components/Themed";


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [updateAvailable, setUpdateAvailable] = useState(false);

  AppState.addEventListener("change", () => {
    startSocket();
  });

  useEffect(() => {
    Updates.checkForUpdateAsync()
      .then((res) => {
        res.isAvailable ? setUpdateAvailable(true) : null;
      })
      .catch((err) => console.log(err));

   
  }, []);

  useEffect(() => {
    // createDb()
    startSocket();
  }, []);
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        {updateAvailable ? (
          <View style={{ minHeight: "10%" ,flexDirection:'column',justifyContent:'center',alignItems:'center',backgroundColor:'white'}}>
            <Text>Latest Update Available</Text>
            <View style={{flexDirection:'row',justifyContent:'space-evenly'}}><TouchableOpacity onPress={()=>{ Updates.fetchUpdateAsync().then((res) => {
      res.isNew?Updates.reloadAsync():null
    });}}><Text style={{backgroundColor:'#2C88F7',color:'white',margin:10,padding:5,borderRadius:5}}>Update</Text></TouchableOpacity><TouchableOpacity onPress={()=>setUpdateAvailable(!updateAvailable)}><Text style={{backgroundColor:'red',color:'white',margin:10,padding:5,borderRadius:5}}>Cancel</Text></TouchableOpacity></View>
          
          </View>
        ) : null}
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
