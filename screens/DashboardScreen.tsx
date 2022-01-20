import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet, Dimensions} from 'react-native';
import Categories from '../components/Categories/Categories';
import OngoingTasks from '../components/OngoingTasks/OngoingTasks';
import ProfileHeader from '../components/ProfileHeader/ProfileHeader';
import Search from '../components/Search/Search';
import PageLayout from '../layouts/PageLayout';
import categories, {CategoryModelInterface} from '../models/category.model';
import tasks, {Task, TaskModelInterface} from '../models/task.model';

const DashboardScreen: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [ongoingTasks, setOngoingTasks] = useState<Task[]>([]);
  const [taskList, setTaskList] = useState<TaskModelInterface>();
  const [categoryList, setCategoryList] = useState<CategoryModelInterface>();

  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const _tasks: Task[] = tasks.filter(undefined, false);
      setOngoingTasks(_tasks);
      setTaskList(tasks);
      setCategoryList(categories);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <PageLayout>
      <ScrollView style={styles.scroll}>
        <ProfileHeader name="Bello" />
        <Search onChange={(value: string) => setSearch(value)} value={search} />
        <Categories taskList={taskList} categoryList={categoryList} />
        <OngoingTasks ongoingTasks={ongoingTasks} />
      </ScrollView>
    </PageLayout>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  scroll: {
    height: '100%',
    paddingHorizontal: Dimensions.get('window').width * 0.08,
    backgroundColor: '#F6FAFB',
  },
});
