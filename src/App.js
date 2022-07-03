import { useEffect, useContext } from "react";
import { Container } from "@mui/material";

import {
  FixedBottomNavigation,
  Header,
  Footer,
} from "./library/components/exports";
import ExerciseRouter from "./library/routes/ExerciseRouter";

import {
  BOTTOM_NAVIGATION_HEIGHT,
  HEADER_HEIGHT,
  FOOTER_HEIGHT,
} from "./library/styles/styles";
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
      <Container
        maxWidth="sm"
        sx={{
          minHeight: `calc(100vh - ${
            BOTTOM_NAVIGATION_HEIGHT + HEADER_HEIGHT + FOOTER_HEIGHT
          }px)`,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ExerciseRouter />
      </Container>
      <Footer />
      <FixedBottomNavigation />
    </div>
  );
}

export default App;
