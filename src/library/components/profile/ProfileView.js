import { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Box,
  Typography,
  Avatar,
  Divider,
  Button,
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

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  // const [updatedUserDetails, setUpdatedUserDetails] = useState(user);
  const [userExercises, setUserExercises] = useState(user.exercises ?? []);

  useEffect(() => {
    setUserExercises(() => user.exercises.sort((a, b) => a.order - b.order));
  }, [user.exercises]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    window.alert("currently I don't work");
    // dispatch({ type: ACTIONS.UPDATE_USER, payload: user });
    // setUserExercises(() => user);
    setUnsavedChanges(false);
  };

  function handleUserInfoChange(event) {
    event.preventDefault();
    setUnsavedChanges(true);
    console.log(event.target.name, event.target.value);
  }

  const handleExerciseChange = (event) => {
    event.preventDefault();
    setUnsavedChanges(true);
    console.log(event.target.id, event.target.value);

    const [field, id] = event.target.id.split(":");
    const exercise = userExercises.find((exercise) => exercise.id === id);

    const filteredUserExercises = userExercises.filter(
      (exercise) => exercise.id !== id
    );

    const updatedExercise = {
      ...exercise,
      [field]:
        field === "amount" ? Number(event.target.value) : event.target.value,
    };

    setUserExercises(() =>
      [...filteredUserExercises, updatedExercise].sort(
        (a, b) => a.order - b.order
      )
    );
  };

  const handleRemoveExerciseFromUser = async (exerciseID) => {
    if (!window.confirm("Are you sure you want to delete this exercise?"))
      return;

    try {
      const resp = await deleteUserExercise(exerciseID);
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
              onChange={handleUserInfoChange}
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
              onChange={handleUserInfoChange}
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
              onChange={handleUserInfoChange}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Exercises</Typography>
          </Grid>
          <Grid item xs={12}>
            <UserExercises
              userExercises={userExercises}
              handleExerciseChange={handleExerciseChange}
              handleRemoveExerciseFromUser={handleRemoveExerciseFromUser}
            />
          </Grid>
          <Grid item xs={12}>
            {unsavedChanges ? (
              <Typography color="red" sx={{ py: 1 }}>
                You have unsaved changes to your exercises
              </Typography>
            ) : null}
            <Button type="submit" variant="contained">
              Update Exercises
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ py: 2 }}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Add New Exercise</Typography>
            <AddUserExercise />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
