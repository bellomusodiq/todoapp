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
import CustomInputText from '../../components/CustomInputText/CustomInputText';
import CustomSelectInput from '../../components/CustomSelectInput/CustomSelectInput';
import {COLORS} from '../../constants/colors';
import PageLayout from '../../layouts/PageLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import categories from '../../models/category.model';

const CategoryFormScreen: React.FC = ({route}: any) => {
  const params = route.params;

  const [title, setTitle] = useState<string>(params?.title || '');
  const [color, setColor] = useState<string>(params?.color || COLORS[0]);

  console.log(params);

  const navigation = useNavigation<any>();

  const submit = () => {
    if (!params) {
      categories.addCategory(title, color);
    } else {
      categories.updateCategory(params.id, title, color);
    }
    navigation.goBack();
  };
  return (
    <PageLayout>
      <ScrollView style={styles.container}>
        <View
          style={{
            ...styles.navHeader,
            backgroundColor: color ? color : 'white',
          }}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-left"
              size={22}
              color={color ? 'white' : 'black'}
            />
          </TouchableOpacity>
          <Text style={{...styles.header, color: color ? 'white' : 'black'}}>
            {params?.edit ? 'Edit Category' : 'Add New Category'}
          </Text>
        </View>
        <View style={styles.form}>
          <CustomInputText
            value={title}
            onChange={(value: string) => setTitle(value)}
            label="Title"
          />
          <CustomSelectInput
            value={color}
            onChange={value => setColor(value)}
            label="Choose color"
            options={COLORS}
            renderRow={(option: string) => (
              <View style={styles.selectRow}>
                <View
                  style={{
                    ...styles.selectRowColor,
                    backgroundColor: option,
                  }}></View>
                <Text style={styles.selectRowText}>{option}</Text>
              </View>
            )}
          />
          <View style={styles.buttonContainer}>
            <CustomButton title="Submit" onPress={submit} />
          </View>
        </View>
      </ScrollView>
    </PageLayout>
  );
};

export default CategoryFormScreen;

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
  },
  buttonContainer: {
    width: '100%',
    marginTop: Dimensions.get('window').height * 0.02,
  },
});
