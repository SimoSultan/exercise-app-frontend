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
      // case ACTIONS.UPDATE_USER_DETAILS:
      //   return {
      //     ...state,
      //     user: {
      //       ...state.user,
      //       ...payload,
      //     },
      //   };
      case ACTIONS.SET_USER_EXERCISES:
        return {
          ...state,
          user: {
            ...state.user,
            exercises: payload,
          },
          alert: {
            type: "success",
            message: "Exercises successfully updated.",
          },
        };
      case ACTIONS.DELETE_USER_EXERCISE:
        return {
          ...state,
          user: {
            ...state.user,
            exercises: state.user.exercises.filter(
              (exercise) => exercise.id !== payload
            ),
          },
          alert: {
            type: "success",
            message: "Exercise successfully deleted.",
          },
        };
      case ACTIONS.ADD_USER_EXERCISE:
        return {
          ...state,
          user: {
            ...state.user,
            exercises: [...state.user.exercises, payload],
          },
          alert: {
            type: "success",
            message: "Exercise successfully added.",
          },
        };
      case ACTIONS.SET_DAILY_ENTRIES:
        return {
          ...state,
          user: {
            ...state.user,
            dailyEntries: payload,
          },
        };
      case ACTIONS.BANK_DAILY_ENTRY:
        return {
          ...state,
          user: {
            ...state.user,
            // TODO: This is just to re-render the app for now.
            dailyEntries: {
              ...state.user.dailyEntries,
              [payload.exercise_id]:
                state.user.dailyEntries[payload.exercise_id] + payload.amount,
            },
          },
          alert: {
            type: "success",
            message: "Successfully banked entry.",
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
