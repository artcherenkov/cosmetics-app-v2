import { authenticate } from "./action";

export const login = (credentials) => (dispatch, _getState, api) => {
  console.log(credentials);
  return (
    api.post(`/api/v1/user/login`, credentials)
      .then(({ data }) => dispatch(authenticate(data)))
      .catch((err) => console.log(err))
  );
};
