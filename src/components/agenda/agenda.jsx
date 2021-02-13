import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, ScrollView } from 'react-native';
import moment from "moment";

import styles from './styles';
import { range } from '../../utils/common';
import { getRegistrations } from "../../store/reducers/app-store/selectors";
import ClientRegistration from "./components/client-registration";
import { getActiveDate } from "../../store/reducers/app-state/selectors";

const getHourStyles = (index) => {
  const res = [styles.hourSection];
  if (index === 24) {
    res.push({ height: 30 });
  }

  return res;
};
const formatWithLeadingZero = (number) => number < 10 ? `0${number}:00` : `${number}:00`;

const Agenda = ({ style, registrations, activeDate }) => {
  let activeDateEvents = registrations ? registrations[moment(activeDate).format(`YYYY-MM-DD`)] : null;

  useEffect(() => {
    activeDateEvents = registrations ? registrations[moment(activeDate).format(`YYYY-MM-DD`)] : null;
  }, [activeDate]);

  return (
    <ScrollView style={[{ ...style }, styles.agendaContainer]}>
      {range(25).map((i) => (
        <View key={`hour-${i}`} style={styles.hourContainer}>
          <Text style={styles.hour}>
            {formatWithLeadingZero(i)}
          </Text>
          <View key={`hour-${i}`} style={getHourStyles(i)}/>
        </View>
      ))}
      {activeDateEvents && activeDateEvents.eventList.map((registration, i) => (
        <ClientRegistration key={`reg-${i}`} registration={registration} />
      ))}
    </ScrollView>
  );
};

Agenda.propTypes = {
  style: PropTypes.any,
  registrations: PropTypes.object.isRequired,
  activeDate: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  registrations: getRegistrations(state),
  activeDate: getActiveDate(state),
});

export { Agenda };
export default connect(mapStateToProps, null)(Agenda);
