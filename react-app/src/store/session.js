const USER = "sesssion/USER";

const setSession = (user) => ({ type: USER, user });

export const authenticate = () => async (dispatch) => {
  const response = await window.fetch("/api/auth/", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const user = await response.json();
  if (user.errors) return dispatch(setSession(null));
  dispatch(setSession(user));
};

export const login = (displayName, password) => async (dispatch) => {
  const response = await window.fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ displayName, password }),
  });
  const user = await response.json();
  if (user.errors) {
    dispatch(setSession(null));
    return user.errors;
  }
  dispatch(setSession(user));
};

export const signUp = (username, email, password) => async (dispatch) => {
  const response = await window.fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });
  const user = await response.json();
  if (user.errors) {
    dispatch(setSession(null));
    return user.errors;
  }
  dispatch(setSession(user));
};

export const logout = () => async (dispatch) => {
  await window.fetch("/api/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  dispatch(setSession(null));
};

export default function reducer(state = { user: null, loaded: false }, action) {
  switch (action.type) {
    case USER:
      return { ...state, user: action.user, loaded: true };
    default:
      return state;
  }
}
