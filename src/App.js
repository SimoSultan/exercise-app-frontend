import { useEffect } from "react";
import {
  BasicAlert,
  FixedBottomNavigation,
  Header,
} from "./library/components/exports";
import ExerciseRouter from "./library/routes/ExerciseRouter";

import "./App.css";
// import { getCurrentUser, getUserExercises } from "./library/api/api";
import { useExerciseContext } from "./library/store/context";
import { ACTIONS } from "./library/store/initialState";
// import { ACTIONS } from "./library/store/initialState";

function App() {
  const { state, dispatch } = useExerciseContext();
  // const { state } = useExerciseContext();
  // const { isAuthenticated } = state;
  const { alert } = state;
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    //   (async () => {
    //     let user = {};
    //     try {
    //       // setIsLoading(true);
    //       if (isAuthenticated) return;

    //       const resp = await getCurrentUser();
    //       // TODO: Probably need a better way of validating the response than just checking if the ID exists.
    //       if (resp.status === 200 && resp.data.id) {
    //         user = { ...resp.data };
    //         dispatch({ type: ACTIONS.LOGIN, payload: resp.data });
    //       }
    //     } catch (error) {
    //       // console.log("error getting current user", error);
    //     }

    //     if (!user.routineId) return;

    //     try {
    //       const resp = await getUserExercises(user.routineId);
    //       if (resp.status === 200) {
    //         dispatch({ type: ACTIONS.SET_USER_EXERCISES, payload: resp.data });
    //       }
    //     } catch (error) {
    //       // console.log("error getting current user exercises", error);
    //     }
    //   })();
    // }, [dispatch, isAuthenticated]);
    if (process.env.REACT_APP_API_ENDPOINT === undefined)
      dispatch({ type: ACTIONS.LOGOUT });
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
