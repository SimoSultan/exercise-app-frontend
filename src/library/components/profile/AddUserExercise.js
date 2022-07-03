import { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
  Button,
} from "@mui/material";

import { ExerciseContext } from "../../store/context";
import { ACTIONS } from "../../store/initialState";

export default function AddUserExercise() {
  const DEFAULT_SELECT_VALUE = 0;
  const [newExerciseID, setNewExerciseID] = useState(DEFAULT_SELECT_VALUE);
  const [newExerciseAmount, setNewExerciseAmount] = useState(0);
  const { state, dispatch } = useContext(ExerciseContext);
  const { user, exercises } = state;

  function userExercisesExists(id) {
    return user.exercises.some((el) => el.id === id);
  }

  const handleSubmitExercise = async () => {
    if (newExerciseID < 1) {
      return window.alert("Please select an exercise.");
    }
    if (isNaN(newExerciseAmount) || newExerciseAmount < 1) {
      return window.alert("Please ensure the amount is a number.");
    }
    dispatch({
      type: ACTIONS.ADD_USER_EXERCISE,
      payload: { id: newExerciseID, amount: newExerciseAmount },
    });
    setNewExerciseID(0);
    setNewExerciseAmount(0);
  };

  return (
    <>
      <Grid item container justifyContent="space-between" alignItems="center">
        <Grid item xs={7}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor="exercise-select-label">Exercise</InputLabel>
            <Select
              labelId="exercise-select-label"
              id="exercise-select"
              label="Exercise"
              value={newExerciseID}
              defaultValue={DEFAULT_SELECT_VALUE}
              onChange={(e) => setNewExerciseID(e.target.value)}
            >
              <MenuItem key={0} value={DEFAULT_SELECT_VALUE} disabled>
                New exercise
              </MenuItem>
              {exercises.map(({ id, name }) => (
                <MenuItem
                  key={id}
                  value={id}
                  disabled={userExercisesExists(id)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="filled-basic-amount"
            label="Amount"
            variant="outlined"
            value={newExerciseAmount}
            onChange={(e) => setNewExerciseAmount(Number(e.target.value))}
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid
          item
          xs={1}
          container
          alignItems="center"
          justifyContent="center"
        />
      </Grid>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleSubmitExercise}
        sx={{ mt: 2 }}
      >
        Submit New User Exercise
      </Button>
    </>
  );
}
