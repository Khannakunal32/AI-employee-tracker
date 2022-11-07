import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/core";
import { View, TouchableOpacity, Image } from "react-native";
import { AntDesign, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import styles from "./style";
import { useNavigation } from "@react-navigation/core";
import * as SecureStore from "expo-secure-store";
const ProfileSetting = () => {
  const navigation = useNavigation();

  const [User, setUser] = useState();
  const onClick = () => {
    navigation.navigate("Settings");
  };
  const handleGetToken = async (key) => {
    const tokenFromPersistentState = await SecureStore.getItemAsync(key);
    if (tokenFromPersistentState) {
      const mydata = JSON.parse(tokenFromPersistentState);
      setUser(mydata);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // getToken()
      handleGetToken("userAuthToken");
    }, [])
  );

  return (
    <TouchableOpacity onPress={onClick} style={styles.container}>
      <View style={{ marginLeft: -15}}>
        {User ? (
          <Image source={{ uri: User.ProfilePic }} style={styles.avatar} />
        ) : (
          <View style={{ marginLeft: 20 }}>
            <FontAwesome name="user" size={24} color="white" />
          </View>
        )}
        {/* <MaterialIcons name="contact-page" size={20} color="white" /> */}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileSetting;
