import { useState } from "react";

import { Typography, Box, Grid, Button, TextField } from "@mui/material";
import { getExerciseName } from "../../utils/utils";

export default function BankInput({ dailyExercises, allExercises }) {
  return (
    <>
      <Box sx={{ width: "90%", py: 4, mt: 6 }}>
        {dailyExercises.length > 0 ? (
          dailyExercises.map((exercise, index) => (
            <Grid
              key={`bank-exercise-${exercise.id}`}
              container
              justifyContent="space-between"
              flexDirection="row"
              alignItems="center"
              sx={{ pb: 1 }}
            >
              <Typography>
                {getExerciseName(exercise.id, allExercises)}
              </Typography>
              <TextField placeholder="0" type="number" sx={{ width: "40%" }} />
            </Grid>
          ))
        ) : (
          <Typography>User has no exercises</Typography>
        )}
      </Box>
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
        onClick={() => window.alert("this currently does nothing")}
      >
        Bank All
      </Button>
    </>
  );
}
