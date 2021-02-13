export const ActionType = {
  // store
  LOAD_REGISTRATIONS: `LOAD_REGISTRATIONS`,
  LOAD_ONE_REGISTRATION: `LOAD_ONE_REGISTRATION`,
  LOAD_USER: `LOAD_USER`,
  // state
  CHANGE_ACTIVE_DATE: `CHANGE_ACTIVE_DATE`,
  SET_LOADING: `SET_LOADING`,
  RESET_LOADING: `RESET_LOADING`,
  SET_ERROR: `SET_ERROR`,
  RESET_ERROR: `RESET_ERROR`,
  // user
  AUTHENTICATE: `AUTHENTICATE`,
};

// store
export const loadRegistrations = (regs) => ({
  type: ActionType.LOAD_REGISTRATIONS,
  payload: regs,
});

export const loadOneRegistration = (reg) => ({
  type: ActionType.LOAD_ONE_REGISTRATION,
  payload: reg,
});

export const loadUser = (user) => ({
  type: ActionType.LOAD_USER,
  payload: user,
});

// state
export const changeActiveDate = (date) => ({
  type: ActionType.CHANGE_ACTIVE_DATE,
  payload: date,
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
