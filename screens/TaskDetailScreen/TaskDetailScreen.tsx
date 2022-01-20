import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import PageLayout from '../../layouts/PageLayout';
// @ts-ignore-next-line
import ProgressBar from 'react-native-progress/Bar';
import {COLORS} from '../../constants/colors';
import {StatusEnum} from '../../components/OngoingTasks/types';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {formatUnit} from '../../components/OngoingTasks/timeUtils';
import tasks, {Task, TaskModelInterface} from '../../models/task.model';
import moment from 'moment';

const Item = ({label, value, component: Component}: any) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.label}>{label}</Text>
      {Component ? Component : <Text style={styles.value}>{value}</Text>}
    </View>
  );
};

const TaskDetailScreen: React.FC = ({route}: any) => {
  const params = route.params;

  const navigation = useNavigation<any>();
  const [completed, setCompleted] = useState<boolean>(params?.completed);
  const [task, setTask] = useState<any>([]);

  const onCompleteChange = (newValue: boolean) => {
    tasks.updateTask(
      params.id,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      StatusEnum.DONE,
      undefined,
      true,
    );
    setCompleted(newValue);
  };

  useLayoutEffect(() => {
    navigation.setParams({color: params.categoryObject.color});
  }, [params.categoryObject.color]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const _tasks = tasks.getTask(params.id);
      setTask(_tasks);
    });
    return unsubscribe;
  }, [navigation]);

  const now = moment(new Date());
  const start = moment(task.timeStart);
  const end = moment(task.timeEnd);
  const lower = now.diff(start) > 0 ? now.diff(start) : 0;
  let progress = lower / end.diff(start);
  if (progress > 1) progress = 1;

  if (isNaN(progress)) progress = 0;

  return (
    <PageLayout>
      <View
        style={{
          ...styles.navHeader,
          backgroundColor: task.categoryObject?.color,
        }}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}>{task.title}</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TaskForm', {
              ...task,
              edit: true,
            })
          }
          style={styles.addTaskContainer}>
          <Text style={styles.addTaskText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        <Item label="Title" value={task.title} />
        <Item label="Category" value={task?.categoryObject?.title} />
        <Item label="Notes" value={task.notes} />
        <Item label="Date" value={task.date?.toDateString()} />
        <Item
          label="Time"
          value={`${formatUnit(
            task.timeStart?.getHours().toString(),
          )}:${formatUnit(
            task.timeEnd?.getMinutes().toString(),
          )} - ${formatUnit(task.timeEnd?.getHours().toString())}:${formatUnit(
            task.timeStart?.getMinutes().toString(),
          )}`}
        />
        <Item
          label="Progress"
          value={task.title}
          component={
            <View style={styles.progressContainer}>
              <ProgressBar progress={0} color={task.categoryObject?.color} />
            </View>
          }
        />
        <Item label="Status" value={StatusEnum.IN_PROGRESS} />
        <Item
          label="Completed"
          value={
            <View style={styles.completeContainer}>
              <CheckBox
                disabled={false}
                value={completed}
                onValueChange={onCompleteChange}
                onCheckColor={task.categoryObject?.color}
                onTintColor={task.categoryObject?.color}
              />
            </View>
          }
        />
      </ScrollView>
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Dimensions.get('window').height * 0.15,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    height: '100%',
  },
  header: {
    fontSize: 22,
    textAlign: 'left',
    marginVertical: Dimensions.get('window').height * 0.02,
    flex: 1,
    color: 'white',
  },
  navHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  backBtn: {
    marginRight: 10,
  },
  addTaskContainer: {
    alignSelf: 'center',
    marginRight: 5,
  },
  addTaskText: {
    color: '#fff',
    fontSize: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: Dimensions.get('window').height * 0.015,
  },
  label: {
    width: '25%',
    marginRight: 5,
    fontWeight: 'bold',
  },
  value: {
    flex: 1,
  },
  progressContainer: {
    marginTop: 5,
  },
  completeContainer: {},
});

export default TaskDetailScreen;
