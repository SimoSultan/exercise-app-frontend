import { useEffect, useState } from "react";
import {
  BasicAlert,
  FixedBottomNavigation,
  Header,
} from "./library/components/exports";
import ExerciseRouter from "./library/routes/ExerciseRouter";

import "./App.css";
import { getCurrentUser } from "./library/api/api";
import { useExerciseContext } from "./library/store/context";
import { ACTIONS } from "./library/store/initialState";

function App() {
  const { state, dispatch } = useExerciseContext();
  const { alert } = state;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const resp = await getCurrentUser();
        // TODO: Probably need a better way of validating the response than just checking if the ID exists.
        if (resp.status === 200 && resp.data.id) {
          dispatch({ type: ACTIONS.LOGIN, payload: resp.data });
        }
      } catch (error) {
        console.log("error getting current user", error);
      } finally {
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
