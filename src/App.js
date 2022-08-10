import { useEffect, useContext } from "react";

import { FixedBottomNavigation, Header } from "./library/components/exports";
import ExerciseRouter from "./library/routes/ExerciseRouter";

import "./App.css";
import { getAllExercises } from "./library/api/api";
import { ExerciseContext } from "./library/store/context";
import { ACTIONS } from "./library/store/initialState";

function App() {
  const { dispatch } = useContext(ExerciseContext);

  useEffect(() => {
    (async () => {
      try {
        const exercises = await getAllExercises();
        dispatch({ type: ACTIONS.ADD_ALL_EXERCISES, payload: exercises });
      } catch (error) {
        dispatch({ type: ACTIONS.ERROR });
      }
    })();
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <ExerciseRouter />
      <FixedBottomNavigation />
    </div>
  );
}

export default App;
