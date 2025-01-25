import { Container } from '@mui/material';
import { DailyLeaderboard, ScreenTitle } from '../components/exports';

export default function LeaderboardScreen() {
  return (
    <Container
      maxWidth='sm'
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 10,
      }}
    >
      <ScreenTitle>Leaderboard</ScreenTitle>
      <DailyLeaderboard />
    </Container>
  );
}
