import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CalendarScreen from "../../pages/calendar/calendar";
import RegistrationScreen from "../../pages/registration/registration";

const Stack = createStackNavigator();

const CalendarRouter = () => (
  <Stack.Navigator>
    <Stack.Screen name="Calendar" component={CalendarScreen} options={{ title: `Календарь`, headerShown: false }} />
    <Stack.Screen name="Registration" component={RegistrationScreen} />
  </Stack.Navigator>
);

export default CalendarRouter;
