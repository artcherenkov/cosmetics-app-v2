import { ActionType } from "../../action";

const initialState = {
  isLoggedIn: false,
};

const appUser = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE: {
      return { ...state, isLoggedIn: true };
    }
    default:
      return state;
  }
};

export { appUser };
