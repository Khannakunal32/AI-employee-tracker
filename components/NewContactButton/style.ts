import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container:{
backgroundColor:Colors.light.tint,
borderRadius:25,
padding:10,
width:50,
height:50,
justifyContent:'center',
alignItems:'center',
position:'absolute',
bottom:20,
right:20
    },
})

export default styles