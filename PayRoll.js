import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
};
LocaleConfig.defaultLocale = 'en';

const Payroll = () => {
    const [totalLeaves, setTotalLeaves] = useState(20);
    const [leavesTaken, setLeavesTaken] = useState(5);
    const [currentEarnings, setCurrentEarnings] = useState(40000);
    const [balanceLeave, setBalanceLeave] = useState(totalLeaves - leavesTaken);

    const handleLeaveTaken = (num) => {
        setLeavesTaken(leavesTaken + num);
        setBalanceLeave(totalLeaves - leavesTaken - num);
    };

    const holidayDates = {
        '2022-05-12': { selected: true, marked: true },
        '2022-05-15': { selected: true, marked: true },
        '2022-05-19': { selected: true, marked: true },
        '2022-05-20': { selected: true, marked: true },
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>PayRoll Dashboard</Text>
            <View style={styles.statsContainer}>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>{`${totalLeaves}`}</Text>
                    <Text style={styles.statLabel}>Total Leaves</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>{`${leavesTaken}`}</Text>
                    <Text style={styles.statLabel}>Leaves Taken</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>{`$${currentEarnings}`}</Text>
                    <Text style={styles.statLabel}>Current Earnings</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>{`${balanceLeave}`}</Text>
                    <Text style={styles.statLabel}>Balance Leave</Text>
                </View>
            </View>
            <View style={styles.calendarContainer}>
                <Calendar
                   
                    markedDates={{
                        '2023-05-15': { selected: true, marked: true, selectedColor: 'blue' },
                        '2023-05-16': { selected: true, marked: true, selectedColor: 'blue' },
                        '2023-05-17': { selected: true, marked: true, selectedColor: 'blue' },
                        '2023-05-20': { marked: true, dotColor: 'red' },
                        '2023-05-25': { marked: true, dotColor: 'red' },
                        '2023-05-30': { marked: true, dotColor: 'red' },
                    }}
                    markingType="period"
                    style={styles.calendar}
                />
                {/* {selectedDate !== '' && (
                    <View style={styles.detailsContainer}>
                        <Text style={styles.date}>{selectedDate}</Text>
                        <View style={styles.details}>
                            <View style={styles.detail}>
                                <Text style={styles.detailLabel}>Leave Balance</Text>
                                <Text style={styles.detailValue}>12</Text>
                            </View>
                            <View style={styles.detail}>
                                <Text style={styles.detailLabel}>Current Earnings</Text>
                                <Text style={styles.detailValue}>$1000</Text>
                            </View>
                            <View style={styles.detail}>
                                <Text style={styles.detailLabel}>Holiday</Text>
                                <Text style={styles.detailValue}>Memorial Day</Text>
                            </View>
                        </View>
                    </View>
                )} */}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
        backgroundColor: '#fff',
      padding:20,
      paddingTop:80
    },
    heading:{fontSize:24,fontWeight:'bold',marginBottom:30,color:'grey'},
    statsContainer: {
        flexDirection: 'row',
        flexWrap:'wrap',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
        marginBottom: 16,
    
    },
    stat: {
        alignItems: 'center',
        margin:10
    },
    statValue: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    statLabel: {
      fontSize: 16,
      color: '#666',
    },
    calendarContainer: {
      flex: 1,
      padding: 16,
    },
    calendar: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      height: 350,
    },
    detailsContainer: {
      backgroundColor: '#f5f5f5',
      borderRadius: 8,
      padding: 16,
      marginTop: 16,
    },
    date: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    details: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    detail: {
      alignItems: 'center',
    },
    detailLabel: {
      fontSize: 16,
      color: '#666',
      marginBottom: 8,
    },
    detailValue: {
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  
export default Payroll
