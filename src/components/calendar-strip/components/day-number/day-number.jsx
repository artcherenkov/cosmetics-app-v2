import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';

import styles from './styles';
import { changeActiveDate } from "../../../../store/action";
import { getActiveDate } from "../../../../store/reducers/app-state/selectors";

const DayNumber = ({ date, size, activeDate, handleDayClick }) => {
  const isActiveDate = moment(date).isSame(activeDate, `d`);
  const isToday = moment(date).isSame(moment(), `d`);

  const getContentStyles = () => {
    const stylesToApply = [styles.content];
    if (isToday) {
      stylesToApply.push(styles.contentIsToday);
    }
    if (isActiveDate) {
      stylesToApply.push(styles.contentIsActive);
    }

    return stylesToApply;
  };

  return (
    <View style={[{ width: size, height: size }, styles.dayContainer]}>
      <TouchableOpacity style={getContentStyles()} onPress={() => handleDayClick(date)}>
        <Text style={styles.dayOfWeek}>{moment(date).format(`dd`)}</Text>
        <Text style={styles.day}>{moment(date).format(`D`)}</Text>
      </TouchableOpacity>
    </View>
  );
};

DayNumber.propTypes = {
  date: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  activeDate: PropTypes.string.isRequired,
  handleDayClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activeDate: getActiveDate(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleDayClick(date) {
    dispatch(changeActiveDate(date));
  },
});

export { DayNumber };
export default connect(mapStateToProps, mapDispatchToProps)(DayNumber);
