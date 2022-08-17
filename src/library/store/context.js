import React, { useReducer, useContext } from "react";
import { initialState, ACTIONS } from "./initialState";

export const ExerciseContext = React.createContext();

export default function ExerciseContextProvider({ children }) {
  const [state, dispatch] = useReducer(exerciseReducer, initialState);

  function exerciseReducer(state, action) {
    const { type, payload } = action;
    switch (type) {
      case ACTIONS.LOGIN:
        return {
          ...state,
          isAuthenticated: true,
          user: {
            ...state.user,
            ...payload,
          },
          alert: {
            type: "success",
            message: "Successfully logged in.",
          },
        };
      case ACTIONS.LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: initialState.user,
          alert: {
            type: "success",
            message: "Successfully logged out.",
          },
        };
      case ACTIONS.SHOW_ALERT:
        return {
          ...state,
          alert: payload,
        };
      case ACTIONS.HIDE_ALERT:
        return {
          ...state,
          alert: {
            type: "",
            message: "",
          },
        };
      case ACTIONS.SET_ACTIVE_TAB:
        return {
          ...state,
          activeTab: payload,
        };
      case ACTIONS.UPDATE_USER:
        // const updatedUser = await updateUser(userID, payload);
        return {
          ...state,
          user: {
            ...payload,
            ...state.user,
          },
        };
      case ACTIONS.REMOVE_USER_EXERCISE:
        // const updatedUser = await removeExerciseFromUser(userID, exerciseID);
        return {
          ...state,
          user: {
            ...state.user,
            exercises: payload,
          },
        };
      case ACTIONS.ADD_USER_EXERCISE:
        // const resp = await addNewExerciseToUser(userID, payload);
        return {
          ...state,
          user: {
            ...state.user,
            exercises: [...state.user.exercises, payload],
          },
        };
      case ACTIONS.ADD_ONE_EXERCISE:
        // const id = await addNewExerciseToExercises(payload);

        return {
          ...state,
          exercises: [...state.exercises, payload],
        };
      case ACTIONS.ADD_ALL_EXERCISES:
        return {
          ...state,
          exercises: payload,
        };
      case ACTIONS.BANK_USER_EXERCISE:
        // const updatedExercises = updateUserDailyExercises(payload);
        return {
          ...state,
          user: {
            exercises: payload,
          },
        };
      default:
        return state;
    }
  }

  return (
    <ExerciseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExerciseContext() {
  return useContext(ExerciseContext);
}
