import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import styles from './styles';
import { login } from "../../store/api-action";

const AuthField = {
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

const AuthScreen = ({ onSubmit }) => {
  const { register, handleSubmit, setValue, errors, clearErrors, getValues } = useForm();
  const [isLogin, setIsLogin] = useState(true);
  let inputsToUse = isLogin ? AuthField.LOGIN : AuthField.REGISTER;

  const validatePasswords = (value) => value === getValues().password || `Пароли не совпадают`;

  useEffect(() => {
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
        {inputsToUse.map((input, i) => (
          <View style={styles.inputContainer} key={`input-${isLogin + input.name}`}>
            <Text>{input.label}</Text>
            <TextInput style={styles.input} autoCorrect={false} autoCapitalize="none" onChangeText={(text) => setValue(input.name, text)} />
            {errors[input.name] && <Text style={{ color: `red` }}>{errors[input.name].message}</Text>}
          </View>
        ))}
        <Button title={isLogin ? `Войти` : `Зарегистрироваться`} onPress={handleSubmit(onSubmit)}/>
        <TouchableOpacity onPress={() => {
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
};

const mapDispatchToProps = (dispatch) => ({
  onSubmit(data) {
    dispatch(login(data));
  },
});

export { AuthScreen };
export default connect(null, mapDispatchToProps)(AuthScreen);
