import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import UserExercises from "./UserExercises";
import AddNewExercise from "./AddNewExercise";
import AddUserExercise from "./AddUserExercise";
import { ExerciseContext } from "../../store/context";
import { ACTIONS } from "../../store/initialState";

export default function ProfileView() {
  const { state, dispatch } = useContext(ExerciseContext);
  const { user, exercises } = state;

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const updatedUser = await updateUser(userProfile.id, userProfile);
    // console.log("updated user", updatedUser);
  };

  function handleChange(event) {
    event.preventDefault();
    console.log(event.target.name, event.target.value);
    // setUserProfile(() => ({
    //   ...userProfile,
    //   [event.target.name]: event.target.value,
    // }));
  }

  const handleExerciseAmountChange = (event) => {
    event.preventDefault();
    // setUserProfile(() => ({
    //   ...userProfile,
    //   amount: Number(event.target.value),
    // }));
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
          <Grid item xs={12}>
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
        <AddNewExercise userID={user.id} />
      </Box>
    </Box>
  );
}
