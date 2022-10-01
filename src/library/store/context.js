import { useEffect, useReducer, useContext, createContext } from "react";
import { initialState, ACTIONS } from "./initialState";
import { exerciseReducer } from "./reducer";
import { getCurrentUser } from "../api/api";

export const ExerciseContext = createContext({});

export default function ExerciseContextProvider({ children }) {
  const [state, dispatch] = useReducer(exerciseReducer, initialState);
  const { isAuthenticated, user } = state;
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_API_ENDPOINT === undefined) {
      console.log("herrrooooo");
      dispatch({ type: ACTIONS.LOGOUT });
      return;
    }

    (async () => {
      try {
        if (isAuthenticated) return;

        const resp = await getCurrentUser();
        // TODO: Probably need a better way of validating the response than just checking if the ID exists.
        if (resp.status === 200 && resp.data.id) {
          dispatch({ type: ACTIONS.LOGIN, payload: resp.data });
        }
      } catch (error) {
        console.log("error getting current user", error);
        console.log("herrrooooo youuuuu");
        dispatch({ type: ACTIONS.LOGOUT });
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
