import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ROUTER_OPTIONS } from "../../utils/router";
import ProfileRouter from "../profile/profile";
import CalendarRouter from "../calendar/calendar";
import LibraryScreen from "../../pages/library/library";

const Tab = createBottomTabNavigator();

const MainRouter = () => (
  <Tab.Navigator {...ROUTER_OPTIONS}>
    <Tab.Screen name="Profile" component={ProfileRouter} />
    <Tab.Screen name="Calendar" component={CalendarRouter} />
    <Tab.Screen name="Library" component={LibraryScreen} />
  </Tab.Navigator>
);

export default MainRouter;
