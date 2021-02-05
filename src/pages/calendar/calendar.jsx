import React from 'react';
import PropTypes from 'prop-types';
import {SafeAreaView, Button} from 'react-native';

import CalendarStrip from "../../components/calendar-strip/calendar-strip";

const CalendarScreen = ({ navigation }) => {

  const handleBackBtnClick = (btnTitle) => {
    navigation.setOptions({ title: btnTitle });
    navigation.navigate(`Registration`);
  };

  return (
    <SafeAreaView>
      <CalendarStrip />
      <Button title="To registration" onPress={handleBackBtnClick.bind(this, `hello`)} />
    </SafeAreaView>
  );
};

CalendarScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default CalendarScreen;
