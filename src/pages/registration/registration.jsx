import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Button } from 'react-native';

import styles from './styles';
import commonStyles from "../common-styles";
import Feather from "react-native-vector-icons/Feather";

import moment from "moment";
import { Color } from "../../constants/colors";
import DateSectionIos from "./components/date-section/date-section";
import ServicesSection from "./components/services-section/services-section";
import { getRegistrations } from "../../store/reducers/app-store/selectors";
import { getActiveDate } from "../../store/reducers/app-state/selectors";
import { fetchServices } from "../../store/api-action";
import { resetLoading, setLoading } from "../../store/action";
import { renameKeysCamelToSnake } from "../../core/utils";
import { rawRegistrations } from "../../data/registrations";

const parsedRegistration = JSON.parse(rawRegistrations);

const findRegistration = (rawRegistrations, registrationId) => {
  return parsedRegistration.event_list.find((item) => item.record_id === registrationId);
};

const createService = (service) => {
  const defaultValue = {
    amount: 1,
    cost: 500,
    discount: 0,
    manualCost: 500,
    firstCost: 990,
    costPerUnit: 990,
  };

  return renameKeysCamelToSnake({ ...defaultValue, ...service });
};
const createServiceList = (services) => {
  let cost = 0;
  return {
    services: services.reduce((acc, service) => {
      acc = [...acc, createService(service)];
      cost += service.cost;
      return acc;
    }, []),
    cost,
  };
};

const RegistrationScreen = ({ navigation, registrations, activeRegistration, activeDate, services, fetchServices }) => {
  useEffect(() => {
    if (!services) {
      fetchServices();
    }
  }, [fetchServices]);

  const registration = registrations[moment(activeDate).format(`YYYY-MM-DD`)].eventList.find((reg) => reg.registrationId === activeRegistration);
  const { begin, duration } = registration;

  const [calendarState, setCalendarState] = useState({ date: moment(begin).toISOString(), duration });
  const [clientServices, setClientServices] = useState({ services: registration.services, cost: registration.cost });

  const handleDateChange = (event, selectedDate) => {
    setCalendarState((prevState) => ({ ...prevState, date: selectedDate || moment().toISOString() }));
  };

  const handleServiceAdd = () => {
    setClientServices((prevState) => ({
      ...prevState,
      services: [...prevState.services, { title: `Новая услуга`, cost: `0` }],
    }));
  };

  const handleServiceChange = (newItem, oldItem) => {
    console.log(`newItem`, newItem);
    console.log(`oldItem`, oldItem);
    const index = clientServices.services.findIndex(item => item.id === oldItem.id);
    setClientServices((prevState) => {
      const newServices = [
        ...prevState.services.slice(0, index),
        newItem,
        ...prevState.services.slice(index + 1),
      ];
      return {
        services: newServices,
        cost: newServices.reduce((acc, item) => {
          acc += item.cost;
          return acc;
        }, 0),
      };
    });
  };
  const handleServiceCostChange = (newData) => {
    setClientServices((prevState) => {
      const services = prevState.services;
      const newServices = services.map((service) => ({ ...service, cost: parseInt(newData[service.id]) }));
      return {
        services: newServices,
        cost: newServices.reduce((acc, item) => {
          acc += item.cost;
          return acc;
        }, 0),
      };
    });
  };

  const handleSaveButtonClick = () => {
    console.log({
      ...findRegistration(rawRegistrations, registration.id),
      ...createServiceList(clientServices.services),
      time: moment(calendarState.date).toISOString(),
    });
  };

  return (
    <View style={commonStyles.page}>
      <View style={commonStyles.header}>
        <TouchableOpacity style={{ flexDirection: `row`, alignItems: `center` }} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={25} color={Color.PRIMARY} />
          <Text style={{ fontSize: 16, color: Color.PRIMARY }}>{moment().format(`D MMM`)}</Text>
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Регистрация</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>
          {registration.clientName}
        </Text>
        <DateSectionIos calendarState={calendarState} onDateChange={handleDateChange}/>
        <ServicesSection
          services={services}
          clientServices={clientServices.services}
          cost={clientServices.cost}
          registration={registration}
          handleServiceChange={handleServiceChange}
          handleServiceCostChange={handleServiceCostChange}
        />
        <View style={styles.controls}>
          <Button title="Добавить услугу" onPress={handleServiceAdd}/>
          <Button title="Сохранить" onPress={handleSaveButtonClick}/>
        </View>
      </View>
    </View>
  );
};

RegistrationScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  activeDate: getActiveDate(state),
  registrations: getRegistrations(state),
  activeRegistration: state.STATE.activeRegistration,
  services: state.STORE.services,
});

const mapDispatchToProps = (dispatch) => ({
  fetchServices() {
    dispatch(setLoading());
    dispatch(fetchServices())
      .then(() => dispatch(resetLoading()));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
