import { Typography, Box, Grid, capitalize } from "@mui/material";

export default function CurrentSummary({ dailyExercises }) {
  return (
    <Box sx={{ width: "90%", py: 4, bgcolor: "lightgrey" }}>
      {dailyExercises.length > 0 ? (
        dailyExercises.map(({ id, amount, name, progress = 0 }, index) => (
          <Grid
            key={`summary-exercise-${id}`}
            container
            justifyContent="space-between"
            flexDirection="row"
            sx={{ px: 3, pb: 1 }}
          >
            <Typography>{capitalize(name)}</Typography>
            <Typography>{`${progress} / ${amount}`}</Typography>
          </Grid>
        ))
      ) : (
        <Typography>User has no exercises</Typography>
      )}
    </Box>
  );
}
