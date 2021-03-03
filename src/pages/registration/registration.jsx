import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Platform, View, Text, TouchableOpacity, Button } from 'react-native';
import Feather from "react-native-vector-icons/Feather";
import moment from "moment";

import styles from './styles';
import commonStyles from "../common-styles";
import { Color } from "../../constants/colors";
import DateSectionIos from "./components/date-section/date-section";
import ServicesSection from "./components/services-section/services-section";
import { getRegistrations } from "../../store/reducers/app-store/selectors";
import { getActiveDate, getIsLoading } from "../../store/reducers/app-state/selectors";
import { bookAgain, fetchOneRegistration, fetchServices, updateRegistration } from "../../store/api-action";
import { changeActiveDate, resetLoading, setLoading } from "../../store/action";
import { renameKeysCamelToSnake } from "../../core/utils";
import Loading from "../../components/loading/loading";
import Popup from "./components/popup/popup";

const findRegistration = (rawRegistrations, registrationId) => {
  return rawRegistrations.event_list.find(
    (item) => item.record_id === registrationId,
  );
};
const getActiveRegistration = (registrations, activeDate, id) => {
  const formattedDate = moment(activeDate).format(`YYYY-MM-DD`);
  return registrations[formattedDate].eventList.find((reg) => reg.id === id);
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

const RegistrationScreen = ({
  isLoading,
  navigation,
  registrations,
  activeRegistration,
  activeDate,
  services,
  fetchServices,
  updateRegistration,
  bookAgain,
  rawRegistrations,
}) => {
  useEffect(() => {
    if (!services) {
      fetchServices();
    }
  }, [fetchServices]);

  const registration = getActiveRegistration(
    registrations,
    activeDate,
    activeRegistration,
  );
  const { time, duration } = registration;

  const [isEdited, setIsEdited] = useState(false);
  const [calendarState, setCalendarState] = useState({
    date: moment(time).toISOString(),
    duration,
  });
  const [clientServices, setClientServices] = useState({
    services: registration.services,
    cost: registration.cost,
  });
  const [isPopupShown, setIsPopupShown] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setIsEdited(true);
    setCalendarState((prevState) => ({
      ...prevState,
      date: selectedDate || moment().toISOString(),
    }));
  };
  const onClosePopup = () => setIsPopupShown(false);

  const handleServiceAdd = () => {
    setIsEdited(true);
    setClientServices((prevState) => ({
      ...prevState,
      services: [...prevState.services, { title: `Новая услуга`, cost: `0` }],
    }));
  };
  const handleServiceChange = (newItem, oldItem) => {
    setIsEdited(true);
    const index = clientServices.services.findIndex(
      (item) => item.id === oldItem.id,
    );
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
    setIsEdited(true);
    setClientServices((prevState) => {
      const services = prevState.services;
      const newServices = services.map((service) => ({
        ...service,
        cost: parseInt(newData[service.id]),
      }));
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
    updateRegistration(
      {
        ...findRegistration(rawRegistrations, registration.id),
        ...createServiceList(clientServices.services),
        time: moment(calendarState.date).toISOString(true),
      },
      navigation,
      activeDate,
    );
  };

  const onBookDateSubmit = (dateToBook) => {
    setIsPopupShown(false);
    bookAgain({
      ...findRegistration(rawRegistrations, registration.id),
      ...createServiceList(clientServices.services),
      time: moment(dateToBook).toISOString(true),
    });
  };

  return (
    <View style={commonStyles.page}>
      <View style={commonStyles.header}>
        <TouchableOpacity
          style={{ flexDirection: `row`, alignItems: `center` }}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={25} color={Color.PRIMARY}/>
          <Text style={{ fontSize: 16, color: Color.PRIMARY }}>
            {moment(activeDate).format(`D MMM`)}
          </Text>
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Регистрация</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{registration.clientName}</Text>
        {Platform.OS === `ios` && (
          <DateSectionIos
            calendarState={calendarState}
            onDateChange={handleDateChange}
          />
        )}
        <View style={styles.bookAgainContainer}>
          <TouchableOpacity style={styles.bookAgainBtn} onPress={setIsPopupShown.bind(null, true)}>
            <Text style={styles.bookAgainTitle}>Перезаписать клиента</Text>
          </TouchableOpacity>
        </View>
        <ServicesSection
          services={services}
          clientServices={clientServices.services}
          cost={clientServices.cost}
          registration={registration}
          handleServiceChange={handleServiceChange}
          handleServiceCostChange={handleServiceCostChange}
          handleServiceAdd={handleServiceAdd}
        />
        <View style={styles.controls}>
          {isLoading
            ? <Loading/>
            : <Button
              title="Сохранить"
              onPress={handleSaveButtonClick}
              disabled={!isEdited}
            />}
        </View>
      </View>
      {isPopupShown && <Popup onSubmit={onBookDateSubmit} onClosePopup={onClosePopup} />}
    </View>
  );
};

RegistrationScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  services: PropTypes.array.isRequired,
  navigation: PropTypes.any.isRequired,
  activeDate: PropTypes.string.isRequired,
  fetchServices: PropTypes.func.isRequired,
  registrations: PropTypes.object.isRequired,
  updateRegistration: PropTypes.func.isRequired,
  activeRegistration: PropTypes.number.isRequired,
  rawRegistrations: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  activeDate: getActiveDate(state),
  registrations: getRegistrations(state),
  rawRegistrations: state.STORE.rawRegistrations,
  activeRegistration: state.STATE.activeRegistration,
  services: state.STORE.services,
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchServices() {
    dispatch(setLoading());
    dispatch(fetchServices())
      .then(() => dispatch(resetLoading()));
  },
  updateRegistration(data, navigation, activeDate) {
    const date = moment(data.time).format(`YYYY-MM-DD`);
    const oldDate = moment(activeDate).format(`YYYY-MM-DD`);
    dispatch(setLoading());
    dispatch(updateRegistration(data))
      .then(() => dispatch(resetLoading()))
      .then(() => navigation.goBack())
      .then(() => dispatch(setLoading()))
      .then(() => dispatch(fetchOneRegistration(oldDate)))
      .then(() => dispatch(changeActiveDate(date)))
      .then(() => dispatch(fetchOneRegistration(date)))
      .then(() => dispatch(resetLoading()));
  },
  bookAgain(data) {
    const date = moment(data.time).format(`YYYY-MM-DD`);
    dispatch(setLoading());
    dispatch(bookAgain(data))
      .then(() => dispatch(fetchOneRegistration(date)))
      .then(() => dispatch(resetLoading()));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationScreen);
