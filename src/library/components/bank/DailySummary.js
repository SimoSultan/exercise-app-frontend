import { memo, useState, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import { capitalize, reduceDailyEntriesForDisplay } from '../../utils/utils';

function Summary({ loading, userExercises, userEntries }) {
  const [dailyEntries, setDailyEntries] = useState({});

  useEffect(() => {
    setDailyEntries(() => reduceDailyEntriesForDisplay(userEntries));
  }, [userEntries]);

  if (!loading && userExercises.length < 1) {
    return <Typography>No exercises available to show.</Typography>;
  }

  return userExercises.map(({ id, amount, name }) => (
    <Grid
      key={`summary-exercise-${id}`}
      container
      justifyContent='space-between'
      flexDirection='row'
      sx={{ px: 3, pb: 1 }}
    >
      <Typography>{capitalize(name)}</Typography>
      <Typography>{`${dailyEntries?.[id] ?? 0} / ${amount}`}</Typography>
    </Grid>
  ));
}

export const DailySummary = memo(Summary);
