import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import CustomButton from '../CustomButton/CustomButton';
import {SearchProps} from './types';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search: React.FC<SearchProps> = ({value, onChange}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholderTextColor={'#ccc'}
          style={styles.input}
          placeholder="Search"
        />
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          onPress={() => {}}
          component={<Icon name="search" size={22} color="white" />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '78%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: 50,
  },
});

export default Search;
