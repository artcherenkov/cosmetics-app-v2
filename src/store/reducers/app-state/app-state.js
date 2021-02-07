import moment from "moment";
import { ActionType } from "../../action";

const initialState = {
  activeDate: moment().toISOString(),
};

const appState = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_ACTIVE_DATE: {
      return { ...state, activeDate: action.payload };
    }
    default:
      return state;
  }
};

export { appState };
