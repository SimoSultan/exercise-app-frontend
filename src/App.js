import { useEffect, useContext, useState } from "react";
import {
  BasicAlert,
  FixedBottomNavigation,
  Header,
} from "./library/components/exports";
import ExerciseRouter from "./library/routes/ExerciseRouter";

import "./App.css";
import { getAllExercises, getCurrentUser } from "./library/api/api";
import { ExerciseContext } from "./library/store/context";
import { ACTIONS } from "./library/store/initialState";

function App() {
  const { state, dispatch } = useContext(ExerciseContext);
  const { alert } = state;
  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      const resp = await getCurrentUser();
      // TODO: Probably need a better way of validating the response than just checking if the ID exists.
      if (resp.status === 200 && resp.data.id) {
        dispatch({ type: ACTIONS.LOGIN, payload: resp.data });
        setIsLoading(false);
      }
    })();
  }, [dispatch]);

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
