export const initialState = {
  activeTab: "home",
  isAuthenticated: false,
  alert: {
    type: "",
    message: "",
  },
  user: {
    id: 0,
    firstName: "",
    lastName: "",
    username: "",
    exercises: [],
  },
  exercises: [],
};

export const ACTIONS = {
  LOADING: "loading",
  IS_ATTEMPTING_LOGIN: "is-attempting-login",
  LOGIN: "login",
  LOGOUT: "logout",
  SHOW_ALERT: "show-alert",
  HIDE_ALERT: "hide-alert",
  ADD_ALL_EXERCISES: "add-all-exercise",
  ADD_ONE_EXERCISE: "add-exercise",
  REMOVE_USER_EXERCISE: "remove-user-exercise",
  ADD_USER_EXERCISE: "add-user-exercise",
  UPDATE_EXERCISE: "update-exercise",
  UPDATE_USER: "update-user",
  NAVIGATE_ROUTE: "navigate-route",
  SET_ACTIVE_TAB: "set-active-tab",
  BANK_USER_EXERCISE: "bank-user-exercise",
};
