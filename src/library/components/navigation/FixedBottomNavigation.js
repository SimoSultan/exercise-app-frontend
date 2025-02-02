import { Link } from 'react-router-dom';

import AddTaskIcon from '@mui/icons-material/AddTask';
import HomeIcon from '@mui/icons-material/Home';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import PersonIcon from '@mui/icons-material/Person';
import { Grid, IconButton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import { useExerciseContext } from '../../store/context';
import { BOTTOM_NAVIGATION_HEIGHT, Z_INDEXES } from '../../styles/styles';

export default function FixedBottomNavigation() {
  const { state } = useExerciseContext();
  const { activeTab } = state;

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: Z_INDEXES.BOTTOM_NAVIGATION,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: BOTTOM_NAVIGATION_HEIGHT,
        }}
      >
        <Grid
          container
          justifyContent='space-evenly'
          alignItems='center'
        >
          <Grid item>
            <Link
              to='/'
              style={{
                textDecoration: 'none',
                color: 'inherit',
                userSelect: 'none',
              }}
            >
              <IconButton
                color='inherit'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <HomeIcon color={activeTab === 'home' ? 'primary' : ''} />
                <Typography
                  variant='button'
                  color={activeTab === 'home' ? 'primary' : ''}
                >
                  Home
                </Typography>
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link
              to='profile'
              style={{
                textDecoration: 'none',
                color: 'inherit',
                userSelect: 'none',
              }}
            >
              <IconButton
                color='inherit'
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <PersonIcon color={activeTab === 'profile' ? 'primary' : ''} />
                <Typography
                  variant='button'
                  color={activeTab === 'profile' ? 'primary' : ''}
                >
                  Profile
                </Typography>
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link
              to='bank'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <IconButton
                color='inherit'
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <AddTaskIcon color={activeTab === 'bank' ? 'primary' : ''} />
                <Typography
                  variant='button'
                  color={activeTab === 'bank' ? 'primary' : ''}
                >
                  Bank
                </Typography>
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link
              to='leaderboard'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <IconButton
                color='inherit'
                sx={{ display: 'flex', flexDirection: 'column' }}
              >
                <LeaderboardIcon
                  color={activeTab === 'leaderboard' ? 'primary' : ''}
                />
                <Typography
                  variant='button'
                  color={activeTab === 'leaderboard' ? 'primary' : ''}
                >
                  Leaderboard
                </Typography>
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
