import { useState } from "react";
import { Grid, TextField } from "@mui/material";

import { useExerciseContext } from "../../store/context";
import { ACTIONS } from "../../store/initialState";
import { createUserExercise } from "../../api/api";
import { SubmitButton } from "../exports";

const initialState = {
  name: "",
  amount: 0,
  unit: "reps",
};

export default function AddUserExercise() {
  const [exerciseDetails, setExerciseDetails] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { state, dispatch } = useExerciseContext();
  const { user } = state;

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.name === "amount") {
      const num = Number(e.target.value);
      setExerciseDetails((prev) => ({
        ...prev,
        [e.target.name]: isNaN(num) ? "" : num,
      }));
      return;
    }

    setExerciseDetails((prev) => ({
      ...prev,
      [e.target.name]: String(e.target.value),
    }));
  };

  const handleSubmitExercise = async () => {
    if (exerciseDetails.name.length < 1) {
      return window.alert("Please enter an exercise.");
    }
    if (isNaN(exerciseDetails.amount) || exerciseDetails.amount < 1) {
      return window.alert("Please ensure the amount is a number.");
    }

    try {
      setIsLoading(true);
      const resp = await createUserExercise(
        user.routineId,
        exerciseDetails,
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
        setExerciseDetails(initialState);
      }
    } catch (error) {
      // console.log("error creating user exercise", error);
    } finally {
      setIsLoading(false);
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
            name="name"
            variant="outlined"
            value={exerciseDetails.name}
            onChange={handleChange}
            required
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Amount"
            variant="outlined"
            name="amount"
            value={exerciseDetails.amount}
            onChange={handleChange}
            required
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            label="Units"
            variant="outlined"
            name="unit"
            value={exerciseDetails.unit}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
        </Grid>
      </Grid>

      <SubmitButton
        variant="outlined"
        handleSubmit={handleSubmitExercise}
        isLoading={isLoading}
        isDisabled={
          exerciseDetails.name === "" ||
          exerciseDetails.amount === "" ||
          exerciseDetails.unit === ""
        }
        style={{ mt: 3 }}
      >
        Submit New Exercise
      </SubmitButton>
    </>
  );
}
