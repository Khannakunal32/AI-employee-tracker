import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView } from 'react-native';
import CameraApp from './camera';
import axios from 'axios'
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Set user value in localStorage
const setUserInLocalStorage = async (user) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
    console.log('User value set in localStorage');
  } catch (error) {
    console.log('Error setting user value in localStorage:', error);
  }
};



export default function AttendancePage() {

  const [faceDataStore, setFaceDataStore] = useState([])
  const [registerFaceView, setRegisterFaceView] = useState(false);
  const [sound, setSound] = useState();
  const [sounderr, setSounderr] =useState();
  const [connection, setConnection] = useState(false)
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false)
  const [authenticated, setAuthenticated] = useState(false);
  const [showLoginform, setShowLoginform] = useState(true);
  const [email,setEmail]=useState("")
  const [password, setPassword] = useState("")
  const [firstName, setfirstName] = useState("")
  const [lastName, setlastName] = useState("");
  const [enrollId, setenrollId] = useState("")
  const [user, setUser] = useState(null);
  const [faceDetectedCam, setFaceDetacted] = useState(false);
  const server_url = process.env.REACT_APP_URL||"https://api.pecunovus.net";
  const handlleSumbit = (() => {
    if (faceDetectedCam) {
      let fdata = (faceDataStore[faceDataStore.length - 1][0])
     
      const body = { attendence: true, email: user.email, faceUser:fdata  }
      console.log(body)
      setLoading(true);
      axios.post(`${server_url}/BSA/attendance`,body )
        .then((res) => {
          if (res.data.status) {
            setSuccess(true);
            setLoading(false);
  
          } else {
            throw new Error(res.data.message)
          }
          
        }).catch(err => {
          
          setLoading(false);
          alert(err||"Error | Could not mark attendence")
      })
    } else {
      alert('Could not validate without face')
    }
  
   
   
  })
  const registerFaceHandler = () => {
    if (faceDetectedCam) {
      let fdata = (faceDataStore[faceDataStore.length - 1][0])
      console.log(JSON.stringify(fdata));
      const body = { email: user.email, faceUser:fdata  }
      console.log(body)
      setLoading(true);
      axios.post(`${server_url}/BSA/registerFace`,body )
        .then((res) => {
          if (res.data.status) {
            setSuccess(true);
            setLoading(false);
  
          } else {
            throw new Error(res.data.message)
          }
          
        }).catch(err => {
          
          setLoading(false);
          alert(err||"Error | Could not register")
      })
    } else {
      alert('Could not validate without face')
    }
  }
  const injectModel = () => {
     
    axios.post(`/BSA/fetchModelml`, { attendence: true, email: user.email })
    .then((res) => {
      if (res.status) {
      console.log(res.data)
    }
    }).catch(err => {
      
      setLoading(false);
      alert("Error | Could not connect")
  })
  }
  const handleExit = () => {
    setUser([]); setAuthenticated(false); setSuccess(false);
          setShowLoginform(true)
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
  }
  async function playSound(src) {
   
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require(`./assets/beep.mp3`)
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }
  async function playSoundError() {
   
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync( require('./assets/error.mp3')
    );
    setSounderr(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  const loginHandler = () => {
    if (email === "admin" && password == 123456) {
      setAuthenticated(true);
    

    } else {
      axios.post(`${server_url}/BSA/login`, {
        email: email,
        password:password

    })
      .then(async(res) => {
        if (res.status&&res.data) {
         console.log(res.data)
          const {data}=res||{}
            const { message, loggedIn } = data || {}
            
          setUser(data);
          try {
            const sdata= JSON.stringify(res.data)
            await AsyncStorage.setItem('user', sdata);
            
            console.log('User value set in localStorage',sdata);
          } catch (error) {
            console.log('Error setting user value in localStorage:', error);
          }
          
        
        
            if (!res.data.isFaceAvailable) {
              
                alert('Your face is not registered,Please ask your admin to add your data.');

          } else {
            alert(message);
            }
            setRegisterFaceView(!res.data.isFaceAvailable);
            setAuthenticated(loggedIn);
      }
    }).catch(err=>console.log(err))
    }
   
  
  }
  const signupHandler = () => {
    
      axios.post(`${server_url}/BSA/signup`, {
        email, firstName, lastName, enrollId, password

    })
      .then(res => {
        if (res.status&&res.data) {
         console.log(res.data)
          const {data}=res||{}
          const { message, user } = data || {}
         
         
          
          alert(message);
          if (user) {
            setUser(user);  setAuthenticated(true);
         }

        
      }
    }).catch(err=>console.log(err))
    
   
  
  }

  const handelStoreFace = (data) => {
    setFaceDataStore(prev=>[...prev,data])
  }

 
  useEffect(() => {
    if (authenticated) {
        if (faceDetectedCam) {
    playSound()
    } else {
     playSoundError() 
    }
 
    }
  }, [faceDetectedCam])
  
  useEffect(async() => {
    const userdata = await AsyncStorage.getItem('user');
      console.log(userdata)
      if (userdata) {
        const fata = await JSON.parse(userdata);
        setUser(fata);
        setAuthenticated(true)
      }
  },[])

  if (!authenticated) {
   
    return <View style={styles.container}>

      <StatusBar style="auto" backgroundColor='tomato' />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <View style={{ margin: 50 }}><Text style={{ color: 'tomato', fontWeight: 'bold', fontSize: 19 }}>BPIT SMART ATTENDENCE</Text>
          <Text style={{ color: 'blue', fontWeight: '700', fontSize: 12 }}>Powered by A.I.</Text>
        </View>
        <Image source={require('./assets/login.jpeg')} style={{ width: 150, height: 150 }} />
        {showLoginform ? <><TextInput value={email} onChangeText={setEmail} name="email" keyboardType='email-address' style={styles.input} placeholder='email' />
          <TextInput onChangeText={setPassword} style={styles.input} secureTextEntry placeholder='password' />
          <TouchableOpacity style={{ width: '80%', padding: 1, margin: 10 }} onPress={() => setShowLoginform(false)}>

            <Text style={{ color: 'blue', fontWeight: '500', fontSize: 14, textAlign: 'left' }}>Don't have account?, Register Now</Text></TouchableOpacity>
        </> : <>
            <TextInput onChangeText={setEmail} keyboardType='email-address' style={styles.input} placeholder='email' />
            <TextInput onChangeText={setenrollId} secureTextEntry={false} style={styles.input} placeholder='Enrollment id' />
          <TextInput onChangeText={setfirstName} style={styles.input} placeholder='firstName' />
          <TextInput onChangeText={setlastName}  style={styles.input} placeholder='lastName' />
          <TextInput onChangeText={setPassword} style={styles.input} secureTextEntry placeholder='password' />

          <TouchableOpacity style={{ width: '80%', padding: 1, margin: 10 }} onPress={() => { setShowLoginform(true) }}>
            <Text style={{ color: 'blue', fontWeight: '500', fontSize: 14, textAlign: 'left' }}>Already have account?, Login Now</Text></TouchableOpacity>

        </>}
        {showLoginform ? <TouchableOpacity onPress={loginHandler} style={{ backgroundColor: 'tomato', width: '80%', padding: 10, borderRadius: 30, shadowColor: 'grey', shadowOpacity: 0.7, margin: 15 }}>

          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 19, textAlign: 'center' }}>Login Now</Text></TouchableOpacity>

          : <TouchableOpacity style={{ backgroundColor: 'tomato', width: '80%', padding: 10, borderRadius: 30, shadowColor: 'grey', shadowOpacity: 0.7, margin: 15 }} onPress={()=>signupHandler()}>

            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 19, textAlign: 'center' }}>Register Now</Text></TouchableOpacity>

        }
      </KeyboardAvoidingView>
    </View>
  }

  return (
    <View style={styles.container}>
      {!success && <View style={{ margin: 50 }}><Text style={{ color: 'tomato', fontWeight: 'bold', fontSize: 19 }}>BPIT SMART ATTENDENCE</Text>
        <Text style={{ color: 'blue', fontWeight: '700', fontSize: 12 }}>Powered by A.I.</Text>
      </View>}
      <StatusBar style="auto" backgroundColor='tomato' />
      {success ?<View style={styles.carboxSuccess}><View style={{ margin: 50 }}>
        <Image style={{ width: 100, height: 100 }} source={{ uri: "https://freerangestock.com/sample/78768/laptop-and-tick-shows-online-success.jpg" }} />
        <Text style={{ color: 'tomato', fontWeight: 'bold', fontSize: 19 }}>BPIT SMART ATTENDENCE</Text>
        <Text style={{ color: 'blue', fontWeight: '700', fontSize: 12 }}>Powered by A.I.</Text>
      </View>
        <Text style={{ color: 'green', fontWeight: 'bold', fontSize: 16, textAlign: 'center', padding: 10 }}>Attendence marked successfully</Text><TouchableOpacity
          onPress={() => { handleExit()}}>
          <View style={styles.submit}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 19 }}>Mark Exit</Text></View></TouchableOpacity>
      </View> :<View>
        <View style={styles.carbox}><CameraApp registerFaceView={registerFaceView} faceDetectedCamEvent={(e) => { handelStoreFace(e.data); setFaceDetacted(e.available) }} user={user} loading={loading} success={success} /></View>
        {registerFaceView?<TouchableOpacity onPress={() => {registerFaceView?registerFaceHandler(): handlleSumbit() }}><View style={styles.submit}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 19 }}>Register Face</Text></View></TouchableOpacity>:<TouchableOpacity onPress={() => { handlleSumbit() }}><View style={styles.submit}><Text style={{ color: 'white', fontWeight: 'bold', fontSize: 19 }}>Mark Attendence</Text></View></TouchableOpacity>}
      </View>}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',



  }, input: {
    width: '80%',
    padding: 10,
    fontSize: 18,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 6,
    margin: 10,

  },

  carbox: {
    minWidth: 300,
    minHeight: '60%',
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOpacity: .8
  },
  carboxSuccess: {
    minWidth: 300,
    minHeight: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: 'grey',
    shadowOpacity: .8,
    justifyContent: 'center'
  },
  submit: {
    padding: 10,
    backgroundColor: 'tomato',
    margin: 20,
    borderRadius: 8,
    width: 200,
    alignItems: 'center',
    shadowColor: 'grey',
    shadowOpacity: .8,
    alignSelf: 'center'
  }
});
