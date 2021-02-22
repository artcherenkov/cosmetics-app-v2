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
    default:
      return state;
  }
};

export { appUser };
