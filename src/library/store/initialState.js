export const initialState = {
  activeTab: "home",
  isAuthenticated: false,
  alert: {
    type: "",
    message: "",
  },
  user: {
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    routineId: "",
    exercises: [],
    dailyEntries: {},
  },
};

export const ACTIONS = {
  LOADING: "loading",
  LOGIN: "login",
  LOGOUT: "logout",
  SHOW_ALERT: "show-alert",
  HIDE_ALERT: "hide-alert",
  ADD_ALL_EXERCISES: "add-all-exercise",
  ADD_ONE_EXERCISE: "add-exercise",
  SET_USER_EXERCISES: "set-user-exercises",
  DELETE_USER_EXERCISE: "remove-user-exercise",
  ADD_USER_EXERCISE: "add-user-exercise",
  UPDATE_EXERCISE: "update-exercise",
  UPDATE_USER: "update-user",
  NAVIGATE_ROUTE: "navigate-route",
  SET_ACTIVE_TAB: "set-active-tab",
  BANK_DAILY_ENTRY: "bank-daily-entry",
  SET_DAILY_ENTRIES: "set-daily-entries",
};
