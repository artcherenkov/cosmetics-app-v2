import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";

import styles from './styles';
import commonStyles from "../common-styles";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={commonStyles.page}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Entypo name="menu" size={30}/>
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Профиль</Text>
      </View>
      <View style={styles.container}>
      </View>
    </View>
  );
};

ProfileScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

export default ProfileScreen;
