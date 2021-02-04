import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button } from 'react-native';

import styles from './styles';

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.previewContainer}>
      <Text style={styles.previewHeader}>ProfileScreen</Text>
      <Button title="To rating" onPress={() => navigation.navigate(`Rating`)} />
    </View>
  );
};

ProfileScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default ProfileScreen;
