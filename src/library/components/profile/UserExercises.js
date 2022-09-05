import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function UserExercises({
  userExercises,
  handleExerciseNameChange,
  handleExerciseAmountChange,
  handleRemoveExerciseFromUser,
}) {
  return (
    <>
      {userExercises.map(({ id, name, amount, unit }) => (
        <Grid
          item
          container
          key={name}
          justifyContent="space-between"
          xs={12}
          spacing={1}
        >
          <Grid item xs={5}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="exercise-name">Name</InputLabel>
              <OutlinedInput
                id="exercise-name"
                value={name}
                label="Name"
                onChange={handleExerciseNameChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="exercise-amount">Amount</InputLabel>
              <OutlinedInput
                id="exercise-amount"
                value={amount}
                onChange={handleExerciseAmountChange}
                label="Amount"
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel htmlFor="exercise-unit">Unit</InputLabel>
              <OutlinedInput id="exercise-unit" value={unit} label="Amount" />
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
