export const initialState = {
  activeTab: "home",
  isLoading: false,
  isAuthenticated: false,
  error: "",
  user: {
    id: 0,
    firstName: "Rick",
    lastName: "Roll",
    exercises: [],
  },
  exercises: [],
};

export const ACTIONS = {
  LOGIN: "login",
  LOGOUT: "logout",
  LOGIN_SUCCESS: "login-success",
  ERROR: "error",
  ADD_ALL_EXERCISES: "add-all-exercise",
  ADD_ONE_EXERCISE: "add-exercise",
  REMOVE_USER_EXERCISE: "remove-user-exercise",
  ADD_USER_EXERCISE: "add-user-exercise",
  UPDATE_EXERCISE: "update-exercise",
  UPDATE_USER: "update-user",
  NAVIGATE_ROUTE: "navigate-route",
  SET_ACTIVE_TAB: "set-active-tab",
};
