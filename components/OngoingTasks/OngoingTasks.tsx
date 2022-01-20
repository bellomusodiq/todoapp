import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {OngoingTaskProps, StatusEnum} from './types';
import ProgressCircle from 'react-native-progress-circle';
import {formatUnit} from './timeUtils';
import {useNavigation} from '@react-navigation/native';
import tasks, {Task} from '../../models/task.model';
import moment from 'moment';

export const OngoingTask: React.FC<OngoingTaskProps> = ({
  title,
  timeStart,
  timeEnd,
  color,
  category,
  onPress,
  status = StatusEnum.IN_PROGRESS,
  progressPercent = 0,
}) => {
  let progress = progressPercent;
  if (status === StatusEnum.DONE) progress = 100;
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={{...styles.title, color: color}}>{title}</Text>
      <View style={styles.progressContainer}>
        <View style={styles.details}>
          <Text style={styles.category}>{category}</Text>
          <Text style={styles.date}>{timeStart?.toDateString()}</Text>
          <Text style={styles.date}>
            {`Time: ${formatUnit(
              timeStart?.getHours().toString(),
            )}:${formatUnit(timeEnd?.getMinutes().toString())} - ${formatUnit(
              timeEnd?.getHours().toString(),
            )}:${formatUnit(timeStart?.getMinutes().toString())}`}
          </Text>
        </View>
        <View style={styles.progress}>
          <ProgressCircle
            percent={progress}
            radius={30}
            borderWidth={4}
            color={color}
            shadowColor="#f1f1f1"
            bgColor="white">
            <Text style={{...styles.progressText, color: color}}>
              {progress}%
            </Text>
          </ProgressCircle>
          <Text
            style={{
              ...styles.progressType,
              color: status === StatusEnum.DONE ? '#4caf50' : '#ffc107',
            }}>
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const OngoingTasks: React.FC<any> = ({ongoingTasks}) => {
  const navigation = useNavigation<any>();


  return (
    <View style={styles.container}>
      <View style={styles.ongoingHeader}>
        <Text style={styles.ongoingText}>Ongoing Task</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TaskForm')}>
          <Text style={styles.seeAll}>Add New Task</Text>
        </TouchableOpacity>
      </View>
      {ongoingTasks.map((task: Task) => {
        const now = moment(new Date());
        const start = moment(task.timeStart);
        const end = moment(task.timeEnd);
        const lower = now.diff(start) > 0 ? now.diff(start) : 0;
        let progress = lower / end.diff(start);
        if (progress > 1) progress = 1;
        progress = progress * 100;
        progress = Math.floor(progress);

        return (
          <OngoingTask
            key={task.id}
            title={task.title}
            timeStart={task.timeStart}
            timeEnd={task.timeEnd}
            color={task.categoryObject?.color}
            category={task.categoryObject?.title || ''}
            status={task.status ? task.status : StatusEnum.IN_PROGRESS}
            onPress={() =>
              navigation.navigate('TaskDetail', {...task, progress})
            }
            progressPercent={progress}
          />
        );
      })}
    </View>
  );
};

export default OngoingTasks;

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('window').height * 0.02,
  },
  ongoingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ongoingText: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  seeAll: {
    color: '#E55E3C',
  },
  card: {
    marginVertical: Dimensions.get('window').height * 0.015,
    padding: Dimensions.get('window').width * 0.04,
    borderRadius: Dimensions.get('window').width * 0.04,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  progressType: {},
  details: {},
  category: {
    marginVertical: 2.5,
    color: 'gray',
  },
  date: {
    marginVertical: 2.5,
    color: 'gray',
  },
  progress: {
    alignItems: 'center',
  },
  progressText: {},
});
