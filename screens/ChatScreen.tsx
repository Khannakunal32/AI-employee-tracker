// import * as React from "react";
// import {
//   StyleSheet,
//   AppState,
//   FlatList,
//   View,
//   Text,
//   AsyncStorage,
//   TextInput,
//   ActivityIndicator,
//   TouchableOpacity,
//   Button,
// } from "react-native";

// import EditScreenInfo from "../components/EditScreenInfo";
// import ChatListItem from "../components/ChatListItem";
// import axios from "axios";
// import ChatRooms from "../data/ChatRooms";
// import InputBox from "../components/inputBox";
// import NewMessageButton from "../components/NewMessageButton";
// import { useState, useRef } from "react";
// import { useEffect } from "react";
// import * as SecureStore from "expo-secure-store";
// import { useFocusEffect } from "@react-navigation/native";
// import filter from "lodash.filter";
// import Searchbar from "../components/searchBar/Searchbar";
// import Colors from "../constants/Colors";
// import { useNavigation } from "@react-navigation/core";
// import socket, { startSocket } from "../socket";
// import Constants from "expo-constants";
// import * as Notifications from "expo-notifications";
// import ChatMessage from "../components/chatMessage";
// import { sendPushNotification } from "../notifications";
// import CameraScreen from "../CameraScreen";

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: false,
//   }),
// });

// export default function ChatScreen() {
//   const [users, setUsers] = useState([]);
//   const [myToken, setMyToken] = useState({});
//   const [user, setUser] = useState();
//   const [query, setQuery] = useState("");
//   const [fullData, setFullData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [chatMessage, setChatMessage] = useState();
//   const [expoPushToken, setExpoPushToken] = useState("");
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();
//   const fetUsers = async (name, privateKey) => {
//     console.log(myToken, name);
//     try {
//       const userData = await axios.post(
//         "https://messangerapi533cdgf6c556.amaprods.com/api/contact/contact-list/",
//         {
//           veroKey: privateKey,
//           name: name,
//         }
//       );

//       const contactParse = JSON.parse(userData.data.data.contact);
//       //  contactParse.forEach((contact) => users.push(contact))

//       console.log(userData.data.data, users);
//       setUsers(contactParse);
//       setData(contactParse);
//       setFullData(contactParse);
//       // global.contacts=userData.data.data
//       // console.log(global.contacts)
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const navigation = useNavigation();
//   const handleGetToken = async (key) => {
//     const tokenFromPersistentState = await SecureStore.getItemAsync(key);
//     if (tokenFromPersistentState) {
//       let data = JSON.parse(tokenFromPersistentState);
//       console.log(data.firstName);
//       let name = data.firstName + " " + data.lastName;
//       let privateKey = data.privateKey;
//       setMyToken(data);
//       global.privateKey = privateKey;
//       global.name = name;
//       global.imageUri = data.ProfilePic;
//       setUser({ name: name, id: privateKey });
//       fetUsers(name, privateKey);
//     }
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       handleGetToken("userAuthToken");

//       // initSocketConnection()
//     }, [])
//   );
//   // const setupSocketListeners=()=> {
//   //   socket.on('message',onMessageRecieved)
//   //   socket.on('reconnect', onReconnection)
//   //   socket.on('disconnect', onClientDisconnected)
//   //   }

//   //   const handleSetChat = async (key,value) => {
//   //     var MChatMessage=[]

//   //     const tokenFromPersistentStatem = await SecureStore.getItemAsync(
//   //       key,
//   //      );
//   //      if (tokenFromPersistentStatem) {
//   //        console.log(tokenFromPersistentStatem)
//   //       let mydatam = JSON.parse(tokenFromPersistentStatem)

//   //       console.log(mydatam)

//   //      (mydatam? MChatMessage.push(mydatam): console.log('no sky'))

