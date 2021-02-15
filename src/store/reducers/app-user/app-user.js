import { ActionType } from "../../action";

const initialState = {
  isLoggedIn: false,
  token: `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NDM1MjUyNDEsImlhdCI6MTYxMTk4OTI0MSwic3ViIjoidGVzdGVyMiJ9.ZHE0NKpfBGa8yINAOqA5qtqlSLPmpooW3mHtRR3wmKg`,
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
