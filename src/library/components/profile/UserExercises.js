import {
  IconButton,
  OutlinedInput,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Loading } from "../exports";

export default function UserExercises({
  userExercises,
  handleExerciseChange,
  handleRemoveExerciseFromUser,
  loading,
}) {
  return loading ? (
    <Loading />
  ) : (
    userExercises.map(({ id, name, amount, unit }) => (
      <Grid
        item
        container
        key={id}
        justifyContent="space-between"
        xs={12}
        spacing={1}
        sx={{ mb: 2 }}
      >
        <Grid item xs={5}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor={`name:${id}`}>Name</InputLabel>
            <OutlinedInput
              id={`name:${id}`}
              value={name}
              label="Name"
              onChange={handleExerciseChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor={`amount:${id}`}>Amount</InputLabel>
            <OutlinedInput
              id={`amount:${id}`}
              value={amount}
              onChange={handleExerciseChange}
              label="Amount"
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel htmlFor={`unit:${id}`}>Unit</InputLabel>
            <OutlinedInput
              id={`unit:${id}`}
              value={unit}
              label="Amount"
              onChange={handleExerciseChange}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1} container alignItems="center" justifyContent="center">
          <IconButton onClick={() => handleRemoveExerciseFromUser(id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Grid>
      </Grid>
    ))
  );
}
