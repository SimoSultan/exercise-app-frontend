import { useState } from "react";
import { Button, Typography, Container } from "@mui/material";
import { getPing, postEcho } from "../api/api";
import { useExerciseContext } from "../store/context";
import CurrentSummary from "../components/bank/CurrentSummary";
import BankInput from "../components/bank/BankInput";

// import { ACTIONS } from "../../store/initialState";

const debug = false;

export default function Bank() {
  const [response, setResponse] = useState(null);
  const { state } = useExerciseContext();
  const { user, exercises } = state;
  // DEBUG FUNCTIONS
  async function handleClickPing() {
    const resp = await getPing();
    setResponse(JSON.stringify(resp));
  }

  async function handleClickEcho() {
    const resp = await postEcho({
      firstName: "Fred",
      lastName: "Flintstone",
    });
    setResponse(JSON.stringify(resp));
  }

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
        allExercises={exercises}
        dailyExercises={user.exercises}
      />

      <BankInput dailyExercises={user.exercises} allExercises={exercises} />
      {debug ? (
        <>
          <Button variant="contained" onClick={handleClickPing}>
            Ping
          </Button>
          <Button variant="contained" onClick={handleClickEcho}>
            Echo
          </Button>
          <div>{response}</div>
        </>
      ) : null}
    </Container>
  );
}
