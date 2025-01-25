import { Grid, CircularProgress } from '@mui/material';

const LoadingIcon = () => {
  return <CircularProgress color='success' />;
};

export default function Loading({ icon }) {
  if (icon) {
    return <LoadingIcon />;
  }

  return (
    <Grid
      container
      item
      justifyContent='center'
      alignItems='center'
      sx={{ width: '100%', height: '50vh' }}
    >
      <CircularProgress
        color='success'
        size={60}
      />
    </Grid>
  );
}
