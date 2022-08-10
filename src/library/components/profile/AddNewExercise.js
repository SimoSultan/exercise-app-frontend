import { useState, useEffect, useContext } from "react";
import { Grid, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { ACTIONS } from "../../store/initialState";
import { ExerciseContext } from "../../store/context";

export default function AddUserExercise() {
  const [showInput, setShowInput] = useState(false);
  const [newExercise, setNewExercise] = useState("");
  const { state, dispatch } = useContext(ExerciseContext);

  const handleSubmitExercise = async () => {
    if (newExercise.length < 1) {
      return window.alert("Please enter a name for the exercise.");
    }

    dispatch({
      type: ACTIONS.ADD_ONE_EXERCISE,
      payload: { id: state.exercises.length + 1, name: newExercise },
    });
    setShowInput(false);
  };

  useEffect(() => {
    if (!showInput) {
      setNewExercise("");
    }
  }, [showInput]);

  return (
    <Grid
      container
      flexDirection="column"
      sx={{ my: 4, py: 2, px: 1, border: "1px solid grey" }}
    >
      <Grid item container justifyContent="center" alignItems="center">
        <Button
          variant="outlined"
          color="secondary"
          startIcon={showInput ? <CloseIcon /> : <AddIcon />}
          onClick={() => setShowInput(!showInput)}
        >
          {showInput ? "Cancel" : "Add New Exercise Type"}
        </Button>
      </Grid>
      {showInput && (
        <>
          <Grid item sx={{ my: 3 }}>
            <TextField
              fullWidth
              id="new-exercise-name"
              label="New Exercise Name"
              variant="filled"
              value={newExercise}
              onChange={(e) => setNewExercise(e.target.value)}
              sx={{ width: "100%" }}
            />
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmitExercise}
          >
            Add New Exercise To List
          </Button>
        </>
      )}
    </Grid>
  );
}
