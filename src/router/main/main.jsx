import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { ROUTER_OPTIONS } from '../../utils/router';
import ProfileRouter from '../profile/profile';
import CalendarRouter from '../calendar/calendar';
import LibraryScreen from '../../pages/library/library';
import LogoutButton from "../../components/logout-button/logout-button";

const Drawer = createDrawerNavigator();

const MainRouter = () => (
  <Drawer.Navigator {...ROUTER_OPTIONS} drawerContent={props => (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <LogoutButton />
    </DrawerContentScrollView>
  )}>
    <Drawer.Screen name="Calendar" component={CalendarRouter} options={{ title: `Расписание` }}/>
    <Drawer.Screen name="Profile" component={ProfileRouter} options={{ title: `Профиль` }}/>
    <Drawer.Screen name="Library" component={LibraryScreen} options={{ title: `База знаний` }}/>
  </Drawer.Navigator>
);

export default MainRouter;
