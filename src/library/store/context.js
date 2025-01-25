import { useEffect, useReducer, useContext, createContext } from 'react';
import { initialState, ACTIONS } from './initialState';
import { exerciseReducer } from './reducer';
import { getCurrentUser } from '../api/api';
import { useNavigate } from 'react-router-dom';

export const ExerciseContext = createContext({});

export default function ExerciseContextProvider({ children }) {
  const [state, dispatch] = useReducer(exerciseReducer, initialState);
  const { isAuthenticated } = state;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        if (!process.env.REACT_APP_API_ENDPOINT) {
          dispatch({
            type: ACTIONS.SHOW_ALERT,
            payload: {
              type: 'error',
              message: 'Something happened and you have been logged out.',
            },
          });
          navigate('/login');
          return;
        }
        if (isAuthenticated) return;
        dispatch({ type: ACTIONS.ATTEMPTING_LOG_IN });
        const resp = await getCurrentUser();

        if (resp.status === 200 && resp.data) {
          dispatch({ type: ACTIONS.LOG_USER_IN, payload: resp.data });
        }
      } catch (error) {
        console.log(error);
        dispatch({ type: ACTIONS.LOG_USER_OUT });
      } finally {
        dispatch({ type: ACTIONS.FINISHED_LOADING });
      }
    })();
  }, [dispatch, isAuthenticated, navigate]);

  return (
    <ExerciseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExerciseContext.Provider>
  );
}

export function useExerciseContext() {
  return useContext(ExerciseContext);
}
