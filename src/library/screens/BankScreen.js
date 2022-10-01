import { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { useExerciseContext } from "../store/context";
import { getUserEntriesDaily, getUserExercises } from "../api/api";
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
  const [userExercises, setUserExercises] = useState(
    user.exercises.length < 1 ? [] : user.exercises
  );

  useEffect(() => {
    if (userExercises.length < 1) {
      (async () => {
        try {
          setLoading(true);
          const resp = await getUserExercises(user.routineId);
          if (resp.status === 200) {
            const sortedExercises = resp.data.sort((a, b) => a.order - b.order);
            setUserExercises(sortedExercises);
            dispatch({
              type: ACTIONS.SET_USER_EXERCISES,
              payload: sortedExercises,
            });
          }
        } catch (error) {
          console.log("error getting current user exercises", error);
        }
      })();
    }

    (async () => {
      if (
        userExercises.length < 1 ||
        Object.values(user.dailyEntries).length > 0
      )
        return;
      try {
        setLoading(true);
        const resp = await getUserEntriesDaily(
          userExercises.map((exercise) => exercise.id)
        );
        if (resp.status === 200) {
          dispatch({
            type: ACTIONS.SET_DAILY_ENTRIES,
            payload: resp.data,
          });
        }
      } catch (error) {
        if (
          error.response.status === 404 &&
          error.response.data === "no entries found"
        ) {
          console.log(error.response.data, error);
        }
        console.log("failed call for entries/list-batch-daily", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [user.id, userExercises, dispatch, user.routineId, user.dailyEntries]);

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
        {loading ? <Loading icon /> : <DailySummary loading={loading} />}
      </Box>
      <BankInput userID={user.id} userExercises={user.exercises} />
    </Container>
  );
}
