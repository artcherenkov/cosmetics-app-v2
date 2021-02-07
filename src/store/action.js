export const ActionType = {
  CHANGE_ACTIVE_DATE: `CHANGE_ACTIVE_DATE`,
};

export const changeActiveDate = (date) => ({
  type: ActionType.CHANGE_ACTIVE_DATE,
  payload: date,
});
