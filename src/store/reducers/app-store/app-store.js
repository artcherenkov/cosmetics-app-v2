import { rawRegistrations } from "../../../data/registrations";
import { adaptRegsToClient } from "../../../core/adapter/registrations";

const parsedRegs = JSON.parse(rawRegistrations);

const initialState = {
  registrations: adaptRegsToClient(parsedRegs),
};

const appStore = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export { appStore };
