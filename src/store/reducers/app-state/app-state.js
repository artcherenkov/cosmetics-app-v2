import moment from "moment";
import { ActionType } from "../../action";

const Error = {
  INTERNAL: `Внутренняя ошибка сервера, уже фиксим`,
  USER_DOESNT_EXIST: {
    message: `Пользователя не существует`,
    inputs: [`login`],
  },
  WRONG_PASSWORD: {
    message: `Неверный пароль`,
    inputs: [`password`],
  },
  PASSWORD_DIDNT_MATCH: {
    message: `Пароли не совпадают`,
    inputs: [`password`, `password_again`],
  },
  LOGIN_ALREADY_EXISTS: {
    message: `Пользователь с таким именем уже существует`,
    inputs: [`login`],
  },
  WRONG_BRANCH_OR_ID: {
    message: `Неверный ID работника или предприятия`,
    inputs: [`id_ycl`, `id_branch`],
  },
};

const initialState = {
  activeDate: moment().toISOString(),
  isLoading: false,
  error: null,
  activeRegistration: null,
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVE_DATE: {
      return { ...state, activeDate: action.payload };
    }
    case ActionType.SET_ACTIVE_REGISTRATION: {
      return { ...state, activeRegistration: action.payload };
    }
    case ActionType.SET_LOADING: {
      return { ...state, isLoading: true };
    }
    case ActionType.RESET_LOADING: {
      return { ...state, isLoading: false };
    }
    case ActionType.SET_ERROR: {
      if (!action.payload) {
        return { ...state, error: null };
      }

      const error = action.payload;
      const { status } = error.response;
      const { data } = error.response;
      const message = `Произошла неизвестная ошибка`;

      if (status >= 500) {
        return { ...state, error: Error.INTERNAL };
      }

      if (!Error[data.error]) {
        return { ...state, error: message };
      }

      return { ...state, error: Error[data.error] };
    }
    case ActionType.RESET_ERROR: {
      return { ...state, error: null };
    }
    default:
      return state;
  }
};

export { appState };
