import React, { useEffect, useState } from "react";
import { BackHandler, Button, StyleSheet, Text, View } from "react-native";
import LoginScreenAttendace from "./LoginScreenAttendance";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GeofenceCheckScreen from "./GeofenceCheckScreen";
import Colors from '../constants/Colors'

// const Stackk= createStackNavigator();
const Stack = createNativeStackNavigator();

export default function GeofenceScreen() {
  return (
    <Stack.Navigator
      initialRouteName="GeofenceCheckScreen"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Navigator initialRouteName="LoginScreenAttendance"> */}
      <Stack.Screen
        name="GeofenceCheckScreen"
        component={GeofenceCheckScreen}
      ></Stack.Screen>
      <Stack.Screen
        name="LoginScreenAttendance"
        component={LoginScreenAttendace}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
