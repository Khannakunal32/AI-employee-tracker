import React, { useEffect, useState } from "react";
import { BackHandler, Button, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { LocationGeofencingEventType } from "expo-location";
import * as TaskManager from "expo-task-manager";
import * as Permissions from "expo-permissions";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
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
