import * as React from 'react';
import {View, Text} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackHeaderProps,
} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TaskListScreen from '../screens/TaskListScreen/TaskListScreen';
import CategoryFormScreen from '../screens/CategoryFormScreen/CategoryFormScreen';
import TaskFormScreen from '../screens/TaskFormScreen/TaskFormScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen/TaskDetailScreen';

const Stack = createNativeStackNavigator();

function MainNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          header: (props: NativeStackHeaderProps) => null,
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          header: (props: NativeStackHeaderProps) => null,
        }}
        name="Dashboard"
        component={DashboardScreen}
      />
      <Stack.Screen
        options={{
          header: (props: NativeStackHeaderProps) => null,
        }}
        name="TaskList"
        component={TaskListScreen}
      />
      <Stack.Screen
        options={{
          header: (props: NativeStackHeaderProps) => null,
        }}
        name="CategoryForm"
        component={CategoryFormScreen}
      />
      <Stack.Screen
        options={{
          header: (props: NativeStackHeaderProps) => null,
        }}
        name="TaskForm"
        component={TaskFormScreen}
      />
      <Stack.Screen
        options={{
          header: (props: NativeStackHeaderProps) => null,
        }}
        name="TaskDetail"
        component={TaskDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default MainNavigation;
