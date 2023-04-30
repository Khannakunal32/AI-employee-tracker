import React, { useEffect, useState } from "react";
import { BackHandler, Button, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { LocationGeofencingEventType } from "expo-location";
import * as TaskManager from "expo-task-manager";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();

export default function GeofenceCheckScreen() {
  // const GeofenceCheckScreen = () => {
  const [locationStatus, setLocationStatus] = useState(
    "No information available (please reload this app)"
  );

  const [boolInLocation, setBoolInLocation] = useState(false);
  const [boolNoMock, setBoolNoMock] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(false);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  TaskManager.defineTask(
    "GEOFENCE_TASK",
    ({ data: { eventType, region }, error }) => {
      if (error) {
        // check `error.message` for more details.
        console.log(error.message);
        return;
      }

      if (eventType === LocationGeofencingEventType.Enter) {
        console.log("You've entered region:", region);
        setLocationStatus("You are inside region " + region.identifier);
        _askPermission();
        Notifications.scheduleNotificationAsync({
          content: {
            title: "ENTERED GEOFENCE",
            body: region.identifier,
          },
          trigger: null,
        });
        setBoolInLocation(true);
      } else if (eventType === LocationGeofencingEventType.Exit) {
        setBoolInLocation(false);
        setShowLoginButton(false);
        console.log("You've left region:", region);
        setLocationStatus(
          "You are outside region " +
            region.identifier +
            " attendance will not be marked!"
        );
         _askPermission();
        alert("You've left region: ", region.identifier);
        Notifications.scheduleNotificationAsync({
          content: {
            title: "EXITED GEOFENCE",
            body: region.identifier,
          },
          trigger: null,
        });

        //   setTimeout(() => {
        //   BackHandler.exitApp();
        // }, 1000);
      }
    }
  );

  const [isLoading, setIsLoading] = useState(true);
  const [msg, setMsg] = useState(null);
  const [mockCheck, setMockCheck] = useState(false);

  const _askPermission = async () => {
    try {
      var location = await Location.getCurrentPositionAsync({});
    } catch (err) {
      setMsg(err.message);
      _askPermission();
      return;
    }
    setIsLoading(false);

    setMockCheck(JSON.stringify(location.mocked));
    text = JSON.stringify(location.mocked);
    if (text == "true") {
      setBoolNoMock(false);
      setShowLoginButton(false);

      alert("Mocked location detected.");
      setMsg("Mocked location detected");
      // setTimeout(() => {
      //   BackHandler.exitApp();
      // }, 2000);
      return;
    } else {
      setMsg("Mock Check Successfull");
      setBoolNoMock(true);
    }
  };

  useEffect(() => {
    (async () => {
      // const { granted: notificationsGranted } =
      //   await Notifications.getPermissionsAsync();
      // if (!notificationsGranted) {
      //   await Notifications.requestPermissionsAsync();
      // }
      // await Permissions.askAsync(Permissions.LOCATION_BACKGROUND);
      Location.requestBackgroundPermissionsAsync();
      const { granted: fgGranted } =
        await Location.getForegroundPermissionsAsync();

      // console.log(fgGranted);
      if (!fgGranted) {
        setMsg("Permission to access location was denied");
        await Location.requestForegroundPermissionsAsync();

        try {
          await Location.requestBackgroundPermissionsAsync();
        } catch (err) {
          alert(err.message);
        }
      }

      await _askPermission();

      const geofences = [
        // {
        //   identifier: "Stockholm",
        //   latitude: 59.332598,
        //   longitude: 18.035258,
        //   radius: 10000,
        //   notifyOnEnter: true,
        //   notifyOnExit: true,
        // },
        {
          identifier: "HOME",
          latitude: 28.705564,
          longitude: 77.1206821,
          radius: 100,
          notifyOnEnter: true,
          notifyOnExit: true,
        },
        // {
        //   identifier: "COLLEGE",
        //   latitude: 28.7370735,
        //   longitude: 77.1129645,
        //   radius: 100,
        //   notifyOnEnter: true,
        //   notifyOnExit: true,
        // }
      ];
      await Location.startGeofencingAsync("GEOFENCE_TASK", geofences);
    })();
  }, []);

  const navigation = useNavigation();

  const objectAuthorityToken = {
    mock: mockCheck,
    locationStat: locationStatus,
  };
  // console.log(objectAuthorityToken);

  const checkSystem = async () => {
    if (boolInLocation && boolNoMock) {
      setShowLoginButton(true);
      return;
    }
    alert("Get into the region to proceed...");
    setShowLoginButton(false);
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>App is Loading...</Text>
      ) : (
        <Text>Welcome to Bractance</Text>
      )}
      <Text>{msg}</Text>
      <Text>{locationStatus}</Text>
      <Button title="Check System" onPress={checkSystem}></Button>
      {showLoginButton ? (
        <Button
          title="Sign In"
          onPress={() => {
            navigation.navigate("LoginScreenAttendance", {
              authorityTokenParam: objectAuthorityToken,
            });
          }}
        ></Button>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
