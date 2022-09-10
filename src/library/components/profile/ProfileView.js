import {
  TextField,
  Grid,
  Box,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import UserExercises from "./UserExercises";
import AddUserExercise from "./AddUserExercise";
import { useExerciseContext } from "../../store/context";
import { ACTIONS } from "../../store/initialState";
import { deleteUserExercise } from "../../api/api";

export default function ProfileView() {
  const { state, dispatch } = useExerciseContext();
  const { user } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // dispatch({ type: ACTIONS.UPDATE_USER, payload: user });
  };

  function handleChange(event) {
    event.preventDefault();
    console.log(event.target.name, event.target.value);
  }

  const handleExerciseNameChange = (event) => {
    event.preventDefault();
  };

  const handleExerciseAmountChange = (event) => {
    event.preventDefault();
  };

  const handleRemoveExerciseFromUser = async (exerciseID) => {
    if (!window.confirm("Are you sure you want to delete this exercise?"))
      return;

    try {
      const resp = deleteUserExercise(exerciseID);
      if (resp.status === 200) {
        dispatch({ type: ACTIONS.DELETE_USER_EXERCISE, payload: exerciseID });
      }
    } catch (error) {
      console.log("error deleting user exercise", error);
    }
  };

  return (
    <Box
      sx={{
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <PersonIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {`${user.firstName} ${user.lastName}`}
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="username"
              name="username"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
              value={user.username}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              value={user.firstName}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={user.lastName}
              onChange={handleChange}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Exercises</Typography>
          </Grid>
          <UserExercises
            userExercises={user.exercises}
            handleExerciseNameChange={handleExerciseNameChange}
            handleExerciseAmountChange={handleExerciseAmountChange}
            handleRemoveExerciseFromUser={handleRemoveExerciseFromUser}
          />
          <Grid item xs={12} sx={{ py: 2 }}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Add New Exercise</Typography>
            <AddUserExercise />
          </Grid>
        </Grid>
        {/* <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 4, mb: 2 }}
        >
          Update User Name and Exercise Amounts
        </Button> */}
      </Box>
    </Box>
  );
}
