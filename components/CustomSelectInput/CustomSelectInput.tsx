import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
// @ts-ignore-next-line
import ModalDropdown from 'react-native-modal-dropdown';
import {CustomSelectInputProps} from './types';

const CustomSelectInput: React.FC<CustomSelectInputProps> = ({
  label,
  value,
  onChange,
  options,
  renderRow,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.selectContainer}>
        <ModalDropdown
          textStyle={{fontSize: 18, color: 'black'}}
          dropdownStyle={{width: '80%', color: 'boack'}}
          options={options}
          dropdownTextStyle={{fontSize: 16, color: 'black'}}
          defaultValue={value}
          onSelect={(index: number) => onChange(options[index])}
          renderRow={renderRow}
          renderButtonText={renderRow}
        />
      </View>
    </View>
  );
};

export default CustomSelectInput;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    marginBottom: 3,
    fontSize: 16,
    color: 'black',
  },
  selectContainer: {
    borderWidth: 1,
    padding: Dimensions.get('window').width * 0.01,
    borderColor: '#ccc',
    borderRadius: Dimensions.get('window').width * 0.02,
  },
});
