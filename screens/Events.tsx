import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import thlogo from "../assets/images/thlogo.png";
import verologo from "../assets/images/verologo.png";
import deallogo from "../assets/images/deallogo.png";
import { useRoute } from "@react-navigation/core";
import Colors from "../constants/Colors";
import CwebView from "./webView";
const images = [{ src: verologo }, { src: thlogo }, { src: deallogo }];

export default function Events() {
  const route = useRoute();
  const [url, seturl] = useState("");
  const [isRoomId, setIsRoomId] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      // getToken()
      setIsRoomId(false);
      seturl('')
    }, [])
  );

  return (
    //         <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>

    // {/* <Image source={thlogo} style={{width:'100%',height:'',backgroundColor:Colors.light.background,margin:50,marginLeft:100}} />
    //             <Image source={verologo} style={{width:'100%',height:69,backgroundColor:Colors.light.background,margin:50,marginLeft:100}} />

    //          */}
    //           {/* <FlatList
    //         data={images}
    //         keyExtractor={(item, index) => index.toString()}
    //         renderItem={({ item }) => (
    // <Image source={item.src} style={{width:180,height:320,alignSelf:'center'}} />

    //         )}
    //         inverted
    //         contentContainerStyle={{ flexDirection: "column-reverse" }}
    //       /> */}
    //       <Image source={thlogo} style={{width:180,height:320,margin:10}} />
    //       <Image source={verologo} style={{width:180,height:320,margin:10}} />
    //       <Image source={deallogo} style={{width:180,height:320,margin:10}} />
    //                     </View>

    isRoomId ? (
      <CwebView
        // webLink={`https://www.verotownhall.com/21AEF56E76A866F1161468CEBF5B23A9CE43F5E6319D050E498E77C02FDDD7BDcbvhjdferut4545347nvfrjhrt43734/#${url}`}
        // webLink={`https://www.bractus.com`}
      />
    ) : (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
          <Image source={thlogo} style={{width:"100%",height:320,margin:10}} />
        <TextInput
          style={{ margin: 10,width:"100%",textAlign:'center'}}
          placeholder="Enter RoomId"
          value={url}
          keyboardType="number-pad"
          onChangeText={seturl}
        />
        <TouchableOpacity onPress={() => setIsRoomId(true)}>
          <Text
            style={{
              backgroundColor: Colors.light.tint,
              color: "white",
              padding: 5,
              borderRadius: 5,
            }}
          >
            Join Meeting
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
}
