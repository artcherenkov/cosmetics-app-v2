import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import AuthScreen from '../pages/auth/auth';
import MainRouter from './main/main';
import { getIsLoggedIn } from "../store/reducers/app-user/selectors";

const Router = ({ isLoggedIn }) => (
  <NavigationContainer>
    {!isLoggedIn ? <MainRouter /> : <AuthScreen />}
  </NavigationContainer>
);

Router.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoggedIn: getIsLoggedIn(state),
});

export default connect(mapStateToProps, null)(Router);
