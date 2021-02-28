export const ActionType = {
  // store
  LOAD_REGISTRATIONS: `LOAD_REGISTRATIONS`,
  LOAD_SERVICES: `LOAD_SERVICES`,
  LOAD_ONE_REGISTRATION: `LOAD_ONE_REGISTRATION`,
  LOAD_USER: `LOAD_USER`,
  // state
  CHANGE_ACTIVE_DATE: `CHANGE_ACTIVE_DATE`,
  SET_ACTIVE_REGISTRATION: `SET_ACTIVE_REGISTRATION`,
  SET_LOADING: `SET_LOADING`,
  RESET_LOADING: `RESET_LOADING`,
  SET_ERROR: `SET_ERROR`,
  RESET_ERROR: `RESET_ERROR`,
  // user
  AUTHENTICATE: `AUTHENTICATE`,
  LOGOUT: `LOGOUT`,
};

// store
export const loadRegistrations = (regs) => ({
  type: ActionType.LOAD_REGISTRATIONS,
  payload: regs,
});

export const loadOneRegistration = (reg, date) => ({
  type: ActionType.LOAD_ONE_REGISTRATION,
  payload: { reg, date },
});

export const loadUser = (user) => ({
  type: ActionType.LOAD_USER,
  payload: user,
});

export const loadServices = (services) => ({
  type: ActionType.LOAD_SERVICES,
  payload: services,
});

// state
export const changeActiveDate = (date) => ({
  type: ActionType.CHANGE_ACTIVE_DATE,
  payload: date,
});

export const setActiveRegistration = (id) => ({
  type: ActionType.SET_ACTIVE_REGISTRATION,
  payload: id,
});

export const setLoading = () => ({
  type: ActionType.SET_LOADING,
});

export const resetLoading = () => ({
  type: ActionType.RESET_LOADING,
});

export const setError = (error) => ({
  type: ActionType.SET_ERROR,
  payload: error,
});

export const resetError = () => ({
  type: ActionType.RESET_ERROR,
});

// user
export const authenticate = (credentials) => ({
  type: ActionType.AUTHENTICATE,
  payload: credentials,
});
export const logout = () => ({
  type: ActionType.LOGOUT,
});
