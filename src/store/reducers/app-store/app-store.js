import { ActionType } from "../../action";

const initialState = {
  registrations: {},
};

const appStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REGISTRATIONS: {
      return { ...state, registrations: action.payload };
    }
    case ActionType.LOAD_ONE_REGISTRATION: {
      return { ...state, registrations: { ...state.registrations, ...action.payload } };
    }
    default:
      return state;
  }
};

export { appStore };
