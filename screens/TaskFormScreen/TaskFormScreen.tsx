import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import CustomButton from '../../components/CustomButton/CustomButton';
import CustomDatePicker from '../../components/CustomDatePicker/CustomDatePicker';
import CustomInputText from '../../components/CustomInputText/CustomInputText';
import CustomSelectInput from '../../components/CustomSelectInput/CustomSelectInput';
import PageLayout from '../../layouts/PageLayout';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import categories, {Category} from '../../models/category.model';
import tasks from '../../models/task.model';

const CATEGORY: any = ['Web App', 'Mobile App'];

const TaskFormScreen: React.FC = ({route}: any) => {
  const params = route.params;

  const [title, setTitle] = useState<string>(params?.title ?? '');
  const [category, setCategory] = useState<any>();
  const [notes, setNotes] = useState<string>(
    params?.notes ? params?.notes : '',
  );
  const [date, setDate] = useState<any>(
    params?.date ? new Date(params?.date) : new Date(),
  );
  const [timeStart, setTimeStart] = useState<any>(
    params?.timeStart ? new Date(params?.timeStart) : new Date(),
  );
  const [timeEnd, setTimeEnd] = useState<any>(
    params?.timeEnd ? params?.timeEnd : moment().add(1, 'hour').toDate(),
  );

  const navigation = useNavigation<any>();

  const submit = () => {
    if (!params) {
      tasks.addTask(category.id, title, notes, date, timeStart, timeEnd);
    } else {
      tasks.updateTask(
        params?.id,
        category.id,
        title,
        notes,
        date,
        timeStart,
        timeEnd,
      );
    }
    navigation.goBack();
  };
  return (
    <PageLayout>
      <ScrollView style={styles.container}>
        <View
          style={{
            ...styles.navHeader,
            backgroundColor: category?.color ? category.color : 'white',
          }}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              size={22}
              color={category?.color ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <Text
            style={{
              ...styles.header,
              color: category?.color ? 'white' : 'black',
            }}>
            {params?.edit ? 'Edit Task' : 'Add New Task'}
          </Text>
        </View>
        <View style={styles.form}>
          <CustomInputText
            value={title}
            onChange={(value: string) => setTitle(value)}
            label="Title"
          />
          <CustomSelectInput
            value={category}
            onChange={value => setCategory(value)}
            label="Choose category"
            options={categories.getCategories()}
            renderRow={(option: Category) => (
              <View style={styles.selectRow}>
                <View
                  style={{
                    ...styles.selectRowColor,
                    backgroundColor: option.color,
                  }}></View>
                <Text style={styles.selectRowText}>{option.title}</Text>
              </View>
            )}
          />
          <CustomInputText
            value={notes}
            onChange={(value: string) => setNotes(value)}
            label="Notes"
            multiline
          />
          <CustomDatePicker
            label="Select Date"
            value={date}
            mode="date"
            onChange={(value: any) => setDate(value)}
          />
          <View style={styles.timeContainer}>
            <View style={styles.time}>
              <CustomDatePicker
                value={timeStart}
                label="start time"
                mode="time"
                onChange={(value: any) => setTimeStart(value)}
              />
            </View>
            <View style={styles.time}>
              <CustomDatePicker
                value={timeEnd}
                label="end time"
                mode="time"
                onChange={(value: any) => setTimeEnd(value)}
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton title="Submit" onPress={submit} />
          </View>
        </View>
      </ScrollView>
    </PageLayout>
  );
};

export default TaskFormScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  header: {
    fontSize: 22,
    textAlign: 'left',
    marginVertical: Dimensions.get('window').height * 0.02,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    flex: 1,
  },
  navHeader: {
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    marginRight: 5,
  },
  form: {
    paddingHorizontal: Dimensions.get('window').width * 0.05,
  },
  selectRow: {
    flexDirection: 'row',
    padding: Dimensions.get('window').width * 0.02,
    alignItems: 'center',
  },
  selectRowColor: {
    width: 30,
    height: 16,
    marginRight: 5,
  },
  selectRowText: {
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    width: '100%',
    marginTop: Dimensions.get('window').height * 0.02,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    width: '45%',
  },
});
