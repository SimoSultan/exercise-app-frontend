import { useEffect, useState, useCallback } from "react";
import { Typography, Container } from "@mui/material";
import { useExerciseContext } from "../store/context";
import CurrentSummary from "../components/bank/CurrentSummary";
import BankInput from "../components/bank/BankInput";
import { getUserEntry } from "../api/api";
import { ACTIONS } from "../store/initialState";

export default function Bank() {
  const { state, dispatch } = useExerciseContext();
  const { user } = state;
  // const [isLoading, setIsLoading] = useState(false);
  const [userEntries, setUserEntries] = useState([]);
  const [userExercisesWithEntries, setUserExercisesWithEntries] = useState([]);

  const updateUserExercises = useCallback(() => {
    user.exercises.forEach((exercise) => {
      const userEntry =
        userEntries.find((entry) => entry.exerciseId === exercise.id) ?? null;

      if (userEntry) {
        setUserExercisesWithEntries(() => [
          ...userExercisesWithEntries,
          {
            ...exercise,
            progress: userEntry.amount,
            completed: userEntry.completedAt,
            created: userEntry.createdAt,
          },
        ]);
      }
    });
  }, [user.exercises, userExercisesWithEntries, userEntries]);

  useEffect(() => {
    if (user.exercises.length < 1) return;

    user.exercises.forEach((exercise, index) => {
      (async () => {
        try {
          const resp = await getUserEntry(exercise.id);
          if (resp.status === 200) {
            setUserEntries(() => [...userEntries, resp.data]);
          }
        } catch (error) {
          console.log("error getting current user exercise entry", error);
        }
      })();

      // ONLY UPDATE USER EXERCISES AFTER ALL ENTRIES HAVE BEEN FOUND
      if (index === user.exercises.length - 1) {
        void updateUserExercises();
      }
    });
  }, [user.exercises, userEntries, updateUserExercises]);

  useEffect(() => {
    if (userExercisesWithEntries.length === user.exercises.length) {
      dispatch({
        type: ACTIONS.SET_USER_EXERCISES,
        payload: userExercisesWithEntries,
      });
    }
  }, [dispatch, userExercisesWithEntries, user.exercises]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" sx={{ py: 3 }}>
        Bank Daily Exercises
      </Typography>
      <CurrentSummary dailyExercises={user.exercises} />
      <BankInput dailyExercises={user.exercises} />
    </Container>
  );
}
