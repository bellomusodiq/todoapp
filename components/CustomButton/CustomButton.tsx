import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {CustomButtonProps} from './types';

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  component,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {component ? component : <Text style={styles.text}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: '#E55E3C',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    shadowColor: '#FDD5D1',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 1,
    elevation: 5,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
