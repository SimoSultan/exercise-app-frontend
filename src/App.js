import { useEffect, useContext, useState } from "react";
import {
  BasicAlert,
  FixedBottomNavigation,
  Header,
} from "./library/components/exports";
import ExerciseRouter from "./library/routes/ExerciseRouter";

import "./App.css";
import { getAllExercises, loginUser } from "./library/api/api";
import { ExerciseContext } from "./library/store/context";
import { ACTIONS } from "./library/store/initialState";
import { useNavigate } from "react-router-dom";

function App() {
  const { state, dispatch } = useContext(ExerciseContext);
  const { alert } = state;
  const { isAuthenticated } = state;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // try {
      //   const exercises = await getAllExercises();
      //   dispatch({ type: ACTIONS.ADD_ALL_EXERCISES, payload: exercises });
      // } catch (error) {
      //   dispatch({
      //     type: ACTIONS.SHOW_ALERT,
      //     payload: {
      //       type: "error",
      //       message: {
      //         type: "error",
      //         message: "Failed to retrieve all exercises",
      //       },
      //     },
      //   });
      // }
      if (!isAuthenticated) {
        setIsLoading(true);
        const resp = await loginUser();
        console.log({ resp });
        if (resp) {
          dispatch({ type: ACTIONS.LOGIN, payload: resp });
          dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: "profile" });
          navigate("/profile");
          setIsLoading(false);
        } else {
          dispatch({
            type: ACTIONS.SHOW_ALERT,
            payload: { type: "error", message: resp },
          });
        }
      }
    })();
  }, [dispatch, navigate, isAuthenticated]);

  return (
    <div className="App">
      <Header />
      <ExerciseRouter />
      <FixedBottomNavigation />
      <BasicAlert type={alert.type} message={alert.message} />
    </div>
  );
}

export default App;
