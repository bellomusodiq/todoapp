import React, {useState} from 'react';
import {View, Button, Platform, StyleSheet, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {CustomDatePickerProps} from './types';

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  mode,
  onChange,
  value,
  label,
  minimumDate,
  maximumDate,
}) => {
  const dateTimeChange = (_: any, selectedDate: any) => {
    onChange(selectedDate);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <DateTimePicker
        testID="dateTimePicker"
        value={value}
        mode={mode}
        is24Hour={true}
        display="default"
        onChange={dateTimeChange}
        style={styles.input}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 3,
    textAlign: 'right',
  },
  input: {
    width: '100%',
  },
});

export default CustomDatePicker;
