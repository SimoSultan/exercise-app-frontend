import { Typography, Box, Grid } from "@mui/material";

export default function CurrentSummary({ dailyExercises }) {
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
            <Typography>Exercisesssssss</Typography>
            <Typography>{`${exercise.dailyBanked} / ${exercise.amount}`}</Typography>
          </Grid>
        ))
      ) : (
        <Typography>User has no exercises</Typography>
      )}
    </Box>
  );
}
