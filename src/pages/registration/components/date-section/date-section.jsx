import React from 'react';
import PropTypes from 'prop-types';
import { Platform, Text, View } from 'react-native';
import styles from "../../styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { getDurationString } from "../../../../utils/common";

const DateSectionIos = ({ calendarState, onDateChange }) => {
  console.log(calendarState);
  return (
    <View style={styles.dateControlsContainer}>
      {Platform.OS === `ios` && <View style={{ width: `40%` }}>
        <DateTimePicker
          testID="datePicker"
          value={new Date(calendarState.date) || new Date()}
          mode="date"
          locale="ru"
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      </View>}
      <View style={styles.dateContainer}>
        <View style={styles.intervalContainer}>
          {Platform.OS === `ios` && <View style={{ width: 75 }}>
            <DateTimePicker
              style={{ width: 70, height: 35 }}
              testID="datePicker1"
              value={new Date(calendarState.date) || new Date()}
              mode={`time`}
              locale="ru"
              is24Hour={true}
              display="default"
              onChange={onDateChange}
            />
          </View>}
          <Text style={{ paddingTop: 8, paddingRight: 9 }}>&mdash;</Text>
          <View style={[styles.dateControl, styles.durationControl]}>
            <Text style={styles.date}>{moment(calendarState.date).add(calendarState.duration, `m`).format(`kk:mm`)}</Text>
          </View>
        </View>
        <View style={styles.durationContainer}>
          <Text style={styles.durationText}>{getDurationString(calendarState.duration)}</Text>
        </View>
      </View>
    </View>
  );
};

DateSectionIos.propTypes = {
  calendarState: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default DateSectionIos;
