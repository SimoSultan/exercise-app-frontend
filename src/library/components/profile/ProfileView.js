import { TextField, Grid, Box, Typography, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

import UserExercises from "./UserExercises";
import AddNewExercise from "./AddNewExercise";
import AddUserExercise from "./AddUserExercise";
import { useExerciseContext } from "../../store/context";
import { ACTIONS } from "../../store/initialState";

export default function ProfileView() {
  const { state, dispatch } = useExerciseContext();
  const { user, exercises } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // dispatch({ type: ACTIONS.UPDATE_USER, payload: user });
  };

  function handleChange(event) {
    event.preventDefault();
    console.log(event.target.name, event.target.value);
  }

  const handleExerciseAmountChange = (event) => {
    event.preventDefault();
  };

  const handleRemoveExerciseFromUser = async (exerciseID) => {
    if (!window.confirm("Are you sure you want to delete this exercise?"))
      return;

    const userExercises = user.exercises.filter((ex) => ex.id !== exerciseID);
    dispatch({ type: ACTIONS.REMOVE_USER_EXERCISE, payload: userExercises });
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
          {user.exercises.length > 0 && (
            <UserExercises
              allExercises={exercises}
              userExercises={user.exercises}
              handleExerciseAmountChange={handleExerciseAmountChange}
              handleRemoveExerciseFromUser={handleRemoveExerciseFromUser}
            />
          )}
          <Grid item xs={12}>
            {user.exercises.length === exercises.length ? (
              <Typography>No new (different) exercises to add.</Typography>
            ) : (
              <AddUserExercise />
            )}
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
        <AddNewExercise userID={user.id} />
      </Box>
    </Box>
  );
}
