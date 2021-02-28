import { authenticate, loadRegistrations, loadOneRegistration, setError, loadUser, loadServices } from "./action";
import moment from "moment";
import { saveTokenToStorage } from "../local-storage/local-storage";
import { getUser } from "./reducers/app-store/selectors";

export const auth = (credentials, endpoint) => (dispatch, _getState, api) => {
  return (
    api.post(`/api/v1/user/${endpoint}`, credentials)
      .then(({ data }) => {
        dispatch(authenticate(data));
        saveTokenToStorage(data.token);
      })
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
      .then(({ data }) => dispatch(loadRegistrations(data)))
      .catch((err) => console.log(err))
  );
};

export const fetchOneRegistration = (date) => (dispatch, getState, api) => {
  return (
    api.get(`/api/v1/event/get_one/${date}`, {
      headers: { Authorization: getState().USER.token },
    })
      .then(({ data }) => dispatch(loadOneRegistration(data, date)))
      .catch((err) => console.log(err))
  );
};

export const fetchServices = () => (dispatch, getState, api) => {
  const state = getState();
  const { idBranch, idYcl } = getUser(state);
  return (
    api.get(`api/v1/event/get/services/${idBranch}/${idYcl}`, {
      headers: { Authorization: getState().USER.token },
    })
      .then(({ data }) => dispatch(loadServices(data)))
      .catch((err) => console.log(err))
  );
};

export const updateRegistration = (data) => (dispatch, getState, api) => {
  return (
    api.post(`/api/v1/event/update`, data, {
      headers: { Authorization: getState().USER.token },
    })
      .then((res) => {})
      .catch((err) => console.log(err))
  );
};
