import { useEffect, useState } from 'react';
import { Typography, Button, Grid } from '@mui/material';
import { getUserLeaderboard } from '../../api/api';
import { LEADERBOARD_STREAK_ENABLED } from '../../constants';
import { useExerciseContext } from '../../store/context';
import { SectionTitle } from '../exports';

export default function UserLeaderboardStreak() {
  const { state } = useExerciseContext();
  const { user, isAuthenticated } = state;
  const [daysRequested, setDaysRequested] = useState(7);

  useEffect(() => {
    if (!LEADERBOARD_STREAK_ENABLED) return;

    (async () => {
      try {
        if (!isAuthenticated || !user.id) return;
        await getUserLeaderboard(user.id, daysRequested);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isAuthenticated, user.id, daysRequested]);

  if (!LEADERBOARD_STREAK_ENABLED) return null;

  return (
    <>
      <SectionTitle>LeaderboardStreak</SectionTitle>
      <Typography>Requesting for {daysRequested} days</Typography>
      <Grid
        container
        justifyContent='space-around'
      >
        <Button
          variant='contained'
          onClick={() => setDaysRequested(7)}
        >
          Show 7 Days
        </Button>
        <Button
          variant='contained'
          onClick={() => setDaysRequested(30)}
        >
          Show 30 Days
        </Button>
      </Grid>
    </>
  );
}
