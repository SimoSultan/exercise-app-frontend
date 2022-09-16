import { useState, useEffect } from "react";
import {
  TextField,
  Grid,
  Box,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";

import UserExercises from "./UserExercises";
import AddUserExercise from "./AddUserExercise";
import { useExerciseContext } from "../../store/context";
import { ACTIONS } from "../../store/initialState";
import { deleteUserExercise, updateUserExerciseBatch } from "../../api/api";
import { SubmitButton } from "../exports";
import { arraysEqual } from "../../utils/utils";

export default function ProfileView() {
  const { state, dispatch } = useExerciseContext();
  const { user } = state;

  const [loading, setLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [userExercises, setUserExercises] = useState(user.exercises ?? []);

  useEffect(() => {
    setUserExercises(() => user.exercises.sort((a, b) => a.order - b.order));
  }, [user.exercises]);

  useEffect(() => {
    if (!hasUnsavedChanges) return;
    if (arraysEqual(user.exercises, userExercises)) {
      setHasUnsavedChanges(false);
    }
  }, [hasUnsavedChanges, user.exercises, userExercises]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const resp = await updateUserExerciseBatch(userExercises);
      console.log({ resp });
      if (resp.status === 200) {
        setTimeout(() => {
          dispatch({ type: ACTIONS.SET_USER_EXERCISES, payload: resp.data });
          setLoading(false);
          setHasUnsavedChanges(false);
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: ACTIONS.SHOW_ALERT,
        payload: {
          type: "error",
          message: "Something went wrong. Exercises were not updated.",
        },
      });
      setLoading(false);
      return;
    }
  };

  function handleUserInfoChange(event) {
    event.preventDefault();
    setHasUnsavedChanges(true);
  }

  const handleExerciseChange = (event) => {
    event.preventDefault();
    setHasUnsavedChanges(true);

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
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} alt={user.firstName}>
        {user.firstName[0]}
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
            <Typography variant="h6">Your Exercises</Typography>
          </Grid>
          <Grid item xs={12}>
            <UserExercises
              userExercises={userExercises}
              handleExerciseChange={handleExerciseChange}
              handleRemoveExerciseFromUser={handleRemoveExerciseFromUser}
            />
          </Grid>
          <Grid item xs={12}>
            <SubmitButton
              variant="contained"
              isLoading={loading}
              isDisabled={!hasUnsavedChanges}
              handleSubmit={handleSubmit}
            >
              Update Exercises
            </SubmitButton>
          </Grid>
          <Grid item xs={12} sx={{ py: 2 }}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Add New Exercise</Typography>
          </Grid>
          <Grid item xs={12}>
            <AddUserExercise />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
