import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import CalendarStrip from '../../components/calendar-strip/calendar-strip';
import Agenda from '../../components/agenda/agenda';
import commonStyles from '../common-styles';
import styles from './styles';

const CalendarScreen = ({ navigation }) => {
  const handleRegistrationBtnClick = (btnTitle) => {
    navigation.setOptions({ title: btnTitle });
    navigation.navigate(`Registration`);
  };

  return (
    <View style={commonStyles.page}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Entypo name="menu" size={30} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Календарь</Text>
      </View>
      <Agenda style={styles.agenda} />
      <View style={styles.calendarStripContainer}>
        <CalendarStrip style={styles.calendarStrip} />
      </View>
    </View>
  );
};

CalendarScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default CalendarScreen;
