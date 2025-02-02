import { memo, useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  CircularProgress,
  Fab,
  Grid,
  TextField,
  Typography,
  capitalize,
} from '@mui/material';

import { submitExerciseEntry } from '../../api/api';
import { useExerciseContext } from '../../store/context';
import { ACTIONS } from '../../store/initialState';
import { Z_INDEXES } from '../../styles/styles';

function Input({ userID, userExercises = [] }) {
  const sortedUserExercises = userExercises.sort((a, b) => a.order - b.order);
  const [isLoading, setIsLoading] = useState(false);
  // const initialState = () =>
  //   ((arr) => {
  //     return arr.reduce((prev, curr) => ({ ...prev, [curr.id]: 0 }), {});
  //   })(sortedUserExercises);

  const [bank, setBank] = useState({});
  const { dispatch } = useExerciseContext();

  const handleChange = (e) => {
    if (isNaN(Number(e.target.value))) return;
    setBank(() => ({ ...bank, [e.target.id]: Number(e.target.value) }));
  };

  const handleSubmit = async (exerciseId) => {
    if (!bank[exerciseId] || bank[exerciseId] < 1) {
      dispatch({
        type: ACTIONS.SHOW_ALERT,
        payload: { type: 'error', message: 'Must submit at least 1 entry.' },
      });
      return;
    }

    try {
      setIsLoading(true);
      const resp = await submitExerciseEntry(exerciseId, bank[exerciseId]);
      if (resp.status === 200) {
        dispatch({
          type: ACTIONS.BANK_DAILY_ENTRY,
          payload: resp.data,
        });
        setTimeout(() => {
          setBank((prev) => ({ ...prev, [exerciseId]: 0 }));
        }, 1500);
      }
    } catch (error) {
      console.log('submitExerciseEntry', error);
      dispatch({
        type: ACTIONS.SHOW_ALERT,
        payload: {
          type: 'error',
          message: 'Something went wrong. Entry not submitted.',
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 6 }}>
      {sortedUserExercises.map(({ id, name }) => (
        <Grid
          key={`bank-exercise-${id}`}
          container
          item
          justifyContent='space-evenly'
          flexDirection='row'
          alignItems='center'
          sx={{ px: 1, pb: 2 }}
          xs={12}
          spacing={1}
        >
          <Grid
            item
            container
            xs={5}
          >
            <Typography>{capitalize(name)}</Typography>
          </Grid>
          <Grid
            item
            xs={4}
          >
            <TextField
              className='bankInput'
              id={id}
              value={bank[id] ?? 0}
              fullWidth
              inputProps={{ inputMode: 'numeric' }}
              onChange={(e) => handleChange(e)}
            />
          </Grid>
          <Grid
            item
            container
            justifyContent='flex-end'
            xs={3}
          >
            <Fab
              color='primary'
              aria-label='bank exercise'
              onClick={() => handleSubmit(id)}
              sx={{ zIndex: Z_INDEXES.BANK_INPUT }}
            >
              {isLoading ? (
                <CircularProgress
                  color='inherit'
                  size={24}
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              ) : (
                <AddIcon />
              )}
            </Fab>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}

export const BankInput = memo(Input);