//   //     let chat=MChatMessage;
//   //     chat.push(value)
//   //     let data = JSON.stringify(chat)
//   //     console.log(data,"sky this is me")
//   //     SecureStore.setItemAsync(key, data).then;
//   //    console.log(data)
//   //   };
//   // }
//   const onReconnection = () => {
//     console.log("Connection Established.", "Reconnected!");
//   };

//   // const onMessageRecieved=(message)=> {
//   //     let messageData = message
//   //     let targetId

//   //    //  setMChatMessage(old=>[...old,messageData])

//   //    if(message.to==global.id){

//   //       if (message.from ===global.id) {
//   //       messageData.position = 'right'
//   //       targetId = message.to

//   //      // setMChatMessage(old=>[...old,messageData])
//   //     } else {
//   //       messageData.position = 'left'
//   //       targetId = message.from
//   //       // handleSetChat(message.from,messageData)
//   //       setChatMessage(messageData)
//   //     //  console.warn(AppState.currentState)
//   //      if(AppState.currentState!=="active"){
//   //        sendPushNotification(messageData)

//   //      }

//   //     }

//   //      }

//   //    //  let targetIndex = userChatData.findIndex((u) => u.veroKey === targetId)
//   //    // // alert(targetIndex)
//   //    //  if (!userChatData[targetIndex].messages) {
//   //    //    userChatData[targetIndex].messages = []
//   //    //  }
//   //    //  if (targetIndex !== selectedUserIndex) {
//   //    //    if (!userChatData[targetIndex].unread) {
//   //    //      userChatData[targetIndex].unread = 0
//   //    //    }
//   //    //    userChatData[targetIndex].unread++
//   //    //  }
//   //    //  userChatData[targetIndex].messages.push(messageData)

//   //   }

//   const onClientDisconnected = () => {
//     console.log(
//       "Connection Lost from server please check your connection.",
//       "Error!"
//     );
//     //  socket.connect()
//   };

  
//   const handleSearch = (text) => {
//     const formattedQuery = text.toLowerCase();
//     const filteredData = filter(fullData, (user) => {
//       return contains(user, formattedQuery);
//     });
//     setUsers(filteredData);
//     setQuery(text);
//   };
//   const contains = (user, query) => {
//     const { name, veroKey } = user;

//     if (name.includes(query) || veroKey.includes(query)) {
//       return true;
//     }

//     return false;
//   };

//   function renderHeader() {
//     return (
//       <View
//           style={{
//             backgroundColor: Colors.light.background,
//             padding: 10,
//             borderRadius: 10,
//           }}
//         >
//             <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate("CameraScreen");
//               }}
              
//               >
//               <Text style={{ 
//                 // backgroundColor: Colors.light.tint,
//                 color: Colors.light.tint,
//                 margin: 10}}>
//               Register your FaceID
//               </Text>
//             </TouchableOpacity>
                
//             <View
//   style={{
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.light.tint,
//     width: "100%",
//   }}

  
// />

// <TouchableOpacity
//               onPress={() => {
//                 navigation.navigate("CameraScreenMissingChild");
//               }}
              
//               >
//               <Text style={{ 
//                 // backgroundColor: Colors.light.tint,
//                 color: Colors.light.tint,
//                 margin: 10}}>
//               Scan a missing Child
//               </Text>
//             </TouchableOpacity>
                
//             <View
//   style={{
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.light.tint,
//     width: "100%",
//   }}

  
// />




//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate("Attendence");
//             }}
            
//           >
//             <Text style={{ 
//               // backgroundColor: Colors.light.tint,
//               color: Colors.light.tint ,
//               margin: 10}}>
//                 Detect Face
//             </Text>
//           </TouchableOpacity>
//         </View>
//       // <View
//       //   style={{
//       //     backgroundColor: "#fff",
//       //     padding: 10,
//       //     marginVertical: 10,
//       //     borderRadius: 20,
//       //   }}
//       // >
//       //   <TextInput
//       //     autoCapitalize="none"
//       //     autoCorrect={false}
//       //     clearButtonMode="always"
//       //     value={query}
//       //     onChangeText={(queryText) => handleSearch(queryText)
          
