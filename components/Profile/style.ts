import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles=StyleSheet.create({
avatar:{
    width:50,
    height:50,
    borderRadius:100,
    marginLeft:20,
    backgroundColor:Colors.light.background
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