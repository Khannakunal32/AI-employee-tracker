import React from 'react'
import { View,Text,Image, FlatList } from 'react-native'
import soapLogo from '../assets/images/soapLogo.png'


import Colors from '../constants/Colors'

export default function SoapBox() {
    return (
        <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'center'}}>

{/* <Image source={thlogo} style={{width:'100%',height:'',backgroundColor:Colors.light.background,margin:50,marginLeft:100}} />
            <Image source={verologo} style={{width:'100%',height:69,backgroundColor:Colors.light.background,margin:50,marginLeft:100}} />
        
         */}
          {/* <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
<Image source={item.src} style={{width:180,height:320,alignSelf:'center'}} />
        
        )}
        inverted
        contentContainerStyle={{ flexDirection: "column-reverse" }}
      /> */}
      <Image source={soapLogo} style={{width:270,height:280,margin:10}} />
      {/* <Image source={verologo} style={{width:180,height:320,margin:10}} />
      <Image source={deallogo} style={{width:180,height:320,margin:10}} /> */}
                    </View>
    )
}




