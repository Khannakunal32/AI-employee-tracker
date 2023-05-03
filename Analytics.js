import React from 'react';
import { View, Text } from 'react-native';
import { AreaChart, Grid, LineChart, XAxis, YAxis } from 'react-native-svg-charts';
import { PieChart } from 'react-native-pie';
import { ScrollView } from 'react-native-gesture-handler';

const Analytics = () => {
  const attendanceData = [
    { date: '2022-01-01', value: 12 },
    { date: '2022-01-02', value: 16 },
    { date: '2022-01-03', value: 20 },
    { date: '2022-01-04', value: 14 },
    { date: '2022-01-05', value: 18 },
    { date: '2022-01-06', value: 22 },
    { date: '2022-01-07', value: 26 },
    // Add more data here
  ];

  const contentInset = { top: 20, bottom: 20 };
  const xAxisLabels = ['Mon', 'Tue', 'Wed', 'Thru', 'Fri', 'Sat', 'Sun']; // Add X-axis labels here
  const AreaChartExample = () => (
    <View style={{ height: 280, padding: 20 }}>
      <View style={{ flexDirection: 'row' }}>
        <YAxis
          data={attendanceData}
          contentInset={{ top: 20, bottom: 20 }}
          svg={{ fontSize: 10, fill: 'grey' }}
          numberOfTicks={5}
        />
        <LineChart
          style={{ flex: 1,height:200}}
          data={attendanceData}
          yAccessor={({ item }) => item.value}
          xAccessor={({ item }) => new Date(item.date)}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 20, bottom: 20 }}
        >
          <Grid />
        </LineChart>
      </View>
      <XAxis
        style={{ marginTop: 10 }}
        data={attendanceData}
        formatLabel={(value, index) => xAxisLabels[index]}
        contentInset={{ left: 20, right: 20 }}
        svg={{ fontSize: 10, fill: 'grey' }}
      />
    </View>
  );


  const data = [
    { value: 10, color: '#F44336' },
    { value: 20, color: '#2196F3' },
    { value: 30, color: '#4CAF50' },
  ];

  
  
  return (
    <ScrollView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 14, fontWeight: 'bold', margin: 20 }}>Weekly Report</Text>
      <AreaChartExample />
      <Text style={{ fontSize: 14, fontWeight: 'bold', margin: 20 }}>Monthly Attendance</Text>
      <AreaChartExample />
      <Text style={{ fontSize: 14, fontWeight: 'bold', margin: 20 }}>Daily Attendance</Text>
      <AreaChartExample />
    </ScrollView>
  );
};

export default Analytics;
