import React from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";

import { ROUTER_OPTIONS } from "../../utils/router";
import ProfileRouter from "../profile/profile";
import CalendarRouter from "../calendar/calendar";
import LibraryScreen from "../../pages/library/library";

const Drawer = createDrawerNavigator();

const MainRouter = () => (
  <Drawer.Navigator {...ROUTER_OPTIONS}>
    <Drawer.Screen name="Profile" component={ProfileRouter} />
    <Drawer.Screen name="Calendar" component={CalendarRouter} />
    <Drawer.Screen name="Library" component={LibraryScreen} />
  </Drawer.Navigator>
);

export default MainRouter;
