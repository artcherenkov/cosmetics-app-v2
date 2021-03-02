import React, { useState } from 'react';
import { Button, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import styles from "../../styles";

const Popup = ({ onSubmit, onClosePopup }) => {
  const [dateToBook, setDateToBook] = useState(new Date());
  const handleBookDateChange = (event, selectedDate) => setDateToBook(selectedDate);

  return (
    <View style={styles.popupContainer}>
      <View style={styles.popup}>
        <Text style={styles.popupHeader}>Выберите дату, на которую нужно перезаписать клиента</Text>
        <View style={styles.popupContent}>
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
        <View style={styles.popupSubmit}>
          <Button title="Перезаписать" onPress={onSubmit.bind(null, dateToBook)}/>
          <Button title="Закрыть" onPress={onClosePopup}/>
        </View>
      </View>
    </View>
  );
};

export default Popup;
