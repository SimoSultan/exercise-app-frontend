import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import OutlinedInput from "@mui/material/OutlinedInput";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getExerciseName } from "../../utils/utils";

export default function UserExercises({
  allExercises,
  userExercises,
  handleExerciseAmountChange,
  handleRemoveExerciseFromUser,
}) {
  return (
    <>
      {userExercises.map(({ id, amount }) => (
        <Grid item container key={id} justifyContent="space-between" xs={12}>
          <Grid item xs={7}>
            <TextField
              variant="outlined"
              disabled={true}
              sx={{ width: "100%" }}
              value={getExerciseName(id, allExercises)}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="exercise-amount">Amount</InputLabel>
              <OutlinedInput
                id="exercise-amount"
                value={amount}
                onChange={handleExerciseAmountChange}
                label="Amount"
                disabled
              />
            </FormControl>
          </Grid>
          <Grid
            item
            xs={1}
            container
            alignItems="center"
            justifyContent="center"
          >
            <IconButton onClick={() => handleRemoveExerciseFromUser(id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
}
