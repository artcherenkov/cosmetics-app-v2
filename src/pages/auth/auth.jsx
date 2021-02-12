import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import styles from './styles';
import { auth } from "../../store/api-action";
import { getError, getIsLoading } from "../../store/reducers/app-state/selectors";
import { resetError, resetLoading, setLoading } from "../../store/action";

export const AuthField = {
  REGISTER: [
    { name: `login`, label: `Логин (email)`, config: { required: `Заполните обязательное поле` } },
    { name: `password`, label: `Пароль`, config: { required: `Заполните обязательное поле` } },
    { name: `password_again`, label: `Пароль ещё раз`, config: { required: `Заполните обязательное поле` } },
    { name: `id_ycl`, label: `ID работника`, config: { required: `Заполните обязательное поле` } },
    { name: `id_branch`, label: `ID предприятия`, config: { required: `Заполните обязательное поле` } },
    { name: `leader`, label: `Руководитель`, config: { required: `Заполните обязательное поле` } },
    { name: `role`, label: `Должность`, config: { required: `Заполните обязательное поле` } },
  ],
  LOGIN: [
    { name: `login`, label: `Логин (email)`, config: { required: `Заполните обязательное поле` } },
    { name: `password`, label: `Пароль`, config: { required: `Заполните обязательное поле` } },
  ],
};

const AuthScreen = ({ onSubmit, resetError, isLoading, error }) => {
  const { register, handleSubmit, setValue, errors, setError, clearErrors, getValues, unregister } = useForm();
  const [isLogin, setIsLogin] = useState(true);
  let inputsToUse = isLogin ? AuthField.LOGIN : AuthField.REGISTER;

  const validatePasswords = (value) => value === getValues().password || `Пароли не совпадают`;

  useEffect(() => {
    if (error) {
      error.inputs.forEach((input) => {
        setError(input, {
          type: `manual`,
          message: error.message,
        });
      });
      Alert.alert(`Произошла ошибка`, error.message, [{ text: `Ок`, onPress: resetError }]);
    }
  }, [error]);

  useEffect(() => {
    // отменим регистрацию всех полей
    unregister(AuthField.REGISTER.map((input) => input.name));

    inputsToUse = isLogin ? AuthField.LOGIN : AuthField.REGISTER;
    inputsToUse.forEach((input) => {
      if (input.name === `password_again`) {
        register(input.name, { ...input.config, validate: validatePasswords });
      } else {
        register(input.name, input.config);
      }
    });
  }, [register, isLogin]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: `center`, justifyContent: `center` }}>
        {inputsToUse.map((input) => (
          <View style={styles.inputContainer} key={`input-${isLogin + input.name}`}>
            <Text>{input.label}</Text>
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize="none" onChangeText={(text) => setValue(input.name, text)} />
            {errors[input.name] && <Text style={{ color: `red` }}>{errors[input.name].message}</Text>}
          </View>
        ))}
        {isLoading ? <ActivityIndicator /> : <Button title={isLogin ? `Войти` : `Зарегистрироваться`} onPress={handleSubmit(onSubmit.bind(this, isLogin))}/>}
        <TouchableOpacity style={{ marginTop: 15 }} onPress={() => {
          setIsLogin((prevState) => !prevState);
          clearErrors();
        }}>
          <Text>{isLogin ? `Еще нет аккаунта? Зарегистрироваться` : `Уже есть аккаунт? Войти`}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

AuthScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.any,
  resetError: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(isLogin, data) {
    const endpoint = isLogin ? `login` : `register`;
    dispatch(setLoading());
    dispatch(auth(data, endpoint))
      .then(() => dispatch(resetLoading()));
  },
  resetError() {
    dispatch(resetError());
  },
});

export { AuthScreen };
export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
