export const ActionType = {
  CHANGE_ACTIVE_DATE: `CHANGE_ACTIVE_DATE`,
  AUTHENTICATE: `AUTHENTICATE`,
};

export const changeActiveDate = (date) => ({
  type: ActionType.CHANGE_ACTIVE_DATE,
  payload: date,
});

export const authenticate = (credentials) => ({
  type: ActionType.AUTHENTICATE,
  payload: credentials,
});
