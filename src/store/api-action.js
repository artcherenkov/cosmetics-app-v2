import { authenticate, setError } from "./action";

export const auth = (credentials, endpoint) => (dispatch, _getState, api) => {
  console.log(credentials);
  return (
    api.post(`/api/v1/user/${endpoint}`, credentials)
      .then(({ data }) => dispatch(authenticate(data)))
      .catch((err) => dispatch(setError(err)))
  );
};
