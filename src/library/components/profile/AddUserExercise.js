import { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

import { useExerciseContext } from "../../store/context";
import { ACTIONS } from "../../store/initialState";
import { createUserExercise } from "../../api/api";

export default function AddUserExercise() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("reps");
  const { state, dispatch } = useExerciseContext();
  const { user } = state;

  const handleSubmitExercise = async () => {
    if (name.length < 1) {
      return window.alert("Please enter an exercise.");
    }
    if (isNaN(amount) || amount < 1) {
      return window.alert("Please ensure the amount is a number.");
    }

    try {
      const resp = await createUserExercise(
        user.routineId,
        name,
        Number(amount),
        unit,
        user.exercises.length + 1
      );
      if (resp.status === 200) {
        const { id, name, amount, order, unit } = resp.data;
        dispatch({
          type: ACTIONS.ADD_USER_EXERCISE,
          payload: {
            id,
            routineId: user.routineId,
            name,
            amount,
            order,
            unit,
          },
        });
        setName("");
        setAmount("");
        setUnit("");
      }
    } catch (error) {
      // console.log("error creating user exercise", error);
    }
  };

  return (
    <>
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={6}>
          <TextField
            label="Exercise Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Amount"
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Units"
            variant="outlined"
            value={unit}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleSubmitExercise}
        sx={{ mt: 2 }}
      >
        Submit New Exercise
      </Button>
    </>
  );
}
