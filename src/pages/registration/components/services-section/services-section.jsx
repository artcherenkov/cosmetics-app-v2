import React, { useState, useEffect } from 'react';
import { Text, ScrollView, View, TextInput } from 'react-native';
import styles from "../../styles";
import Picker from "../../../../components/picker/picker";

const ServicesSection = ({ clientServices, cost, services, handleServiceChange, handleServiceCostChange }) => {
  const getInitialValues = (clientServices) => clientServices
    .reduce((acc, item) => {
      acc = { ...acc, [item.id]: item.cost.toString() };
      return acc;
    }, {});

  console.log(getInitialValues(clientServices));

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
      <Text style={styles.cost}>&#8381; {cost.toLocaleString()}</Text>
      {clientServices.map((service, i) => (
        <View style={styles.serviceContainer} key={`item-${i}`}>
          <View style={{ flexGrow: 1, width: 1 }}>
            <Picker
              data={services}
              initialValue={service}
              onItemChange={handleServiceChange}
            />
          </View>
          <View style={{ width: 60, flexDirection: `row`, marginLeft: 10 }}>
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

export default ServicesSection;