//       //     }
//       //     placeholder="Mark Attendence"
//       //     style={{ backgroundColor: "#fff", paddingHorizontal: 20 }}
//       //   />

//       //   <TouchableOpacity
//       //       onPress={() => {
//       //         navigation.navigate("faceDeteScreenMain");
//       //       }}
//       //     >
//       //       <Text style={{ color: Colors.light.background }}>
//       //         Please Login To Continue
//       //       </Text>
//       //     </TouchableOpacity>
//       // </View>
//     );
//   }

//   if (isLoading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#5500dc" />
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <Text style={{ fontSize: 18 }}>
//           Error fetching data... Check your network connection!
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       {myToken.privateKey ? (
//         <FlatList
//           ListHeaderComponent={renderHeader}
//           style={{ width: "100%" }}
//           data={users}
//           // renderItem={({ item }) => (
//           //   <ChatListItem socket={socket} chatRoom={item} />
//           // )}
//           keyExtractor={(item) => item.veroKey}
//         />
//       ) : (
//         <View
//           style={{
//             backgroundColor: Colors.light.tint,
//             padding: 10,
//             borderRadius: 10,
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate("SignIn");
//             }}
//           >
//             <Text style={{ color: Colors.light.background }}>
//               Please Login To Continue
//             </Text>
//           </TouchableOpacity>
//         </View>
//       )}
//       {/* <Button
//         title="Press to Send Notification"
//         onPress={async () => {
//           await sendPushNotification(expoPushToken);
//         }}
//       /> */}
//       {/* <NewMessageButton /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: "80%",
//   },
// });

import * as React from "react";
import {
  StyleSheet,
  AppState,
  FlatList,
  View,
  Text,
  AsyncStorage,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Button,
} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import ChatListItem from "../components/ChatListItem";
import axios from "axios";
import ChatRooms from "../data/ChatRooms";
import InputBox from "../components/inputBox";
import NewMessageButton from "../components/NewMessageButton";
import * as SecureStore from "expo-secure-store";
import { useFocusEffect } from "@react-navigation/native";
import filter from "lodash.filter";
import Searchbar from "../components/searchBar/Searchbar";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/core";
import socket, { startSocket } from "../socket";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import ChatMessage from "../components/chatMessage";
import { sendPushNotification } from "../notifications";
import CameraScreen from "../CameraScreen";

import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
} from "react-native";
// import io from "socket.io-client";
import CameraApp from "./Camera";
// import Camera from "./camera.";
// import socket, { startSocket } from "./socketUrl";
import { Audio } from "expo-av";
import { ScrollView } from "react-native-gesture-handler";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function ChatScreen() {
  const [faceDataStore, setFaceDataStore] = useState([]);
  const [registerFaceView, setRegisterFaceView] = useState(false);
  const [sound, setSound] = useState();
  const [sounderr, setSounderr] = useState();
  const [connection, setConnection] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [showLoginform, setShowLoginform] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [enrollId, setenrollId] = useState("");
  const [user, setUser] = useState(null);
  const [faceDetectedCam, setFaceDetacted] = useState(false);
  const server_url = process.env.REACT_APP_URL || "https://api.pecunovus.net";
  const handlleSumbit = () => {
    if (faceDetectedCam) {
      let fdata = faceDataStore[faceDataStore.length - 1][0];
      console.log(JSON.stringify(fdata));
      const body = { attendence: true, email: user.email, faceUser: fdata };
      console.log(body);
      setLoading(true);
      axios
        .post(`${server_url}/BSA/attendance`, body)
        .then((res) => {
          if (res.data.status) {
            setSuccess(true);
            setLoading(false);
          } else {
            throw new Error(res.data.message);
          }
        })
        .catch((err) => {
          setLoading(false);
          alert(err || "Error | Could not mark attendence");
        });
    } else {
      alert("Could not validate without face");
    }
  };
  const registerFaceHandler = () => {
    if (faceDetectedCam) {
      let fdata = faceDataStore[faceDataStore.length - 1][0];
      console.log(JSON.stringify(fdata));
      const body = { email: user.email, faceUser: fdata };
      console.log(body);
      setLoading(true);
      axios
        .post(`${server_url}/BSA/registerFace`, body)
        .then((res) => {
          if (res.data.status) {
            setSuccess(true);
            setLoading(false);
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
  const injectModel = () => {
    axios
      .post(`/BSA/fetchModelml`, { attendence: true, email: user.email })
      .then((res) => {
        if (res.status) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        alert("Error | Could not connect");
      });
  };
  const handleExit = () => {
    setUser([]);
    setAuthenticated(false);
    setSuccess(false);
    setShowLoginform(true);
    //   axios.post(`${server_url}/BSA/attendance`, { attendence: false, email: user.email })
    //   .then((res) => {
    //     if (res.status) {
    //       setUser([]); setAuthenticated(false); setSuccess(false);
    //         setShowLoginform(true)
    //   }
    //   }).catch(err => {

    //     setLoading(false);
    //     alert("Error | Could not mark attendence")
    // })
  };
  async function playSound(src) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require(`./assetsTwo/beep.mp3`)
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  async function playSoundError() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assetsTwo/error.mp3")
    );
    setSounderr(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  const loginHandler = () => {
    if (email === "admin" && password == 123456) {
      setAuthenticated(true);
    } else {
      axios
        .post(`${server_url}/BSA/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.status && res.data) {
            console.log(res.data);
            const { data } = res || {};
            const { message, loggedIn } = data || {};
            setUser(data);

            setAuthenticated(loggedIn);
            if (!res.data.isFaceAvailable) {
              setRegisterFaceView(true);
              alert(
                "Your face is not registered,Please ask your admin to add your data."
              );
            } else {
              alert(message);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const signupHandler = () => {
    axios
      .post(`${server_url}/BSA/signup`, {
        email,
        firstName,
        lastName,
        enrollId,
        password,
      })
      .then((res) => {
        if (res.status && res.data) {
          console.log(res.data);
          const { data } = res || {};
          const { message, user } = data || {};

          alert(message);
          if (user) {
            setUser(user);
            setAuthenticated(true);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  const handelStoreFace = (data) => {
    setFaceDataStore((prev) => [...prev, data]);
  };

  useEffect(() => {
    if (authenticated) {
      if (faceDetectedCam) {
        playSound();
      } else {
        playSoundError();
      }
    }
  }, [faceDetectedCam]);

  if (!authenticated) {
    return (
      <ScrollView>
      <View style={styles.container}>
        <StatusBar style="auto" backgroundColor="pink" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View style={{ margin: 50 }}>
            <Text style={{ color: "pink", fontWeight: "bold", fontSize: 19 }}>
              BPIT SMART ATTENDENCE
            </Text>
            <Text style={{ color: "blue", fontWeight: "700", fontSize: 12 }}>
              Powered by A.I.
            </Text>
          </View>
          <Image
            source={require("./assetsTwo/login.jpeg")}
            style={{ width: 300, height: 300 }}
          />
          {showLoginform ? (
            <>
              <TextInput
                value={email}
                onChangeText={setEmail}
                name="email"
                keyboardType="email-address"
                style={styles.input}
                placeholder="email"
              />
              <TextInput
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                placeholder="password"
              />
              <TouchableOpacity
                style={{ width: "80%", padding: 1, margin: 10 }}
                onPress={() => setShowLoginform(false)}
              >
                <Text
                  style={{
                    color: "blue",
                    fontWeight: "500",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  Don't have account?, Register Now
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
                placeholder="email"
              />
              <TextInput
                onChangeText={setenrollId}
                secureTextEntry={false}
                style={styles.input}
                placeholder="Enrollment id"
              />
              <TextInput
                onChangeText={setfirstName}
                style={styles.input}
                placeholder="firstName"
              />
              <TextInput
                onChangeText={setlastName}
                style={styles.input}
                placeholder="lastName"
              />
              <TextInput
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
                placeholder="password"
              />

              <TouchableOpacity
                style={{ width: "80%", padding: 1, margin: 10 }}
                onPress={() => {
                  setShowLoginform(true);
                }}
              >
                <Text
                  style={{
                    color: "blue",
                    fontWeight: "500",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  Already have account?, Login Now
                </Text>
              </TouchableOpacity>
            </>
          )}
          {showLoginform ? (
            <TouchableOpacity
              onPress={loginHandler}
              style={{
                backgroundColor: "pink",
                width: "80%",
                padding: 10,
                borderRadius: 30,
                shadowColor: "grey",
                shadowOpacity: 0.7,
                margin: 15,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 19,
                  textAlign: "center",
                }}
              >
                Login Now
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "pink",
                width: "80%",
                padding: 10,
                borderRadius: 30,
                shadowColor: "grey",
                shadowOpacity: 0.7,
                margin: 15,
              }}
              onPress={() => signupHandler()}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 19,
                  textAlign: "center",
                }}
              >
                Register Now
              </Text>
            </TouchableOpacity>
          )}
        </KeyboardAvoidingView>
      </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      {!success && (
        <View style={{ margin: 50 }}>
          <Text style={{ color: "pink", fontWeight: "bold", fontSize: 19 }}>
            BPIT SMART ATTENDENCE
          </Text>
          <Text style={{ color: "blue", fontWeight: "700", fontSize: 12 }}>
            Powered by A.I.
          </Text>
        </View>
      )}
      <StatusBar style="auto" backgroundColor="pink" />
      {success ? (
        <View style={styles.carboxSuccess}>
          <View style={{ margin: 50 }}>
            <Image
              style={{ width: 100, height: 100 }}
              source={{
                uri: "https://freerangestock.com/sample/78768/laptop-and-tick-shows-online-success.jpg",
              }}
            />
            <Text style={{ color: "pink", fontWeight: "bold", fontSize: 19 }}>
              BPIT SMART ATTENDENCE
            </Text>
            <Text style={{ color: "blue", fontWeight: "700", fontSize: 12 }}>
              Powered by A.I.
            </Text>
          </View>
          <Text
            style={{
              color: "green",
              fontWeight: "bold",
              fontSize: 16,
              textAlign: "center",
              padding: 10,
            }}
          >
            Attendence marked successfully
          </Text>
          <TouchableOpacity
            onPress={() => {
              handleExit();
            }}
          >
            <View style={styles.submit}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 19 }}
              >
                Mark Exit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <View style={styles.carbox}>
            <CameraApp
              registerFaceView={registerFaceView}
              faceDetectedCamEvent={(e) => {
                handelStoreFace(e.data);
                setFaceDetacted(e.available);
              }}
              user={user}
              loading={loading}
              success={success}
            />
          </View>
          {registerFaceView ? (
            <TouchableOpacity
              onPress={() => {
                registerFaceView ? registerFaceHandler() : handlleSumbit();
              }}
            >
              <View style={styles.submit}>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 19 }}
                >
                  Register Face
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                handlleSumbit();
              }}
            >
              <View style={styles.submit}>
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 19 }}
                >
                  Mark Attendence
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
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
  input: {
    width: "80%",
    padding: 10,
    fontSize: 18,
    borderWidth: 0.5,
    borderColor: "grey",
    borderRadius: 6,
    margin: 10,
  },

  carbox: {
    minWidth: 300,
    minHeight: "60%",
    backgroundColor: "whitesmoke",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOpacity: 0.8,
  },
  carboxSuccess: {
    minWidth: 300,
    minHeight: 400,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "grey",
    shadowOpacity: 0.8,
    justifyContent: "center",
  },
  submit: {
    padding: 10,
    backgroundColor: "pink",
    margin: 20,
    borderRadius: 8,
    width: 200,
    alignItems: "center",
    shadowColor: "grey",
    shadowOpacity: 0.8,
    alignSelf: "center",
  },
});


