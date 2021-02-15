import { ActionType } from "../../action";
import { renameKeysSnakeToCamel } from "../../../core/utils";
import { rawRegistrations } from "../../../data/registrations";
import { rawServices } from "../../../data/services";
import { adaptRegsToClient } from "../../../core/adapter/registrations";

const parsedRegs = JSON.parse(rawRegistrations);
const parsedServices = JSON.parse(rawServices);

const adaptServicesToClient = (rawData) => {
  return rawData.reduce((acc, item) => {
    const { title, id, priceMax: cost } = item;
    acc = [...acc, { title, id, cost }];
    return acc;
  }, []);
};

const initialState = {
  registrations: adaptRegsToClient(parsedRegs),
  user: {},
  services: adaptServicesToClient(renameKeysSnakeToCamel(parsedServices).data),
};

const appStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REGISTRATIONS: {
      return { ...state, registrations: action.payload };
    }
    case ActionType.LOAD_ONE_REGISTRATION: {
      return { ...state, registrations: { ...state.registrations, ...action.payload } };
    }
    case ActionType.LOAD_SERVICES: {
      return { ...state, services: action.payload };
    }
    case ActionType.LOAD_USER: {
      return { ...state, user: renameKeysSnakeToCamel(action.payload) };
    }
    default:
      return state;
  }
};

export { appStore };
