import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Text, View, ScrollView, Alert, ActivityIndicator } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "./styles";
import { getError, getIsLoading } from "../../../../store/reducers/app-state/selectors";
import { resetError } from "../../../../store/action";
import moment from "moment";

const Popup = ({ registration, onSubmit, onClosePopup, children, error, isLoading, resetError }) => {
  useEffect(() => {
    if (error) {
      Alert.alert(`Произошла ошибка`, error.message, [{ text: `Ок`, onPress: resetError }]);
    }
  }, [error]);

  const initialStartDate = moment(registration.time).toISOString();
  const initialEndDate = moment(registration.time).add(registration.duration, `m`).toISOString();

  console.log(`start`, initialStartDate, `end`, initialEndDate);

  const [dateToBook, setDateToBook] = useState(new Date(initialStartDate));
  const [endDate, setEndDate] = useState(new Date(initialEndDate));
  const [duration, setDuration] = useState(registration.duration);

  const handleBookDateChange = (event, selectedDate) => {
    setDateToBook(selectedDate);
    setEndDate(new Date(moment(selectedDate).add(duration, `m`).toISOString()));
  };

  const handleEndDateChange = (event, selectedDate) => {
    setEndDate(selectedDate);
    setDuration(moment(selectedDate).diff(moment(dateToBook), `m`));
  };

  const handleSubmit = () => onSubmit(dateToBook, duration);

  return (
    <View style={styles.popupContainer}>
      <ScrollView style={styles.popup} contentContainerStyle={{
        justifyContent: `flex-start`,
      }}>
        <Text style={styles.popupHeader}>
          Выберите дату, на которую нужно перезаписать клиента
        </Text>
        <View style={styles.popupContent}>
          <View style={styles.popupDateControls}>
            <View style={{ alignItems: `center`, marginBottom: 10, width: 200, marginLeft: 2 }}>
              <DateTimePicker
                style={{ width: 160, height: 35 }}
                testID="datePicker1"
                value={dateToBook || new Date()}
                mode="date"
                locale="ru"
                is24Hour={true}
                display="default"
                onChange={handleBookDateChange}
              />
            </View>
            <View style={{ flexDirection: `row`, justifyContent: `center` }}>
              <DateTimePicker
                style={{ width: 70, height: 35 }}
                testID="datePicker2"
                value={dateToBook || new Date()}
                mode="time"
                locale="ru"
                is24Hour={true}
                display="default"
                onChange={handleBookDateChange}
              />
              <Text style={{ height: `100%`, paddingTop: 7 }}> – </Text>
              <DateTimePicker
                style={{ width: 70, height: 35 }}
                testID="datePicker3"
                value={endDate || new Date()}
                mode="time"
                locale="ru"
                is24Hour={true}
                display="default"
                minimumDate={new Date(moment(dateToBook).add(15, `m`).toISOString())}
                onChange={handleEndDateChange}
              />
            </View>
          </View>
          {children}
        </View>
        <View style={styles.popupSubmit}>
          {!isLoading ? <Button title="Перезаписать" onPress={handleSubmit}/> : <ActivityIndicator />}
          <Button title="Закрыть" onPress={onClosePopup}/>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state) => ({
  error: getError(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  resetError() {
    dispatch(resetError());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
