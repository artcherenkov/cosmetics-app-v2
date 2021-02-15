import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Entypo from "react-native-vector-icons/Entypo";

import styles from './styles';
import commonStyles from "../common-styles";
import Loading from "../../components/loading/loading";
import { getIsLoading } from "../../store/reducers/app-state/selectors";
import { resetLoading, setLoading } from "../../store/action";
import { fetchUser } from "../../store/api-action";
import { getUser } from "../../store/reducers/app-store/selectors";

const ProfileScreen = ({ navigation, isLoading, user, fetchUserData }) => {
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <View style={commonStyles.page}>
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Entypo name="menu" size={30}/>
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Профиль</Text>
      </View>
      <View style={styles.container}>
        {isLoading
          ? <Loading />
          : <View style={styles.card}>
            <View style={styles.headerWrapper}>
              <View style={styles.avatarWrapper}>
                <Image style={styles.avatar} source={{ uri: user.avatar }} />
              </View>
              <View style={styles.headerContent}>
                <View style={styles.nameWrapper}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.login}>Логин: {user.login}</Text>
                </View>
              </View>
            </View>
            <View style={styles.bodyWrapper}>
              <View>
                <Text style={styles.userInfoTitle}>Город:</Text>
                <Text style={styles.userInfo}>{`\t` + user.city}</Text>
              </View>
              <View>
                <Text style={styles.userInfoTitle}>Филиал:</Text>
                <Text style={styles.userInfo}>{`\t` + user.branch}</Text>
              </View>
              <View>
                <Text style={styles.userInfoTitle}>Должность:</Text>
                <Text style={styles.userInfo}>{`\t` + user.role}</Text>
              </View>
              <View>
                <Text style={styles.userInfoTitle}>Начальник:</Text>
                <Text style={styles.userInfo}>{`\t` + user.leader}</Text>
              </View>
              <View>
                <Text style={styles.userInfoTitle}>ID филиала:</Text>
                <Text style={styles.userInfo}>{`\t` + user.idBranch}</Text>
              </View>
              <View>
                <Text style={styles.userInfoTitle}>ID работника из YClients:</Text>
                <Text style={styles.userInfo}>{`\t` + user.idYcl}</Text>
              </View>
            </View>
          </View>}
      </View>
    </View>
  );
};

ProfileScreen.propTypes = {
  navigation: PropTypes.any.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchUserData() {
    dispatch(setLoading());
    dispatch(fetchUser())
      .then(() => dispatch(resetLoading()));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
