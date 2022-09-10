import { useState, memo } from "react";
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
import { submitUserEntry } from "../../api/api";

function Input({ dailyExercises }) {
  const sortedDailyExercises = dailyExercises.sort((a, b) => a.order - b.order);

  const initialState = () =>
    ((arr) => {
      return arr.reduce((prev, curr) => ({ ...prev, [curr.id]: 0 }), {});
    })(sortedDailyExercises);

  const [bank, setBank] = useState({});
  const { dispatch } = useExerciseContext();

  const handleChange = (e) => {
    if (isNaN(Number(e.target.value))) return;
    setBank(() => ({ ...bank, [e.target.id]: Number(e.target.value) }));
  };

  const handleSubmit = async (exerciseId) => {
    if (!bank[exerciseId] || bank[exerciseId] < 1) {
      dispatch({
        type: ACTIONS.SHOW_ALERT,
        payload: { type: "error", message: "Must submit at least 1 entry." },
      });
      return;
    }

    try {
      const resp = await submitUserEntry(exerciseId, bank[exerciseId]);
      if (resp.status === 200) {
        dispatch({
          type: ACTIONS.BANK_USER_EXERCISE,
        });
        setTimeout(() => {
          setBank(() => initialState());
        }, 1500);
      }
    } catch (error) {
      // console.log("error adding user exercise entry", error);
    }
  };

  if (sortedDailyExercises.length < 1)
    return <Typography>User has no exercises</Typography>;

  return (
    <Box sx={{ width: "100%", mt: 6 }}>
      {sortedDailyExercises.map(({ id, name }) => (
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
              className="bankInput"
              id={id}
              value={bank[id] ?? 0}
              fullWidth
              onChange={(e) => handleChange(e)}
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
      ))}
    </Box>
  );
}

export const BankInput = memo(Input);
