import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView, View, TextInput, Button } from 'react-native';

import Picker from "../../../../components/picker/picker";
import styles from "./styles";

const getInitialValues = (clientServices) => {
  return clientServices
    .reduce((acc, item) => {
      acc = { ...acc, [item.id]: item.cost.toString() };
      return acc;
    }, {});
};

const ServicesSection = ({ clientServices, cost, services, handleServiceChange, handleServiceCostChange, handleServiceAdd }) => {
  const [inputValues, setInputValues] = useState(getInitialValues(clientServices));

  useEffect(() => {
    setInputValues(getInitialValues(clientServices));
  }, [clientServices]);

  const handleInputChange = (id) => {
    return (text) => {
      setInputValues((prevState) => ({
        ...prevState,
        [id]: text,
      }));
    };
  };

  return (
    <ScrollView style={styles.servicesContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.cost}>&#8381; {cost.toLocaleString()}</Text>
        <Button title="Добавить услугу" onPress={handleServiceAdd}/>
      </View>
      {clientServices.map((service, i) => (
        <View style={styles.serviceContainer} key={`item-${i}`}>
          <View style={styles.pickerContainer}>
            <Picker
              data={services}
              initialValue={service}
              onItemChange={handleServiceChange}
            />
          </View>
          <View style={styles.costInputContainer}>
            <Text>&#8381;</Text>
            <TextInput
              keyboardType={`number-pad`}
              value={inputValues[service.id]}
              onChangeText={handleInputChange(service.id)}
              onBlur={handleServiceCostChange.bind(this, inputValues)}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

ServicesSection.propTypes = {
  cost: PropTypes.oneOfType([PropTypes.string.isRequired, PropTypes.number.isRequired]),
  services: PropTypes.array.isRequired,
  clientServices: PropTypes.array.isRequired,
  handleServiceChange: PropTypes.func.isRequired,
  handleServiceCostChange: PropTypes.func.isRequired,
  handleServiceAdd: PropTypes.func.isRequired,
};

export default ServicesSection;
