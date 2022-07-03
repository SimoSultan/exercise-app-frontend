import { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { addNewExerciseToExercises, addNewExerciseToUser } from "../../api/api";

export default function AddUserExercise({ userID }) {
  const [showInput, setShowInput] = useState(false);
  const [newExercise, setNewExercise] = useState("");
  const [newExerciseAmount, setNewExerciseAmount] = useState(0);

  const handleSubmitExercise = async () => {
    if (newExercise.length < 1 || newExerciseAmount < 1) {
      window.alert("Please ensure you input a name and an amount.");
      return;
    }
    if (isNaN(newExerciseAmount)) {
      window.alert("Please ensure the amount is a number.");
      return;
    }

    const id = await addNewExerciseToExercises(newExercise);
    const resp = await addNewExerciseToUser(userID, {
      id,
      amount: Number(newExerciseAmount),
    });
    console.log("exercises and user updated", { resp });
    setShowInput(false);
  };

  useEffect(() => {
    if (!showInput) {
      setNewExercise("");
      setNewExerciseAmount(0);
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
          {showInput ? "Cancel" : "Add New Exercise"}
        </Button>
      </Grid>
      {showInput && (
        <>
          <Grid
            item
            container
            justifyContent="space-evenly"
            alignItems="center"
            sx={{ my: 3 }}
          >
            <Grid item xs={8}>
              <TextField
                id="new-exercise-name"
                label="New Exercise"
                variant="filled"
                value={newExercise}
                onChange={(e) => setNewExercise(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                id="filled-basic-amount"
                label="Amount"
                variant="outlined"
                value={newExerciseAmount}
                onChange={(e) => setNewExerciseAmount(e.target.value)}
                sx={{ width: "100%" }}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmitExercise}
          >
            Add New Exercise
          </Button>
        </>
      )}
    </Grid>
  );
}
