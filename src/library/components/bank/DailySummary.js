import { memo } from "react";
import { Typography, Grid } from "@mui/material";
import { capitalize } from "../../utils/utils";
import { useExerciseContext } from "../../store/context";

function Summary({ loading }) {
  const { state } = useExerciseContext();
  const { user } = state;

  if (!loading && user.exercises.length < 1) {
    return <Typography>No exercises available to show.</Typography>;
  }

  return user.exercises.map(({ id, amount, name }) => (
    <Grid
      key={`summary-exercise-${id}`}
      container
      justifyContent="space-between"
      flexDirection="row"
      sx={{ px: 3, pb: 1 }}
    >
      <Typography>{capitalize(name)}</Typography>
      <Typography>{`${user.dailyEntries?.[id] ?? 0} / ${amount}`}</Typography>
    </Grid>
  ));
}

export const DailySummary = memo(Summary);
