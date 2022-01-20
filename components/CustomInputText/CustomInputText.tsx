import React from 'react';
import {View, Text, TextInput, Dimensions, StyleSheet} from 'react-native';
import {CustomInputTextProps} from './types';

const CustomInputText: React.FC<CustomInputTextProps> = ({
  value,
  onChange,
  label,
  multiline,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(value: string) => onChange(value)}
        placeholder={label}
        multiline={multiline}
        numberOfLines={multiline ? 5 : 1}
        placeholderTextColor={'gray'}
        textAlignVertical="top"
      />
    </View>
  );
};

export default CustomInputText;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    marginBottom: 3,
    fontSize: 16,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    color: 'black',
    fontSize: 16,
    justifyContent: 'flex-start',
    padding: Dimensions.get('window').width * 0.03,
    borderRadius: Dimensions.get('window').width * 0.02,
  },
});
