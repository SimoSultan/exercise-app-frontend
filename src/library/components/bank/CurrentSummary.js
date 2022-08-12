import { Typography, Box, Grid } from "@mui/material";

import { getExerciseName } from "../../utils/utils";

export default function CurrentSummary({ allExercises, dailyExercises }) {
  return (
    <Box sx={{ width: "90%", py: 4, bgcolor: "lightgrey" }}>
      {dailyExercises.length > 0 ? (
        dailyExercises.map((exercise, index) => (
          <Grid
            key={`summary-exercise-${exercise.id}`}
            container
            justifyContent="space-between"
            flexDirection="row"
            sx={{ px: 3, pb: 1 }}
          >
            <Typography>
              {getExerciseName(exercise.id, allExercises)}
            </Typography>
            <Typography>{`${exercise.dailyBanked} / ${exercise.amount}`}</Typography>
          </Grid>
        ))
      ) : (
        <Typography>User has no exercises</Typography>
      )}
    </Box>
  );
}
