import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from './styles';

const RegistrationScreen = () => {
  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewHeader}>RegistrationScreen</Text>
    </View>
  );
};

RegistrationScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default RegistrationScreen;
