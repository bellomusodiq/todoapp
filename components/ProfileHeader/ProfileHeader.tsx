import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {ProfileHeaderProps} from './types';

const ProfileHeader: React.FC<ProfileHeaderProps> = ({name, noTask = 0}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.nameText}>Hi {name}</Text>
        <Text style={styles.taskText}>{noTask} task pending</Text>
      </View>
      <View style={styles.avatar}>
        <Image
          style={styles.image}
          source={require('../../assets/images/avatar.png')}
        />
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Dimensions.get('window').height * 0.05,
  },
  titleContainer: {
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  taskText: {
    color: '#E55E3C',
    fontSize: 16
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
