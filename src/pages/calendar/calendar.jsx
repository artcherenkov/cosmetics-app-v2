import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Button} from 'react-native';

import styles from './styles';

const CalendarScreen = ({ navigation }) => {

  const handleBackBtnClick = (btnTitle) => {
    navigation.setOptions({ title: btnTitle });
    navigation.navigate(`Registration`);
  };

  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewHeader}>CalendarScreen</Text>
      <Button title="To registration" onPress={handleBackBtnClick.bind(this, `hello`)} />
    </View>
  );
};

CalendarScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default CalendarScreen;
