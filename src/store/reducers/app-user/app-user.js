import { ActionType } from "../../action";

const initialState = {
  isLoggedIn: false,
  token: ``,
};

const appUser = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHENTICATE: {
      const { token } = action.payload;
      return { ...state, isLoggedIn: true, token };
    }
    case ActionType.LOGOUT: {
      return { ...state, isLoggedIn: false, token: `` };
    }
    default:
      return state;
  }
};

export { appUser };
