import * as React from "react";
import { StyleSheet,AppState, FlatList,View,Text,AsyncStorage, TextInput, ActivityIndicator, TouchableOpacity, Button} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import ChatListItem from "../components/ChatListItem";
import axios from 'axios';
import ChatRooms from "../data/ChatRooms";
import InputBox from "../components/inputBox";
import NewMessageButton from "../components/NewMessageButton";
import { useState ,useRef} from "react";
import { useEffect } from "react";
import * as SecureStore from 'expo-secure-store';
import { useFocusEffect } from '@react-navigation/native';
import filter from 'lodash.filter';
import Searchbar from "../components/searchBar/Searchbar";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/core";
import socket, { startSocket } from '../socket';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import ChatMessage from "../components/chatMessage";
import{sendPushNotification} from '../notifications'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function ChatScreen() {
  const [users,setUsers]=useState([]);
  const [myToken,setMyToken]=useState({});
  const [user,setUser]=useState()
  const [query, setQuery] = useState('');
const [fullData, setFullData] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState([]);
const [error, setError] = useState(null);
const[chatMessage,setChatMessage]=useState()
const [expoPushToken, setExpoPushToken] = useState('');
const [notification, setNotification] = useState(false);
const notificationListener = useRef();
const responseListener = useRef();
  const fetUsers=async (name,privateKey)=>{
   
    console.log(myToken,name)
    try{
       const userData= await axios.post('https://messangerapi533cdgf6c556.amaprods.com/api/contact/contact-list/',{
         veroKey:privateKey,
         name:name
       })

       const contactParse = JSON.parse(userData.data.data.contact)
      //  contactParse.forEach((contact) => users.push(contact))
   
       console.log(userData.data.data,users)
      setUsers(contactParse)
      setData(contactParse)
      setFullData(contactParse)
    // global.contacts=userData.data.data
    // console.log(global.contacts)
     
    } catch (e){
      console.log(e)
    }
  }



  const navigation =useNavigation();
  const handleGetToken = async (key) => {
  
    const tokenFromPersistentState = await SecureStore.getItemAsync(
     key,
    );
    if (tokenFromPersistentState) {
      let data = JSON.parse(tokenFromPersistentState)
      console.log(data.firstName)
      let name=data.firstName+" "+data.lastName
      let privateKey= data.privateKey
     setMyToken(data)
     global.privateKey=privateKey;
     global.name=name;
     global.imageUri=data.ProfilePic
     setUser({name:name,id:privateKey})
     fetUsers(name,privateKey);
     
    }
  };

  useFocusEffect(
   React.useCallback(() => {
      handleGetToken('userAuthToken')
    
  
      // initSocketConnection()
     
    }, [])
  );
  // const setupSocketListeners=()=> {
  //   socket.on('message',onMessageRecieved)
  //   socket.on('reconnect', onReconnection)
  //   socket.on('disconnect', onClientDisconnected)
  //   }
  
  //   const handleSetChat = async (key,value) => {
  //     var MChatMessage=[]
     
  //     const tokenFromPersistentStatem = await SecureStore.getItemAsync(
  //       key,
  //      );
  //      if (tokenFromPersistentStatem) {
  //        console.log(tokenFromPersistentStatem)
  //       let mydatam = JSON.parse(tokenFromPersistentStatem)
        
       
  //       console.log(mydatam)
       
      
  //      (mydatam? MChatMessage.push(mydatam): console.log('no sky'))


  //     let chat=MChatMessage;
  //     chat.push(value)
  //     let data = JSON.stringify(chat)
  //     console.log(data,"sky this is me")
  //     SecureStore.setItemAsync(key, data).then;
  //    console.log(data)
  //   };
  // }
   const onReconnection=()=> {
    console.log('Connection Established.', 'Reconnected!')
    }
  
 

  // const onMessageRecieved=(message)=> {
  //     let messageData = message
  //     let targetId
    
  //    //  setMChatMessage(old=>[...old,messageData])
  
  //    if(message.to==global.id){
    
   
  //       if (message.from ===global.id) {
  //       messageData.position = 'right'
  //       targetId = message.to
        
  //      // setMChatMessage(old=>[...old,messageData])
  //     } else {
  //       messageData.position = 'left'
  //       targetId = message.from
  //       // handleSetChat(message.from,messageData)
  //       setChatMessage(messageData)
  //     //  console.warn(AppState.currentState)
  //      if(AppState.currentState!=="active"){
  //        sendPushNotification(messageData)


  //      }
        
  //     }
        
       
  //      }


  
  //    //  let targetIndex = userChatData.findIndex((u) => u.veroKey === targetId)
  //    // // alert(targetIndex)
  //    //  if (!userChatData[targetIndex].messages) {
  //    //    userChatData[targetIndex].messages = []
  //    //  }
  //    //  if (targetIndex !== selectedUserIndex) {
  //    //    if (!userChatData[targetIndex].unread) {
  //    //      userChatData[targetIndex].unread = 0
  //    //    }
  //    //    userChatData[targetIndex].unread++
  //    //  }
  //    //  userChatData[targetIndex].messages.push(messageData)
 
  
  //   }
  
   const onClientDisconnected=()=> {
     console.log(
        'Connection Lost from server please check your connection.',
        'Error!'
      )
    //  socket.connect()
      
    }
  
  //  const initSocketConnection=()=> {
  
  
  //   // startSocket()
  //     setupSocketListeners()
  //   }


  // useEffect(()=>{
  //             const fetUsers=async ()=>{
  //               try{
  //                  const userData= await axios.post('https://messangerapi533cdgf6c556.amaprods.com/api/contact/contact-list/',{
  //                    veroKey:global.privateKey,
  //                    name:global.name
  //                  })

  //                  const contactParse = JSON.parse(userData.data.data.contact)
  //                 //  contactParse.forEach((contact) => users.push(contact))
               
  //                  console.log(userData.data.data,users)
  //                 setUsers(contactParse)
  //               global.contacts=userData.data.data
  //               console.log(global.contacts)
                 
  //               } catch (e){
  //                 console.log(e)
  //               }
  //             }
  //             fetUsers();
              
  // },[navigation])
  // useEffect(() => {
  //   registerForPushNotificationsAsync().then(token => {setExpoPushToken(token);global.tokennotification=token});

  //   // This listener is fired whenever a notification is received while the app is foregrounded
  //   notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
  //     setNotification(notification);
  //   });

  //   // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
  //     console.log(response);
  //   });

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current);
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  const handleSearch = text => {
    const formattedQuery = text.toLowerCase();
    const filteredData = filter(fullData, user => {
      return contains(user, formattedQuery);
    });
    setUsers(filteredData);
    setQuery(text);
  };
  const contains = (user, query) => {
     const { name, veroKey } = user;
  
    if (name.includes(query) || veroKey.includes(query)) {
      return true;
    }
  
    return false;
  };
  
  function renderHeader() {

    

    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
        
        value={query}
        onChangeText={queryText => handleSearch(queryText)}
        
          placeholder="Search"
          style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18}}>
          Error fetching data... Check your network connection!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
       {myToken.privateKey? <FlatList ListHeaderComponent={renderHeader} style={{width:'100%'}}
        data={users}
        renderItem={({ item }) => <ChatListItem socket={socket} chatRoom={item}  />}
        keyExtractor={(item)=>item.veroKey}
     />:<View style={{backgroundColor:Colors.light.tint,padding:10,borderRadius:10}}><TouchableOpacity onPress={()=>{  navigation.navigate('SignIn')}}>
       <Text style={{color:Colors.light.background}}>Please Login To Continue</Text>
       </TouchableOpacity></View>}
       {/* <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }}
      /> */}
     {/* <NewMessageButton /> */}
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

// async function sendPushNotification(data) {
//  console.warn('teting notify expo token',global.tokennotification)
//   const message = {
//     to: global.tokennotification,
//     sound: 'default',
//     title: `Message from ${data.userName}`,
//     body: data.message.text,
//     data: { someData: 'goes here' },
//   };

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
      
//     });
//   }

//   return token;
// }