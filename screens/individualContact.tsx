import * as React from "react";
import { StyleSheet, FlatList ,View,Text, TextInput,TouchableOpacity, Image, Button, TouchableWithoutFeedback, Alert} from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import ChatListItem from "../components/ChatListItem";

import InputBox from "../components/inputBox";
import NewContactButton from "../components/NewContactButton/index";
import ContactListItem from "../components/ContactListItem";
import users from "../data/Users";
import { useState } from "react";
import { useEffect } from "react";
import style from "../components/ContactListItem/style";
import axios from 'axios';
import Colors from "../constants/Colors";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
export default function individualContact(props) {
   
    console.log(props.route.params.id)
const [FormVisible, setFormVisible] = useState(false)
  const [users,setUsers]=useState([]);
  const [cname,setCname]=useState(props.route.params.name);
  const [email,setEmail]=useState('');
  const [cveroKey,setCveroKey]=useState(props.route.params.id);
  const [scveroKey,setSCveroKey]=useState('');
  const [scname,setSCname]=useState('');
  const navigation =useNavigation();
  const [showEdit,setShowEdit]=useState(false)
  const [showDelete,setshowDelete]=useState(false)
  const deleteHandler=()=>{
    const contactveroKey = global.privateKey
    {contactveroKey?
      
      axios
      .post("https://messangerapi533cdgf6c556.amaprods.com/api/contact/delete", {
        veroKey:contactveroKey,
        userveroKey:cveroKey,
        contactveroKey:cveroKey
      })
      .then((res) => {
     alert('Succesfylly deleted contact')
     setshowDelete(!showDelete)
      
        // this.fetchContactList()
      })
      .catch(function (error) {
        console.log(error)
        alert('Error in fetcing user')
      })
      :console.error('Please login first')}
    
  }
  const updateHandler=()=>{
    const contactveroKey = global.privateKey
    {contactveroKey?
      
      axios
      .post("http://192.168.29.82:4000/api/contact/update", {
        userveroKey:contactveroKey,
        contactveroKey: cveroKey,
        veroKey: contactveroKey,
        name:cname,
        profileImage: null,
        blocked: false,
        Relation: '',
        contactStatus: true,
        
      })
      .then((res) => {
     alert('Succesfylly updated contact')
     setShowEdit(!showEdit)
      
        // this.fetchContactList()
      })
      .catch(function (error) {
        console.log(error)
        alert('Error in fetcing user')
      })
      :console.error('Please login first')}
    
  }

const clickedAt=()=>{
    console.warn('clickedAt')
}
  const addContactHandlerviaEmail=(name,veroKey)=>{
    const contactveroKey = global.privateKey
    {contactveroKey&&name&&veroKey?
      
      axios
      .post(`https://messangerapi533cdgf6c556.amaprods.com/api/contact/add-contact`, {
        contactveroKey: veroKey,
        veroKey: contactveroKey,
        name:name,
        profileImage: null,
        blocked: false,
        Relation: '',
        contactStatus: true,
      })
      .then((res) => {
      console.info('Succesfylly added contact')
       setFormVisible(!FormVisible)
      
        // this.fetchContactList()
      })
      .catch(function (error) {
        console.log(error)
        alert('Error in fetcing user')
      })
      :console.error('user not exist')}
    
  }

//   useFocusEffect(
//     React.useCallback(() => {
//       const fetUsers=async ()=>{
//         try{
//            const userData= await axios.post('https://messangerapi533cdgf6c556.amaprods.com/api/contact/contact-list/',{
//              veroKey:global.privateKey,
//              name:global.name
//            })

//            const contactParse = JSON.parse(userData.data.data.contact)
//           //  contactParse.forEach((contact) => users.push(contact))
       
//            console.log(userData.data.data,users)
//           setUsers(contactParse)
          
//         global.contacts=userData.data.data.contact
//         console.log(global.contacts,"8686")
         
//         } catch (e){
//           console.log(e)
//         }
//       }
//       fetUsers();
//     }, [global.privateKey,FormVisible])
//   );

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
  //               global.contacts=userData.data.data.contact
  //               console.log(global.contacts,"8686")
                 
  //               } catch (e){
  //                 console.log(e)
  //               }
  //             }
  //             fetUsers();
  // },[])
  const addEmailHandler=()=>{
  
  
      
      axios
      .post(`https://messangerapi533cdgf6c556.amaprods.com/api/users/getUserByUsinternalr87v4v`, {
        email:email
      })
      .then((res) => {
      console.info(res.data.data.privateKey,res.data.data.firstName,res.data.data.lastName)
      //  setFormVisible(!FormVisible)
      setSCname(res.data.data.firstName+" "+res.data.data.lastName)
      setSCveroKey(res.data.data.privateKey)
        // this.fetchContactList()
        addContactHandlerviaEmail(res.data.data.firstName+" "+res.data.data.lastName,res.data.data.privateKey)
      })
    
      .catch(function (error) {
        console.log(error)
        alert('user not exist')
      })
    
    
  }
 
  return (
    <View style={{margin:10}}>

      <View style={style.leftContainer}>
        <Image source={{ uri: props.route.params.imageUri }} style={style.avatar} />
        <View style={style.midContainer}>
          <Text style={style.username}>{props.route.params.name}</Text>
          <Text style={style.status}>{props.route.params.id}</Text>
        </View>
      </View>
      <View style={{justifyContent:'space-evenly',alignItems:'center',flexWrap:'wrap',flexDirection:'row'}}>
      <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={()=>setShowEdit(!showEdit)}
        >
          <Text style={styles.buttonTextStyle}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={()=>setshowDelete(!showDelete)}
        >
          <Text style={styles.buttonTextStyle}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.buttonStyle}
          onPress={()=>{navigation.navigate('ChatRoom',{id:props.route.params.id,name:props.route.params.name,imageUri:props.route.params.imageUri})}}
        >
          <Text style={styles.buttonTextStyle}>Chat</Text>
        </TouchableOpacity>
   
      </View>
  {showEdit?<View style={{justifyContent:'center',alignItems:'center'}}>
   <TextInput
            placeholder="Enter Name"
            style={styles.textInput}
            value={cname}
            onChangeText={setCname}
             />
               <TextInput
            placeholder="Enter VeroKey"
            style={styles.textInput}
            value={cveroKey}
            onChangeText={setCveroKey}
             />
                  <TouchableOpacity
          activeOpacity={0.7}
        style={styles.buttonStyle}
          onPress={()=>updateHandler()}
        >
          <Text style={styles.buttonTextStyle} >Update</Text>
        </TouchableOpacity>
   </View>:null}
   {showDelete && !showEdit?<View   style={styles.button2Style}>
 <Text style={styles.buttonTextStyle}>Are you sure to delete this contact?</Text>
 <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
     <TouchableOpacity
          activeOpacity={0.7}
        style={styles.buttonStyle}
          onPress={()=>setshowDelete(!showDelete)}
        >
          <Text style={styles.buttonTextStyle} >Cancel</Text>
        </TouchableOpacity>
               
               <TouchableOpacity
          activeOpacity={0.7}
        style={styles.buttonStyle}
          onPress={()=>deleteHandler()}
        >
          <Text style={styles.buttonTextStyle} >Confirm</Text>
        </TouchableOpacity>
        </View>
        
   </View>:null}
   
    </View>
  

  );
}

const styles = StyleSheet.create({
  container: {
 flex:1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign:'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  buttonStyle: {
      width:100,
    justifyContent: 'center',
    marginTop: 15,
    padding:5,
    backgroundColor:Colors.light.tint,
    borderRadius:5,
    textAlign:'center'
  },
  button2Style: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor:"grey",
    width:'100%',
    height:100,
    borderRadius:5
  },
  buttonTextStyle: {
    color: Colors.light.background,
  
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    paddingHorizontal: 10,
    margin:10,
    padding:5
  },
});
