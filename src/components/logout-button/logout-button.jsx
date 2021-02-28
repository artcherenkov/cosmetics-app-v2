import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DrawerItem } from '@react-navigation/drawer';

import styles from './styles';
import { logout } from "../../store/action";
import { saveTokenToStorage } from "../../local-storage/local-storage";

const LogoutButton = ({ onLogout }) => {
  return (
    <DrawerItem
      label="Выйти из аккаунта"
      labelStyle={styles.labelStyle}
      onPress={onLogout}
      style={styles.button}
    />
  );
};

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    saveTokenToStorage(``)
      .then(() => dispatch(logout()));
  },
});

export default connect(null, mapDispatchToProps)(LogoutButton);
