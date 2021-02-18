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
  rawRegistrations: {},
  registrations: {},
  user: {},
  services: adaptServicesToClient(renameKeysSnakeToCamel(parsedServices).data),
};

const appStore = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_REGISTRATIONS: {
      const rawRegistrations = action.payload;
      const registrations = adaptRegsToClient(action.payload);
      return {
        ...state,
        registrations: { ...state.registrations, ...registrations },
        rawRegistrations: { ...state.rawRegistrations, ...rawRegistrations },
      };
    }
    case ActionType.LOAD_ONE_REGISTRATION: {
      const { reg, date } = action.payload;

      const oldEventsList = state.rawRegistrations.event_list;
      const eventListToInsert = reg.event_list;
      const newEventsList = [...oldEventsList, ...eventListToInsert];

      const rawRegistrations = state.rawRegistrations;
      rawRegistrations.event_list = newEventsList;

      let registration = adaptRegsToClient(reg);
      if (!Object.keys(registration).length) {
        registration = { [date]: {} };
      }
      return {
        ...state,
        rawRegistrations,
        registrations: { ...state.registrations, ...registration },
      };
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
