import moment from 'moment';
import React, {useState} from 'react';
import {
  View,
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {CustomDatePickerProps} from './types';

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  mode,
  onChange,
  value,
  label,
  minimumDate,
  maximumDate,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [_value, setValue] = useState<any>(value);
  const dateTimeChange = (date: any) => {
    onChange(date);
    setValue(_value);
    setVisible(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text style={styles.date}>
          {mode === 'date'
            ? moment(_value).format('YYYY-MM-DD')
            : moment(_value).format('HH:mm')}
        </Text>
      </TouchableOpacity>
      <DateTimePicker
        isVisible={visible}
        testID="dateTimePicker"
        mode={mode}
        is24Hour={true}
        onConfirm={dateTimeChange}
        style={styles.input}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        onCancel={() => setVisible(false)}
        textColor="black"
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
    textAlign: 'left',
    color: 'black',
  },
  input: {
    width: '100%',
    color: 'black',
  },
  date: {
    borderWidth: 1,
    borderRadius: Dimensions.get('window').width * 0.03,
    borderColor: '#ccc',
    fontSize: 16,
    padding: Dimensions.get('window').width * 0.02,
    color: 'black',
  },
});

export default CustomDatePicker;
