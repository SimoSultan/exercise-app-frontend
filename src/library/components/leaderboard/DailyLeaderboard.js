import { useEffect, useState } from 'react';
import { Grid, Typography, Avatar } from '@mui/material';
import { getDailyLeaderboard } from '../../api/api';
import { useExerciseContext } from '../../store/context';
import { Loading } from '../exports';
import { ACTIONS } from '../../store/initialState';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function DailyLeaderboard() {
  const { state, dispatch } = useExerciseContext();
  const { leaderboard } = state;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (leaderboard.length > 0) return;
    (async () => {
      try {
        setLoading(true);
        const resp = await getDailyLeaderboard();
        if (resp.status === 200) {
          dispatch({
            type: ACTIONS.SET_LEADERBOARD,
            payload: Object.values(resp.data),
          });
        }
      } catch (error) {
        console.log('error getting leaderboard', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [leaderboard, dispatch]);

  if (!loading && leaderboard.length < 1) return;
  <Typography>No users to display</Typography>;

  return (
    <Grid
      container
      flexDirection='column'
      sx={{
        my: 2,
        p: 3,
        width: '95%',
        minHeight: '35vh',
        height: 'fit-content',
        bgcolor: 'lightgrey',
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        leaderboard.map((entry) => (
          <LeaderboardItem
            key={entry.userId}
            entry={entry}
          />
        ))
      )}
    </Grid>
  );
}

const LeaderboardItem = ({ entry }) => {
  const { firstName, lastName, percentage, picture } = entry;
  const percentageToShow =
    Number(percentage) * 100 === 100
      ? 100
      : (Number(percentage) * 100).toFixed(1);
  return (
    <Grid
      item
      container
      justifyContent='space-evenly'
      alignItems='center'
      sx={{ py: 1 }}
      xs={12}
    >
      <Grid
        item
        container
        alignItems='center'
        justifyContent='flex-start'
        xs={9}
      >
        <Avatar
          sx={{ bgcolor: 'secondary.main', width: 32, height: 32, mr: 2 }}
          alt={`${firstName} ${lastName} avatar`}
          src={picture}
          imgProps={{ referrerPolicy: 'no-referrer' }}
        >
          {/* fallback below */}
          {firstName[0]}
        </Avatar>

        <Typography variant='body1'>{firstName}</Typography>
        {percentageToShow === 100 ? (
          <CheckCircleIcon sx={{ color: 'green', ml: 1 }} />
        ) : null}
      </Grid>
      <Grid
        item
        xs={3}
      >
        <Typography variant='body1'>{percentageToShow}%</Typography>
      </Grid>
    </Grid>
  );
};
