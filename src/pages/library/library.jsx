import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

const LibraryScreen = () => {
  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewHeader}>LibraryScreen</Text>
    </View>
  );
};

LibraryScreen.propTypes = {};

export default LibraryScreen;
