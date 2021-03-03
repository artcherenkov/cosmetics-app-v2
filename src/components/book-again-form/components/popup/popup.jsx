import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Text, View, ScrollView, Alert, ActivityIndicator } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "./styles";
import { getError, getIsLoading } from "../../../../store/reducers/app-state/selectors";
import { resetError } from "../../../../store/action";

const Popup = ({ onSubmit, onClosePopup, children, error, isLoading, resetError }) => {
  useEffect(() => {
    if (error) {
      Alert.alert(`Произошла ошибка`, error.message, [{ text: `Ок`, onPress: resetError }]);
    }
  }, [error]);

  const [dateToBook, setDateToBook] = useState(new Date());
  const handleBookDateChange = (event, selectedDate) => {
    setDateToBook(selectedDate);
  };
  const handleSubmit = () => onSubmit(dateToBook);

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
            <DateTimePicker
              style={{ width: 160, height: 35 }}
              testID="datePicker1"
              value={dateToBook}
              mode="date"
              locale="ru"
              is24Hour={true}
              display="default"
              onChange={handleBookDateChange}
            />
            <DateTimePicker
              style={{ width: 70, height: 35 }}
              testID="datePicker2"
              value={dateToBook}
              mode="time"
              locale="ru"
              is24Hour={true}
              display="default"
              onChange={handleBookDateChange}
            />
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
