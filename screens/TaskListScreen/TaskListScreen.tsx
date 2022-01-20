import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useMemo, useState} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {COLORS} from '../../constants/colors';
import PageLayout from '../../layouts/PageLayout';
import {OngoingTask} from '../../components/OngoingTasks/OngoingTasks';
import {StatusEnum} from '../../components/OngoingTasks/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import tasks from '../../models/task.model';
import moment from 'moment';
import categories, {CategoryModelInterface} from '../../models/category.model';

const DATA: any = [
  {
    title: 'Wallet App Design',
    timeStart: new Date(2022, 1, 18, 12, 0, 0),
    timeEnd: new Date(2022, 1, 18, 13, 0, 0),
    color: COLORS[0],
    category: 'Mobile App',
    status: StatusEnum.DONE,
  },
  {
    title: 'Wallet App Design',
    timeStart: new Date(2022, 1, 18, 12, 0, 0),
    timeEnd: new Date(2022, 1, 18, 13, 0, 0),
    color: COLORS[0],
    category: 'Mobile App',
    status: StatusEnum.DONE,
  },
  {
    title: 'Wallet App Design',
    timeStart: new Date(2022, 1, 18, 12, 0, 0),
    timeEnd: new Date(2022, 1, 18, 13, 0, 0),
    color: COLORS[0],
    category: 'Mobile App',
    status: StatusEnum.DONE,
  },
  {
    title: 'Wallet App Design',
    timeStart: new Date(2022, 1, 18, 12, 0, 0),
    timeEnd: new Date(2022, 1, 18, 13, 0, 0),
    color: COLORS[0],
    category: 'Mobile App',
    status: StatusEnum.IN_PROGRESS,
  },
  {
    title: 'Wallet App Design',
    timeStart: new Date(2022, 1, 18, 12, 0, 0),
    timeEnd: new Date(2022, 1, 18, 13, 0, 0),
    color: COLORS[0],
    category: 'Mobile App',
    status: StatusEnum.IN_PROGRESS,
  },
  {
    title: 'Wallet App Design',
    timeStart: new Date(2022, 1, 18, 12, 0, 0),
    timeEnd: new Date(2022, 1, 18, 13, 0, 0),
    color: COLORS[0],
    category: 'Mobile App',
    status: StatusEnum.IN_PROGRESS,
  },
];

const TaskListScreen: React.FC<any> = ({route}) => {
  const params = route.params;
  const intialCategory = categories.getCategoryById(params.id);
  const [category, setCategory] = useState<any>(intialCategory);

  const taskList = React.useMemo(() => {
    return tasks.getTasks(params.categoryId);
  }, [tasks, params.categoryId]);

  const navigation = useNavigation<any>();

  const renderTasks = ({item: task}: any) => {
    const now = moment(new Date(2022, 1, 20, 14, 30, 0));
    const start = moment(task.timeStart);
    const end = moment(task.timeEnd);
    const lower = now.diff(start) > 0 ? now.diff(start) : 0;
    let progress = lower / end.diff(start);
    if (progress > 1) progress = 1;
    progress = progress * 100;
    progress = Math.floor(progress);

    return (
      <OngoingTask
        title={task.title}
        timeStart={task.timeStart}
        timeEnd={task.timeEnd}
        color={task.categoryObject?.color}
        category={task.categoryObject?.title || ''}
        status={task.status ? task.status : StatusEnum.IN_PROGRESS}
        onPress={() => navigation.navigate('TaskDetail', {...task, progress})}
        progressPercent={progress}
      />
    );
  };

  useLayoutEffect(() => {
    navigation.setParams({color: category?.color, title: category?.title});
  }, [params.categoryId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const cat = categories.getCategoryById(params.categoryId);
      setCategory(cat);
    });
    return unsubscribe;
  }, [navigation]);

  console.log(category);

  return (
    <PageLayout>
      <View style={styles.container}>
        <View
          style={{
            ...styles.navHeader,
            backgroundColor: category?.color,
          }}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={22} color="white" />
          </TouchableOpacity>
          <Text style={styles.header}>{category?.title}</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('TaskForm')}
            style={styles.addTaskContainer}>
            <Icon name="plus" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CategoryForm', {
                ...category,
                edit: true,
              })
            }
            style={styles.addTaskContainer}>
            <Text style={styles.addTaskText}>Edit</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.list}
          data={taskList}
          renderItem={renderTasks}
        />
      </View>
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Dimensions.get('window').height * 0.15,
  },
  header: {
    fontSize: 22,
    textAlign: 'left',
    marginVertical: Dimensions.get('window').height * 0.02,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    flex: 1,
    color: 'white',
  },
  list: {
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  navHeader: {
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: 5,
  },
  addTaskContainer: {
    alignSelf: 'center',
    marginRight: 15,
  },
  addTaskText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TaskListScreen;
