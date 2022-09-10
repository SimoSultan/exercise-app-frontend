import { memo } from "react";
import { Typography, Box, Grid, capitalize } from "@mui/material";

function Summary({ dailyExercises, userEntries }) {
  if (dailyExercises.length < 1)
    return <Typography>User has no exercises</Typography>;

  return (
    <Box sx={{ width: "90%", py: 4, bgcolor: "lightgrey" }}>
      {dailyExercises.map(({ id, amount, name }) => (
        <Grid
          key={`summary-exercise-${id}`}
          container
          justifyContent="space-between"
          flexDirection="row"
          sx={{ px: 3, pb: 1 }}
        >
          <Typography>{capitalize(name)}</Typography>
          <Typography>{`${userEntries[id] ?? 0} / ${amount}`}</Typography>
        </Grid>
      ))}
    </Box>
  );
}

export const CurrentSummary = memo(Summary);
