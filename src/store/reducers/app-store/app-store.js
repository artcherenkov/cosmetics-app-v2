import { ActionType } from "../../action";
import { renameKeysSnakeToCamel } from "../../../core/utils";

const initialState = {
  registrations: {},
  user: {},
};

const appStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REGISTRATIONS: {
      return { ...state, registrations: action.payload };
    }
    case ActionType.LOAD_ONE_REGISTRATION: {
      return { ...state, registrations: { ...state.registrations, ...action.payload } };
    }
    case ActionType.LOAD_USER: {
      return { ...state, user: renameKeysSnakeToCamel(action.payload) };
    }
    default:
      return state;
  }
};

export { appStore };
