import { Feather, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
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
  Linking,
  Image
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import Colors from "../constants/Colors";


const Register = () => {
  const [data, setData] = React.useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    check_textInputChangeFn: false,
    check_textInputChangeLn: false,
    check_textInputChangeE: false,
    check_textInputChangeUn: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });
  
  const navigation = useNavigation();
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

//   var CheckTextInputIsEmptyOrNot = () =>{
 
//     const { TextInputName }  = this.state ;
//     const { TextInputEmail }  = this.state ;
//     const { TextInputPhoneNumber }  = this.state ;
    
//    if(TextInputName == '' || TextInputEmail == '' || TextInputPhoneNumber == '')
//    {
//      Alert.alert("Please Enter All the Values.");

//    }
//    else{

//    Alert.alert("All Text Input is Filled.");
    
//    }

   var verifyForm = () => {
    if (data.first_name == '' || data.last_name == '' || data.email == '' || data.username == '' || data.password == '' || data.confirm_password == '' || data.password !== data.confirm_password ) {
        alert("Please Fill all details");
    } else{
        alert("success");
    }

   }
   const [event, setEvent] = React.useState("");
   function handleChange(evt) {

    const value = evt.target;
  
    // setEvent({

    //   [evt.target.name]: value

    // });
    console.log(evt.target.Name);
  
  }

  
// function isValidEmail(email) {
// 	var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// 	return !!email && typeof email === 'string'
// 		&& email.match(emailformat)};
       

const  isValidEmail = (text) => {
            console.log(text);
            let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
            if (reg.test(text) === false) {
              console.log("Email is Not Correct");
              this.setState({ email: text })
              return false;
            }
            else {
              this.setState({ email: text })
              console.log("Email is Correct");
            }
          }


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.light.tint} barStyle="light-content" />

      <View style={styles.header}>
      <Image
              style={{ width: 200, height: 100,alignSelf:'center' }}
              source={require("../assets/images/logo.png")}
            ></Image>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>First Name</Text>
          <View style={styles.action}>
            <TextInput
              
              placeholder="Your Firstname"
              style={styles.textInput}
              autoCapitalize="none"
              onChange={handleChange}
              
              onChangeText={(val) => textInputChange(val, 'first_name', 'check_textInputChangeFn')}
            />
             {data.check_textInputChangeFn ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={18} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Aadhar Number
          </Text>
          <View style={styles.action}>
           
            <TextInput
              placeholder="Your Aadhar Number"
              style={styles.textInput}
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(val) => textInputChange(val, 'last_name','check_textInputChangeLn')}
            />
            {data.check_textInputChangeLn ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={18} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Last Name
          </Text>
          <View style={styles.action}>
           
            <TextInput
              placeholder="Your Lastname"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val, 'last_name','check_textInputChangeLn')}
            />
            {data.check_textInputChangeLn ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={18} />
              </Animatable.View>
            ) : null}
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Username
          </Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={15} />
            <TextInput
              placeholder="Your Username"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val, 'username', 'check_textInputChangeUn')}
            />
            {data.check_textInputChangeUn ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={18} />
              </Animatable.View>
            ) : null}
          </View>
          
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Email
          </Text>
          <View style={styles.action}>
            <TextInput
              placeholder="Your Email"
              textContentType="emailAddress"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val, 'email','check_textInputChangeE')}

            //   onBlur={ val => this.isValidEmail(val) }
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
              onChangeText={(val) => handlePasswordChange(val)
              }
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            Confirm Password
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#05375a" size={15} />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={18} />
              ) : (
                <Feather name="eye" color="grey" size={18} />
              )}
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signUp} onPress={() => {}}>
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
                Sign Up
              </Text>
              {/* </LinearGradient> */}
            </TouchableOpacity>

            <TouchableOpacity
            //   onPress={() => navigation.goBack()}
              onPress={() => verifyForm()}
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
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
              onPress={() => {
                navigation.navigate("CameraScreen");
              }}
              
              >
              <Text style={{ 
                // backgroundColor: Colors.light.tint,
                color: Colors.light.tint,
                margin: 10}}>
              Register your FaceID
              </Text>
            </TouchableOpacity>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              Already Registered? 
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]} 
            //  onPress={() => Linking.openURL('http://google.com')}>{" "}
            // onPress={()=>{  navigation.navigate('SignIn') 
            onPress={()=>{  navigation.navigate('SignIn') 
          }}
           
            >{" "}
          Sign In
            </Text>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default Register;

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
});
