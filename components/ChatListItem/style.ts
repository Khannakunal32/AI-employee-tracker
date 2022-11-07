import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles=StyleSheet.create({
avatar:{
    width:60,
    height:60,
    marginRight:15,
    borderRadius:50,
    backgroundColor:Colors.light.tint
},
textLabel:{fontSize:30,
    width:60,
    textAlign:'center',
    height:60,
    marginRight:15,
    borderRadius:50,
    backgroundColor:Colors.light.tint},
container:{
    flexDirection:'row',
   width:"100%",
   justifyContent:'space-between',
   padding:10,
},
leftContainer:{
    flexDirection:'row'
},
midContainer:{
   justifyContent:'space-around'
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
username:{
    fontWeight:'bold',
    fontSize:16
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
lastMessage:{
    fontSize:16,
    color:'grey',
    maxWidth:200

},
buttonTextStyle: {
    color: Colors.light.background,
  
    textAlign: 'center',
  },
time:{
    fontSize:14,
    color:'grey'
}
});

export default styles