import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthScreen from '../pages/auth/auth';
import MainRouter from './main/main';

const IS_LOGGED_IN = true;

const Router = () => (
  <NavigationContainer>
    {IS_LOGGED_IN ? <MainRouter /> : <AuthScreen />}
  </NavigationContainer>
);

export default Router;
