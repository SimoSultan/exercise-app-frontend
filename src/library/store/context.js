import React, { useReducer } from "react";
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
          error: "",
          isLoading: true,
        };
      case ACTIONS.LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
        };
      case ACTIONS.LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
        };
      case ACTIONS.ERROR:
        return {
          ...state,
          error: "An error occurred",
        };
      case ACTIONS.SET_ACTIVE_TAB:
        return {
          ...state,
          activeTab: payload,
        };
      case ACTIONS.UPDATE_USER:
        return {
          ...state,
          user: payload,
        };
      case ACTIONS.REMOVE_USER_EXERCISE:
        // const updatedUser = await removeExerciseFromUser(
        //   userProfile.id,
        //   exerciseID
        // );
        return {
          ...state,
          user: {
            ...state.user,
            exercises: payload,
          },
        };
      case ACTIONS.ADD_USER_EXERCISE:
        // const updatedUser = await removeExerciseFromUser(
        //   userProfile.id,
        //   exerciseID
        // );
        console.log(payload);
        return {
          ...state,
          user: {
            ...state.user,
            exercises: [...state.user.exercises, payload],
          },
        };
      case ACTIONS.ADD_ALL_EXERCISES:
        return {
          ...state,
          exercises: payload,
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
