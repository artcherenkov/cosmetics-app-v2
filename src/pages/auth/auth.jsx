import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const AuthScreen = () => {
  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewHeader}>AuthScreen</Text>
    </View>
  );
};

AuthScreen.propTypes = {};

export default AuthScreen;
