import { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { useExerciseContext } from "../store/context";
import { getUserEntriesDaily } from "../api/api";
import {
  DailySummary,
  ScreenTitle,
  BankInput,
  Loading,
} from "../components/exports";
import { ACTIONS } from "../store/initialState";

export default function Bank() {
  const { state, dispatch } = useExerciseContext();
  const { user } = state;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.exercises.length < 1) return;

    (async () => {
      try {
        setLoading(true);
        const resp = await getUserEntriesDaily(
          user.id,
          user.exercises.map((exercise) => exercise.id)
        );
        if (resp.status === 200) {
          dispatch({
            type: ACTIONS.SET_DAILY_ENTRIES,
            payload: resp.data,
          });
          setLoading(false);
        }
      } catch (error) {
        if (
          error.response.status === 404 &&
          error.response.data === "no entries found"
        ) {
          console.log(error.response.data, error);
        }
        console.log("failed call for entries/list-batch-daily", error);
      }
    })();
  }, [user.id, user.exercises, dispatch]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingBottom: 10,
      }}
    >
      <ScreenTitle>Bank Exercises</ScreenTitle>
      <Box sx={{ width: "90%", py: 4, bgcolor: "lightgrey" }}>
        {loading ? <Loading icon /> : <DailySummary />}
      </Box>
      <BankInput userID={user.id} userExercises={user.exercises} />
    </Container>
  );
}
