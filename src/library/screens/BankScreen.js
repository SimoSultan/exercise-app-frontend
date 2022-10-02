import { useEffect, useState } from "react";
import { Container, Box } from "@mui/material";
import { useExerciseContext } from "../store/context";
import { getUserEntriesDaily, getUserExercises } from "../api/api";
import {
  DailySummary,
  ScreenTitle,
  BankInput,
  Loading,
  EntriesList,
} from "../components/exports";
import { ACTIONS } from "../store/initialState";

export default function Bank() {
  const { state, dispatch } = useExerciseContext();
  const { user } = state;

  const [loadingExercises, setLoadingExercises] = useState(false);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [userExercises, setUserExercises] = useState(
    user.exercises.length < 1 ? [] : user.exercises
  );

  useEffect(() => {
    if (userExercises.length > 1) return;
    (async () => {
      try {
        setLoadingExercises(true);
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
        if (error.response.data === "no exercises found") return;
        console.log("error getting current user exercises", error);
      } finally {
        setLoadingExercises(false);
      }
    })();
  }, [userExercises, dispatch, user.routineId]);

  useEffect(() => {
    (async () => {
      if (
        loadingExercises ||
        Object.values(user.dailyEntries).length > 0 ||
        userExercises.length < 1
      )
        return;
      try {
        setLoadingEntries(true);
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
        setLoadingEntries(false);
      }
    })();
  }, [
    userExercises,
    dispatch,
    user.routineId,
    user.dailyEntries,
    loadingExercises,
  ]);

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
        {loadingExercises || loadingEntries ? (
          <Loading icon />
        ) : (
          <DailySummary loading={loadingExercises || loadingEntries} />
        )}
      </Box>
      <BankInput userID={user.id} userExercises={user.exercises} />
      <EntriesList entries={user.entries} />
    </Container>
  );
}
