import { authenticate, loadRegistrations, loadOneRegistration, setError, loadUser, loadServices } from "./action";
import { adaptRegsToClient } from "../core/adapter/registrations";
import moment from "moment";

export const auth = (credentials, endpoint) => (dispatch, _getState, api) => {
  return (
    api.post(`/api/v1/user/${endpoint}`, credentials)
      .then(({ data }) => dispatch(authenticate(data)))
      .catch((err) => dispatch(setError(err)))
  );
};

export const fetchUser = () => (dispatch, getState, api) => (
  api.get(`/api/v1/user/me`, {
    headers: { Authorization: getState().USER.token },
  })
    .then(({ data }) => dispatch(loadUser(data)))
    .catch((err) => console.log(err))
);

export const fetchRegistrations = () => (dispatch, getState, api) => {
  return (
    api.get(`/api/v1/event/get/${moment().format(`YYYY-MM-DD`)}`, {
      headers: { Authorization: getState().USER.token },
    })
      .then(({ data }) => dispatch(loadRegistrations(adaptRegsToClient(data))))
      .catch((err) => console.log(err))
  );
};

export const fetchOneRegistration = (date) => (dispatch, getState, api) => {
  return (
    api.get(`/api/v1/event/get_one/${date}`, {
      headers: { Authorization: getState().USER.token },
    })
      .then(({ data }) => dispatch(loadOneRegistration(adaptRegsToClient(data))))
      .catch((err) => console.log(err))
  );
};

export const fetchServices = () => (dispatch, getState, api) => {
  return (
    api.get(`api/v1/event/get/services/311496/918344`, {
      headers: { Authorization: getState().USER.token },
    })
      .then(({ data }) => dispatch(loadServices(data)))
      .catch((err) => console.log(err))
  );
};
