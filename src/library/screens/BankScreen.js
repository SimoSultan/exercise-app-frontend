import { useEffect, useState } from "react";
import { Typography, Container } from "@mui/material";
import { useExerciseContext } from "../store/context";
import { CurrentSummary } from "../components/bank/CurrentSummary";
import { BankInput } from "../components/bank/BankInput";
import { getUserEntry } from "../api/api";

export default function Bank() {
  const { state } = useExerciseContext();
  const { user } = state;
  // const [isLoading, setIsLoading] = useState(false);
  const [userEntries, setUserEntries] = useState({});

  const getUserEntriesForExercise = async (exerciseId) => {
    try {
      const resp = await getUserEntry(exerciseId);
      if (resp.status === 200) return resp.data;
    } catch (error) {
      if (
        error.response.status === 404 &&
        error.response.data === "no entries found"
      ) {
        return null;
      }
      console.log("error getting current user exercise entry", error);
    }
  };

  useEffect(() => {
    if (
      user.exercises.length < 1 ||
      user.exercises.length === userEntries.length ||
      userEntries === []
    )
      return;

    (async () => {
      for await (const exercise of user.exercises) {
        const entries = await getUserEntriesForExercise(exercise.id);
        if (entries !== null) {
          const subtotal = entries.reduce(
            (prev, curr) => prev + curr.amount,
            0
          );
          setUserEntries((prev) => ({
            ...prev,
            [exercise.id]: subtotal,
          }));
        }
      }
    })();
  }, [user.exercises, userEntries]);

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
      <CurrentSummary
        dailyExercises={user.exercises}
        userEntries={userEntries}
      />
      <BankInput dailyExercises={user.exercises} />
    </Container>
  );
}
