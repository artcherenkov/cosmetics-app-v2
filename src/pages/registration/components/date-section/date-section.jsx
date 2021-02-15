import React from 'react';
import { Platform, Text, View } from 'react-native';
import styles from "../../styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { getDurationString } from "../../../../utils/common";

const DateSectionIos = ({ calendarState, onDateChange }) => {
  return (
    <View style={styles.dateControlsContainer}>
      {Platform.OS === `ios` && <View style={{ width: `40%` }}>
        <DateTimePicker
          testID="datePicker"
          value={new Date(calendarState.date) || moment()}
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
              value={new Date(calendarState.date) || moment()}
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

export default DateSectionIos;
