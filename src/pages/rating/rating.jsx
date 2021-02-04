import React from 'react';
import {View, Text} from 'react-native';

import styles from './styles';

const RatingScreen = () => {
  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewHeader}>RatingScreen</Text>
    </View>
  );
};

RatingScreen.propTypes = {};

export default RatingScreen;
