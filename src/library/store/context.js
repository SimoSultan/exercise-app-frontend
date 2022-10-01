import { useEffect, useReducer, useContext, createContext } from "react";
import { initialState, ACTIONS } from "./initialState";
import { exerciseReducer } from "./reducer";
import { getCurrentUser } from "../api/api";

export const ExerciseContext = createContext({});

export default function ExerciseContextProvider({ children }) {
  const [state, dispatch] = useReducer(exerciseReducer, initialState);
  const { isAuthenticated, user } = state;

  useEffect(() => {
    if (process.env.REACT_APP_API_ENDPOINT === undefined) {
      dispatch({ type: ACTIONS.LOG_USER_OUT });
      return;
    }

    (async () => {
      try {
        if (isAuthenticated) return;
        dispatch({ type: ACTIONS.ATTEMPTING_LOG_IN });

        const resp = await getCurrentUser();
        console.log(resp);
        if (resp.status === 200 && resp.data) {
          dispatch({ type: ACTIONS.LOG_USER_IN, payload: resp.data });
        }
      } catch (error) {
        console.log("error getting current user", error);
        dispatch({ type: ACTIONS.LOG_USER_OUT });
      } finally {
        dispatch({ type: ACTIONS.FINISHED_LOADING });
      }
    })();
  }, [dispatch, isAuthenticated, user.exercises, user.routineId]);

  return (
    <ExerciseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExerciseContext() {
  return useContext(ExerciseContext);
}
