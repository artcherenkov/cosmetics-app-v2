import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from "../../styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { getDurationString } from "../../../../utils/common";
import { Color } from "../../../../constants/colors";

const DateSectionIos = ({ calendarState, onDateChange }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  return (
    <View style={styles.dateControlsContainer}>
      <View style={styles.dateView}>
        {isEditMode
          ? <View style={{ width: `100%` }}>
            <DateTimePicker
              testID="datePicker"
              value={new Date(calendarState.date) || new Date()}
              mode="date"
              locale="ru"
              is24Hour={true}
              display="default"
              onChange={onDateChange}
            />
          </View>
          : <View style={[styles.dateControl, { width: `100%` }]}>
              <Text style={styles.date}>{moment(calendarState.date)
                .format(`DD MMM yyyy г.`)}</Text>
            </View>}
        <TouchableOpacity onPress={() => setIsEditMode((prevState) => !prevState)}>
          <Text style={{ color: Color.PRIMARY, fontSize: 16, textAlign: `center`, paddingTop: 15 }}>
            {isEditMode ? `Готово` : `Перенести запись`}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.intervalView}>
        <View style={styles.intervalContainer}>
          {isEditMode
            ? <View style={{ width: 75 }}>
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
            </View>
            : <View style={[styles.dateControl, styles.durationControl, styles.dateControlLeft]}>
              <Text style={[styles.date]}>{moment(calendarState.date)
                .format(`kk:mm`)}</Text>
            </View>}
          <Text style={{ paddingTop: 8, paddingRight: 9 }}>&mdash;</Text>
          <View style={[styles.dateControl, styles.durationControl]}>
            <Text style={styles.date}>{moment(calendarState.date)
              .add(calendarState.duration, `m`)
              .format(`kk:mm`)}</Text>
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
