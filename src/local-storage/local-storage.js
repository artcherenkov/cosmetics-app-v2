import { AsyncStorage } from "react-native";
import { authenticate } from "../store/action";

export const getTokenFromStorage = async () => {
  return await AsyncStorage.getItem(`user.token`);
};

export const saveTokenToStorage = async (token) => {
  await AsyncStorage.setItem(
    `user.token`,
    token,
  );
};

export const dispatchToken = (dispatch, token) => {
  if (token) {
    dispatch(authenticate({ token }));
  } else {
    console.log(`Данных нет`);
  }
};
