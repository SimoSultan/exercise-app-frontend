import { useState } from "react";

import { Typography, Box, Grid, Button, TextField } from "@mui/material";
import { getExerciseName } from "../../utils/utils";
import { ACTIONS } from "../../store/initialState";
import { useExerciseContext } from "../../store/context";

export default function BankInput({ dailyExercises, allExercises }) {
  const initializeBankArray = [...Array(dailyExercises.length)].map(() => 0);
  const [bank, setBank] = useState(() => [...initializeBankArray]);
  const { dispatch } = useExerciseContext();

  const handleChange = (e, index) => {
    if (isNaN(Number(e.target.value))) return;
    let arr = [...bank];
    arr[index] = Number(e.target.value);
    setBank(() => [...arr]);
  };

  const handleSubmit = () => {
    const updatedUserExercises = dailyExercises.map(
      ({ dailyBanked, ...x }, index) => ({
        dailyBanked: (dailyBanked += bank[index]),
        ...x,
      })
    );

    dispatch({
      type: ACTIONS.BANK_USER_EXERCISE,
      payload: updatedUserExercises,
    });

    setBank(() => [...initializeBankArray]);
  };

  return (
    <>
      <Box sx={{ width: "90%", py: 4, mt: 6 }}>
        {dailyExercises.length > 0 ? (
          dailyExercises.map((exercise, index) => (
            <Grid
              key={`bank-exercise-${exercise.id}`}
              container
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
              sx={{ pb: 1 }}
            >
              <Typography>
                {getExerciseName(exercise.id, allExercises)}
              </Typography>
              <TextField
                placeholder="0"
                className="bankInput"
                sx={{ width: "40%" }}
                value={bank[index]}
                onChange={(e) => handleChange(e, index)}
              />
            </Grid>
          ))
        ) : (
          <Typography>User has no exercises</Typography>
        )}
      </Box>
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        Bank All
      </Button>
    </>
  );
}
