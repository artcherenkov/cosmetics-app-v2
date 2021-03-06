import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from "moment";
import { useNavigation } from '@react-navigation/native';

import { Color } from "../../../constants/colors";
import registrationProp from '../../../props/registration.prop';
import { setActiveRegistration } from "../../../store/action";

const OFFSET_TOP = 15;

const getRegContainerStyles = (time, duration) => {
  return {
    height: duration,
    top: OFFSET_TOP + moment(time).hours() * 60 + moment(time).minutes(),
    backgroundColor: duration < 30 ? Color.ORANGE : Color.PRIMARY_20_RGB,
    borderColor: duration < 30 ? `red` : Color.PRIMARY,
  };
};

const ClientRegistration = ({ registration, setActiveRegistration }) => {
  const { duration, time, id } = registration;
  const navigation = useNavigation();

  const handleRegistrationClick = () => {
    navigation.navigate(`Registration`);
    setActiveRegistration(id);
  };

  return (
    <TouchableOpacity
      style={[styles.regContainer, getRegContainerStyles(time, duration)]}
      onPress={handleRegistrationClick}
    >
      <Text style={styles.regTitle}>{registration.clientName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  regContainer: {
    position: `absolute`,
    left: 50,
    width: `100%`,
    borderLeftWidth: 3,
    borderRadius: 5,
    borderColor: Color.PRIMARY,
    backgroundColor: Color.PRIMARY_20_RGB,
    overflow: `hidden`,
  },
  regTitle: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 18,
  },
});

ClientRegistration.propTypes = {
  registration: registrationProp.isRequired,
  setActiveRegistration: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setActiveRegistration(id) {
    dispatch(setActiveRegistration(id));
  },
});

export default connect(null, mapDispatchToProps)(ClientRegistration);
