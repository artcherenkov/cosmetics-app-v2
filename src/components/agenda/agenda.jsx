import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, ScrollView } from 'react-native';

import styles from './styles';
import { range } from '../../utils/common';

const getHourStyles = (index) => {
  const res = [styles.hourSection];
  if (index === 24) {
    res.push({ height: 30 });
  }

  return res;
};
const formatWithLeadingZero = (number) => number < 10 ? `0${number}:00` : `${number}:00`;

const Agenda = ({ style }) => {
  return (
    <ScrollView style={[{ ...style }, styles.agendaContainer]}>
      {range(25).map((i) => (
        <View key={`hour-${i}`} style={styles.hourContainer}>
          <Text style={styles.hour}>
            {formatWithLeadingZero(i)}
          </Text>
          <View key={`hour-${i}`} style={getHourStyles(i)} />
        </View>
      ))}
    </ScrollView>
  );
};

Agenda.propTypes = {
  style: PropTypes.object,
};

export default Agenda;
