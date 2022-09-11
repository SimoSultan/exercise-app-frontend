import { Grid, CircularProgress } from "@mui/material";

const LoadingIcon = () => {
  return <CircularProgress color="success" />;
};

export default function Loading({ loading, icon }) {
  if (icon) {
    return <LoadingIcon />;
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "50vh" }}
    >
      {loading ? <CircularProgress color="success" size={60} /> : null}
    </Grid>
  );
}
