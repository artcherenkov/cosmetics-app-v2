import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from 'react-native';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import styles from './styles';
import { auth } from "../../store/api-action";
import { getError, getIsLoading } from "../../store/reducers/app-state/selectors";
import { resetError, resetLoading, setLoading } from "../../store/action";
import Picker from "../../components/picker/picker";
import leaders from "../../data/leaders";
import roles from "../../data/roles";

export const AuthField = {
  REGISTER: [
    {
      name: `login`,
      placeholder: `Введите логин`,
      label: `Логин`,
      config: { required: `Заполните обязательное поле` },
    },
    {
      name: `password`,
      label: `Пароль`,
      placeholder: `Введите пароль`,
      config: { required: `Заполните обязательное поле` },
    },
    {
      name: `password_again`,
      label: `Пароль ещё раз`,
      placeholder: `Введите пароль еще раз`,
      config: { required: `Заполните обязательное поле` },
    },
    {
      name: `id_ycl`,
      label: `ID работника`,
      placeholder: `Введите ID работника`,
      config: { required: `Заполните обязательное поле` },
    },
    {
      name: `id_branch`,
      label: `ID предприятия`,
      placeholder: `Введите ID предприятия`,
      config: { required: `Заполните обязательное поле` },
    },
    {
      name: `leader`,
      label: `Руководитель`,
      placeholder: `Выберите руководителя`,
      config: { required: `Заполните обязательное поле` },
    },
    {
      name: `role`,
      label: `Должность`,
      placeholder: `Выберите вышу должность`,
      config: { required: `Заполните обязательное поле` },
    },
  ],
  LOGIN: [
    {
      name: `login`,
      placeholder: `Введите логин`,
      label: `Логин`,
      config: { required: `Заполните обязательное поле` },
    },
    {
      name: `password`,
      label: `Пароль`,
      placeholder: `Введите пароль`,
      config: { required: `Заполните обязательное поле` },
    },
  ],
};

const AuthScreen = ({ onSubmit, resetError, isLoading, error }) => {
  const {
    register,
    handleSubmit,
    setValue,
    errors,
    setError,
    clearErrors,
    getValues,
    unregister,
  } = useForm();
  const [isLogin, setIsLogin] = useState(true);
  let inputsToUse = isLogin ? AuthField.LOGIN : AuthField.REGISTER;

  const validatePasswords = (value) => value === getValues().password || `Пароли не совпадают`;
  const handleInputChange = (input) => (text) => setValue(input.name, text);
  const handleChangeModePress = () => {
    setIsLogin((prevState) => !prevState);
    clearErrors();
  };

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

  const handleLeaderChange = (input) => (newItem) => {
    setValue(input.name, newItem.title);
  };

  const handleRolesChange = (input) => (newItem) => {
    setValue(input.name, newItem);
  };

  const getInputStyles = (isValid) => {
    const style = [styles.input];
    if (!isValid) {
      style.push(styles.invalidInput);
    }

    return style;
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <ImageBackground style={styles.logo} source={require(`../../img/logo.png`)}/>
      </View>
      <ScrollView style={styles.formContainer} contentContainerStyle={styles.formContainerContent}>
        {inputsToUse.map((input) => (
          <View style={styles.inputContainer} key={`input-${isLogin + input.name}`}>
            <Text style={styles.label}>{input.label}</Text>
            {input.name === `leader` && (
              <Picker
                data={leaders}
                initialValue={{ title: `Выберите руководителя` }}
                onItemChange={handleLeaderChange(input)}
                isPlaceholder
                pickerContainerStyle={getInputStyles(!errors[input.name])}
                pickedItemTitleStyle={styles.pickedItemTitleStyle}
                listItemTitleStyle={styles.listItemTitleStyle}
              />
            )}
            {input.name === `role` && (
              <Picker
                data={roles}
                initialValue={{ title: `Выберите ваши должности` }}
                onItemChange={handleRolesChange(input)}
                isPlaceholder
                isMultiple
                pickerContainerStyle={getInputStyles(!errors[input.name])}
                pickedItemTitleStyle={styles.pickedItemTitleStyle}
                listItemTitleStyle={styles.listItemTitleStyle}
              />
            )}
            {![`leader`, `role`].includes(input.name) && (
              <TextInput
                style={getInputStyles(!errors[input.name])}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={input.placeholder}
                onChangeText={handleInputChange(input)}
              />
            )}
            {errors[input.name] && (
              <Text style={styles.errorMessage}>{errors[input.name].message}</Text>
            )}
          </View>
        ))}
        <View style={styles.controlsContainer}>
          {isLoading
            ? <ActivityIndicator/>
            : <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit(onSubmit.bind(this, isLogin))}>
              <Text style={styles.submitText}>{isLogin ? `Войти` : `Зарегистрироваться`}</Text>
            </TouchableOpacity>}
          <TouchableOpacity style={styles.changeModeBtn} onPress={handleChangeModePress}>
            <Text style={styles.changeModeText}>
              {isLogin
                ? `Еще нет аккаунта? Зарегистрироваться`
                : `Уже есть аккаунт? Войти`}
            </Text>
          </TouchableOpacity>
        </View>
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
