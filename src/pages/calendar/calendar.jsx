import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import CalendarStrip from 'react-native-calendar-strip';
import Agenda from '../../components/agenda/agenda';
import commonStyles from '../common-styles';
import styles from './styles';
import moment from "moment";
import { Color } from "../../constants/colors";
import { getActiveDate } from "../../store/reducers/app-state/selectors";
import { changeActiveDate } from "../../store/action";

const getActiveDates = (activeDate) => {
  return [{
    startDate: moment(),
    dateContainerStyle: [styles.dateContainerStyle, { borderColor: Color.PRIMARY }],
  }, {
    startDate: moment(activeDate),
    dateContainerStyle: [styles.dateContainerStyle, { borderColor: Color.ORANGE }],
  }];
};

const CalendarScreen = ({ navigation, activeDate, handleDayClick }) => {
  return (
    <View style={commonStyles.page}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Entypo name="menu" size={30}/>
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Расписание</Text>
      </View>
      <Agenda style={styles.agenda}/>
      <View style={styles.calendarStripContainer}>
        <CalendarStrip
          scrollable
          style={{ height: 200, paddingTop: 20, paddingBottom: 10 }}
          calendarColor={Color.BACKGROUND_BLUE}
          iconContainer={{ flex: 0.1 }}
          customDatesStyles={getActiveDates(activeDate)}
          onDateSelected={handleDayClick}
        />
      </View>
    </View>
  );
};

CalendarScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  activeDate: PropTypes.string.isRequired,
  handleDayClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeDate: getActiveDate(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleDayClick(date) {
    const isoDate = moment(date).toISOString();
    dispatch(changeActiveDate(isoDate));
  },
});

export { CalendarScreen };
export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
