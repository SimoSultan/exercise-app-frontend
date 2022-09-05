import { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  capitalize,
} from "@mui/material";
import { ACTIONS } from "../../store/initialState";
import { useExerciseContext } from "../../store/context";

export default function BankInput({ dailyExercises }) {
  const initializeBankArray = [...Array(dailyExercises.length)].map(() => 0);
  const [bank, setBank] = useState(() => [...initializeBankArray]);
  const { dispatch } = useExerciseContext();

  const handleChange = (e, index) => {
    if (isNaN(Number(e.target.value))) return;
    let arr = [...bank];
    arr[index] = Number(e.target.value);
    setBank(() => [...arr]);
  };

  const handleSubmit = (exerciseId) => {
    const updatedUserExercises = dailyExercises.map(
      ({ dailyBanked, ...x }, index) => ({
        dailyBanked: (dailyBanked += bank[index]),
        ...x,
      })
    );

    console.log(updatedUserExercises);

    try {
      // const resp = submitUserExerciseEntry(exerciseId, amount)
    } catch (error) {
      console.log("error adding user exercise entry", error);
    }

    dispatch({
      type: ACTIONS.BANK_USER_EXERCISE,
      payload: updatedUserExercises,
    });

    setBank(() => [...initializeBankArray]);
  };

  return (
    <Box sx={{ width: "100%", mt: 6 }}>
      {dailyExercises.length > 0 ? (
        dailyExercises.map(({ id, name }, index) => (
          <Grid
            key={`bank-exercise-${id}`}
            container
            item
            justifyContent="space-evenly"
            flexDirection="row"
            alignItems="center"
            sx={{ px: 1, pb: 1 }}
            xs={12}
            spacing={1}
          >
            <Grid item container xs={5}>
              <Typography>{capitalize(name)}</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                placeholder="0"
                className="bankInput"
                value={bank[index]}
                fullWidth
                onChange={(e) => handleChange(e, index)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                size="large"
                onClick={() => handleSubmit(id)}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        ))
      ) : (
        <Typography>User has no exercises</Typography>
      )}
    </Box>
  );
}
