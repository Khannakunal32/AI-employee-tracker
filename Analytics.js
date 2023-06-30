import React, { useEffect, useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { AreaChart, Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import { ScrollView } from 'react-native-gesture-handler';
import { PieChart } from 'react-native-svg-charts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const Analytics = () => {
  const attendanceDataArea = [
    {
      "date": "2023-06-30",
      "attendance": 85
    },
    {
      "date": "2023-06-29",
      "attendance": 90
    },
    {
      "date": "2023-06-28",
      "attendance": 80
    },
    {
      "date": "2023-06-27",
      "attendance": 90
    },
    {
      "date": "2023-06-26",
      "attendance": 80
    },
    
  ]
  const server_url = process.env.REACT_APP_URL||"https://api.pecunovus.net";
  const [user, setUser] = useState();
  const [attendenceData,setAttendenceData]=useState([])
  const contentInset = { top: 20, bottom: 20 };
 
  const AreaChartExample = ({ attendenceData }) => {
    console.log(attendenceData,"att")
    const xAxisLabels = [...attendenceData.map(e=>new Date(e.date).toLocaleDateString())]; // Add X-axis labels here
    return(
    
    <View style={{ height: 280, padding: 20 }}>
      <View style={{ flexDirection: 'row' }}>
        <YAxis
          data={attendenceData}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 10, fill: 'grey' }}
          numberOfTicks={5}
        />
        <LineChart
          style={{ flex: 1,height:200}}
          data={attendenceData}
          yAccessor={({ item }) => item.attendance}
          xAccessor={({ item }) => new Date(item.date)}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid />
        </LineChart>
      </View>
      <XAxis
        style={{ marginTop: 10 }}
        data={attendenceData}
        formatLabel={(value, index) => xAxisLabels[index]}
        contentInset={{ left: 20, right: 20 }}
        svg={{ fontSize: 10, fill: 'grey' }}
      />
    </View>
  )};
  const fetchChartsData = (user) => {

    axios.get(`${server_url}/BSA/getData?email=${user.email}`)
      .then((res) => {
        console.log(res.data,user.email)
      setAttendenceData(res.data)
    }).catch(err=>console.log(err))
  }
  const handleData= async() => {
    const userData = await AsyncStorage.getItem('user');
    console.log(userData)
    
      if (userData) {
        const userParsed = JSON.parse(userData);
        if (userParsed && userParsed.email) {
          setUser(userParsed);
        fetchChartsData(userParsed) 
        }
       
     }
  }
  useEffect(()=>{
    handleData()
  }
 ,[])

  const PieChartExample = ({attendenceData}) => {
    const Present =attendenceData.length
    console.log(Present)
    const data = [
      {
        key: 'Absent',
        value: 30-Present,
        svg: { fill: 'blue' },
      },
      {
        key: 'Present',
        value: Present,
        svg: { fill: 'green' },
      },
      {
        key: 'Holiday',
        value: 8,
        svg: { fill: 'orange' },
      },
    ];
  
    return (
      <View style={styles.bannerImage}>
        <PieChart
          style={{ height: 150 ,width:150}}
          data={data}
          innerRadius={0}
          outerRadius={'95%'}
        />
        <View style={{width:80}}> 
          <View style={{ backgroundColor: 'green', width: 100, borderRadius: 50, margin: 5 }}><Text style={{ color: 'white', textAlign: 'center' }}>{ Math.floor((Present/30 )*100)}% Present</Text></View>
        <View style={{backgroundColor:'orange',width:100,borderRadius:50,margin:5}}><Text style={{color:'white',textAlign:'center'}}>{ Math.floor(((30-Present)/30 )*100)}% Absent</Text></View>
        <View style={{backgroundColor:'blue',width:100,borderRadius:50,margin:5}}><Text style={{color:'white',textAlign:'center'}}>Holiday</Text></View>
       
       </View>
      </View>
    );
  };
  
  
  return (
    user&&user.email?
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', margin: 20 }}>Weekly Report</Text>
      <PieChartExample attendenceData={attendenceData} />
      <AreaChartExample attendenceData={attendanceDataArea} />
    
     
    </ScrollView>:<View><Text style={{ fontSize: 24, fontWeight: 'bold', margin: 20 }}>Not Logged in</Text></View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginTop: 20,
    borderRadius: 5,
    overflow: 'hidden',
  },  title: {
    fontSize: 20,
    fontWeight: 'bold',

    
    color:'tomato'
  },
  offersContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  offerContainer: {
    marginRight: 10,
    alignItems: 'center',
  },
  offerImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  offerTitle: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
  bannerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'tomato',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    
  },
});

export default Analytics;
