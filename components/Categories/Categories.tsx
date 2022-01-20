import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import {CategoryDataType} from './types';
// @ts-ignore-next-line
import ProgressBar from 'react-native-progress/Bar';
import categories, {CategoryModelInterface} from '../../models/category.model';
import tasks, {TaskModelInterface} from '../../models/task.model';

const Categories: React.FC<any> = ({taskList, categoryList}) => {
  const navigation = useNavigation<any>();

  const categoryRender = ({item}: any) => {
    const progressInfo: any = taskList?.getCategoryInfo(item.id);

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('TaskList', {categoryId: item.id})}
        style={{...styles.categoryCard, backgroundColor: item.color}}>
        <Text style={styles.categoryTitle}>{item.title}</Text>
        <Text style={styles.categoryTask}>{progressInfo.count} Tasks</Text>
        <ProgressBar progress={progressInfo.percentage} color="white" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Categories</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CategoryForm')}>
          <Text style={styles.buttonText}>Add Category</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{padding: 10}}
        data={categoryList?.getCategories() || []}
        horizontal={true}
        renderItem={categoryRender}
      />
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('window').height * 0.03,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  categoryCard: {
    backgroundColor: 'white',
    marginRight: 10,
    padding: Dimensions.get('window').width * 0.05,
    borderRadius: 10,
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  categoryTask: {
    fontSize: 13,
    color: 'white',
    marginVertical: 10,
  },
  buttonText: {
    color: '#E55E3C',
  },
});
