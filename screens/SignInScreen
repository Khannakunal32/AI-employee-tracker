import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import jwt_decode from "jwt-decode";

import * as SecureStore from "expo-secure-store";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../constants/Colors";
import { notificationCustom } from "../notifications";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Navigation from "../navigation";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [User, setUser] = useState();
  const [myToken, setMyToken] = useState({});
  notificationCustom();

  useFocusEffect(
    React.useCallback(() => {
      // getToken()
    }, [])
  );
  const handleSetToken = async (key, value) => {
    SecureStore.setItemAsync(key, value).then;
    setMyToken(value);
  };

  const handleGetToken = async (key) => {
    const tokenFromPersistentState = await SecureStore.getItemAsync(key);
    if (tokenFromPersistentState) {
      const mydata = JSON.parse(tokenFromPersistentState);
      setUser(mydata);
    }
  };
  const signInHandler = () => {
    var decoded;

    axios
      .post(`https://messangerapi533cdgf6c556.amaprods.com/api/users/login`, {
        email: Email,
        password: Password,
      })
      .then((res) => {
        const data = res.data;
        decoded = jwt_decode(data.token);
        if (decoded) {
          const data = JSON.stringify(decoded.result);
          console.log(decoded.result);
          setUser(decoded.result);
          console.log(decoded.result, "user data");
          // global.privateKey=decoded.result.privateKey
          // global.name=decoded.result.firstName +" "+decoded.result.lastName

          handleSetToken("userAuthToken", data);
          handleGetToken("userAuthToken");
        }

        // handle success
        //  alert(JSON.stringify(decoded.result))
        //   saveData('userData',JSON.stringify(decoded.result.id))
      })
      .then(() => {
        setIsLoggedIn(true);
        // notificationCustom();

        axios
          .post(
            `https://messangerapi533cdgf6c556.amaprods.com/api/users/storeMyNtoken`,
            { token: global.pushToken, veroKey: decoded.result.privateKey }
          )
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => console.log(err));
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
  };
  const logOut = () => {
    const handlelogout = async (key) => {
      const tokenFromPersistentState = await SecureStore.deleteItemAsync(key);
      setUser(null);
    };
    handlelogout("userAuthToken");
  };

  //  useEffect(() => {
  //   handleGetToken('userAuthToken')
  //  }, [])

  useFocusEffect(
    React.useCallback(() => {
      handleGetToken("userAuthToken");
    }, [User])
  );

  const [data, setData] = React.useState({
    password: "",
    email: "",
    check_textInputChangeFn: false,
    check_textInputChangeLn: false,
    check_textInputChangeE: false,
    check_textInputChangeUn: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const textInputChange = (val, inputName, inputChange) => {
    if (val.length !== 0) {
      setData({
        ...data,
        // username: val,
        [inputName]: val,
        // check_textInputChange: true,
        [inputChange]: true,
      });
    } else {
      setData({
        ...data,
        // username: val,
        [inputName]: val,
        // check_textInputChange: false,
        [inputChange]: false,
      });
    }
  };

  //   const inputFirstname = (val) => {
  //     if (val.length !== 0) check_textInputChange
  //   }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  var verifyForm = () => {
    if (
      data.first_name == "" ||
      data.last_name == "" ||
      data.email == "" ||
      data.username == "" ||
      data.password == "" ||
      data.confirm_password == "" ||
      data.password !== data.confirm_password
    ) {
      alert("failiure");
    } else {
      alert("success");
    }
  };

  //  const navigation = useNavigation();

  const OpenProfilePage = () => {
    navigation.navigate("ProfileEdit", {userPicture: User.ProfilePic, userFirstName: User.firstName, userLastName: User.lastName });
  };
  

  return (
    <View style={styles.container}>
      {!User ? (
        <View style={styles.container}>
          <StatusBar
            backgroundColor={Colors.light.tint}
            barStyle="light-content"
          />

          <View style={styles.header}>
            <Image
              style={{ width: 200, height: 100, alignSelf: "center" }}
              source={require("../assets/images/logo.png")}
            ></Image>
          </View>
          <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <ScrollView>
              <Text style={[styles.text_footer]}>Email</Text>
              <View style={styles.action}>
                <TextInput
                  placeholder="Your Email"
                  textContentType="emailAddress"
                  style={styles.textInput}
                  autoCapitalize="none"
                  //   onChangeText={(val) => textInputChange(val, 'email','check_textInputChangeE')}

                  //   onBlur={ val => this.isValidEmail(val) }
                  value={Email}
                  onChangeText={setEmail}
                />

                {/* {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={18} />
              </Animatable.View>
            ) : null} */}
              </View>

              <Text
                style={[
                  styles.text_footer,
                  {
                    marginTop: 35,
                  },
                ]}
              >
                Password
              </Text>
              <View style={styles.action}>
                <Feather name="lock" color="#05375a" size={15} />
                <TextInput
                  placeholder="Your Password"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  style={styles.textInput}
                  autoCapitalize="none"
                  //   onChangeText={(val) => handlePasswordChange(val)}
                  value={Password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={updateSecureTextEntry}>
                  {data.secureTextEntry ? (
                    <Feather name="eye-off" color="grey" size={20} />
                  ) : (
                    <Feather name="eye" color="grey" size={20} />
                  )}
                </TouchableOpacity>
              </View>

              <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                  By signing in you agree to our
                </Text>
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                >
                  {" "}
                  Terms of service
                </Text>
                <Text style={styles.color_textPrivate}> and</Text>
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                >
                  {" "}
                  Privacy policy
                </Text>
              </View>
              <View style={[styles.button, { bottom: 0 }]}>
                <TouchableOpacity style={styles.signUp}>
                  {/* <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                > */}

                  <Text
                    style={[
                      styles.textSign,
                      {
                        color: "#fff",
                      },
                    ]}
                  >
                    Sign In
                  </Text>
                  {/* </LinearGradient> */}
                </TouchableOpacity>

                <TouchableOpacity
                  //   onPress={() => navigation.goBack()}
                  //   onPress={() => verifyForm()}

                  onPress={signInHandler}
                  style={[
                    styles.signUp,
                    {
                      //   borderColor: "#009387",
                      borderColor: Colors.light.text,
                      borderWidth: 1,
                      marginTop: 0,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.textSign,
                      {
                        // color: "#009387",
                        color: Colors.light.text,
                      },
                    ]}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>Not Registered?</Text>
                <Text
                  style={[styles.color_textPrivate, { fontWeight: "bold" }]}
                  //  onPress={() => Linking.openURL('http://google.com')}>{" "}
                  // onPress={()=>{  navigation.navigate('SignIn')
                  onPress={() => {
                    navigation.navigate("Register");
                  }}
                >
                  {" "}
                  Register
                </Text>
              </View>
            </ScrollView>
          </Animatable.View>
        </View>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: !User ? "#e8dcef" : "white",
            height: "100%",
          }}
        >
          <View
            style={{ flex: 1, width: "100%", justifyContent: "space-evenly" }}
          >
            {User.privateKey ? (
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  margin: 10,
                  marginTop: -30,
                }}
              >
                {/* Kunal edit this part */}
                {/* <TouchableOpacity onPress={OpenProfilePage}> */}
                <TouchableOpacity onPress={() => { 
    navigation.navigate("ProfileEdit", {userPicture: User.ProfilePic, userFirstName: User.firstName, userLastName: User.lastName });
  }}>
                  <Image
                    source={{ uri: User.ProfilePic }}
                    style={styles.avatar}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={OpenProfilePage}>
                {/* <TouchableOpacity onPress={()=>{console.log(User.firstName)}}> */}
                  <View style={styles.midContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={styles.username}>
                        {User.firstName
                          ? `${User.firstName} ${User.lastName}`
                          : null}
                      </Text>
                      
                      <AntDesign name="edit" size={18} color="black" style={{marginLeft: 10}} />
                    </View>

                    <Text style={styles.time}>{User.privateKey}</Text>
                  </View>
                </TouchableOpacity>
                <View style={{ marginLeft: "auto", justifyContent: "center" }}>
                  <TouchableWithoutFeedback onPress={logOut}>
                    <AntDesign
                      name="logout"
                      size={24}
                      color={Colors.light.tint}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            ) : null}

            {User.privateKey ? (
              <View>
                <View
                  style={{
                    backgroundColor: Colors.light.background,
                    borderRadius: 10,
                    padding: 10,
                    alignSelf: "flex-start",
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Account
                  </Text>
                </View>
              </View>
            ) : null}
            {User.privateKey ? (
              <View>
                <View
                  style={{
                    backgroundColor: Colors.light.background,
                    borderRadius: 10,
                    padding: 10,
                    alignSelf: "flex-start",
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Chats
                  </Text>
                </View>
              </View>
            ) : null}
            {User.privateKey ? (
              <View>
                <View
                  style={{
                    backgroundColor: Colors.light.background,
                    borderRadius: 10,
                    padding: 10,
                    alignSelf: "flex-start",
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Appearance
                  </Text>
                </View>
              </View>
            ) : null}
            {User.privateKey ? (
              <View>
                <View
                  style={{
                    backgroundColor: Colors.light.background,
                    borderRadius: 10,
                    padding: 10,
                    alignSelf: "flex-start",
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Linked devices
                  </Text>
                </View>
              </View>
            ) : null}
            {User.privateKey ? (
              <View>
                <View
                  style={{
                    backgroundColor: Colors.light.background,
                    borderRadius: 10,
                    padding: 10,
                    alignSelf: "flex-start",
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Data and Storage
                  </Text>
                </View>
              </View>
            ) : null}

            {User.privateKey ? (
              <View>
                <View
                  style={{
                    backgroundColor: Colors.light.background,
                    borderRadius: 10,
                    padding: 10,
                    alignSelf: "flex-start",
                    marginLeft: 15,
                  }}
                >
                  <Text
                    style={{
                      color: "grey",
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    Invite
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      )}
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#009387",
    backgroundColor: Colors.light.tabIconSelected,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 18,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,
    // backgroundColor: '#fff',
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 30,
    flexDirection: "column",
  },
  text_header: {
    // color: '#fff',
    fontWeight: "bold",
    fontSize: 30,
    color: Colors.dark.text,
  },
  text_footer: {
    // color: '#05375a',
    color: Colors.light.text,
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signUp: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 18,
  },
  color_textPrivate: {
    color: "grey",
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 15,
    borderRadius: 50,
    backgroundColor: Colors.light.tint,
  },
  leftContainer: {
    flexDirection: "row",
  },
  midContainer: {
    justifyContent: "space-around",
  },
  username: {
    fontWeight: "bold",
    fontSize: 16,
  },
  status: {
    fontSize: 16,
    color: "grey",
  },
  time: {
    fontSize: 14,
    color: "grey",
  },
});
