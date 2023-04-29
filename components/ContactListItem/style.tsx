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
username:{
    fontWeight:'bold',
    fontSize:16
},
status:{
    fontSize:16,
    color:'grey',

},
time:{
    fontSize:14,
    color:'grey'
}
});

export default styles