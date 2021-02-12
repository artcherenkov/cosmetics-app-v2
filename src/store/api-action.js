import { authenticate, setError } from "./action";
import { adaptRegsToClient } from "../core/adapter/registrations";

export const auth = (credentials, endpoint) => (dispatch, _getState, api) => {
  console.log(credentials);
  return (
    api.post(`/api/v1/user/${endpoint}`, credentials)
      .then(({ data }) => dispatch(authenticate(data)))
      .catch((err) => dispatch(setError(err)))
  );
};

export const getRegistrations = () => (dispatch, getState, api) => {
  return (
    api.get(`/api/v1/event/get/2021-02-12`, {
      headers: { Authorization: getState().USER.token },
    })
      .then(({ data }) => console.log(adaptRegsToClient(data)))
      .catch((err) => console.log(err))
  );
};
