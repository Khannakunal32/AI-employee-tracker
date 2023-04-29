import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import delayTimer from '.';

export const CDateTimePicker = (props) => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
 
    props.oncurrentDate(selectedDate)
 
   
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
     <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={false}
          display="spinner"
          onChange={onChange}
        />
      
    </View>
  );
};
