import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.boldLetter}>Todo App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  boldLetter: {
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default Logo;
