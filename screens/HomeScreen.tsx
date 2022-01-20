import React, {useEffect} from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Logo from '../components/Logo';
import PageLayout from '../layouts/PageLayout';
import * as Moment from 'moment';
import {extendMoment} from 'moment-range';
import CustomButton from '../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';

const moment = extendMoment(Moment);

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  useEffect(() => {
    const fromDate = new Date(2022, 1, 1);
    const toDate = new Date(2022, 1, 10);
    const range = moment.range(fromDate, toDate);
    const diff = range.diff('days');
    for (let day of range.by('day')) {
      console.log(day.format('YYYY-MM-DD'));
    }
  }, []);
  return (
    <PageLayout>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Logo />
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>
              Manage your team &amp; everything with{' '}
              <Text style={styles.specialText}>TODO</Text>
            </Text>
          </View>
          <View style={styles.homeBanner}>
            <Image
              style={styles.bannerImage}
              source={require('../assets/images/home-banner.jpg')}
            />
          </View>
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Let's Start"
              onPress={() => navigation.navigate('Dashboard')}
            />
          </View>
        </View>
      </ScrollView>
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  scroll: {
    height: '100%',
    paddingHorizontal: Dimensions.get('window').width * 0.08,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    height: '100%',
  },
  headerContainer: {
    marginVertical: Dimensions.get('window').height * 0.02,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: Dimensions.get('window').width * 0.09,
    color: '#232838',
  },
  specialText: {
    color: '#E55E3C',
  },
  homeBanner: {
    marginVertical: Dimensions.get('window').height * 0.02,
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: Dimensions.get('window').height * 0.27,
    resizeMode: 'stretch',
    marginTop: Dimensions.get('window').height * 0.1,
  },
  buttonContainer: {
    width: '60%',
    alignSelf: 'center',
    marginTop: Dimensions.get('window').height * 0.1,
  },
});

export default HomeScreen;
