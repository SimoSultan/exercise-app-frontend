import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useExerciseContext } from "../store/context";
import { Loading } from "../components/exports";

export default function Login() {
  const { state } = useExerciseContext();
  const { isAuthenticated, isLoading } = state;
  const [loading, setLoading] = useState(false);

  function handleLoginWithGoogle() {
    setLoading(true);
    window.open(`${process.env.REACT_APP_API_ENDPOINT}/auth/google`, "_self");
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }

  return (
    <Grid
      container
      maxWidth="sm"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "50vh", margin: "0 auto", px: 3, paddingBottom: 10 }}
    >
      {loading || isLoading ? (
        <Loading />
      ) : (
        <LoginWithGoogle
          isAuthenticated={isAuthenticated}
          handleLoginWithGoogle={handleLoginWithGoogle}
        />
      )}
    </Grid>
  );
}

const LoginWithGoogle = ({ isAuthenticated, handleLoginWithGoogle }) => (
  <>
    {isAuthenticated ? (
      <Typography sx={{ py: 3 }}>You are already logged in</Typography>
    ) : null}
    <Button
      variant="contained"
      disabled={isAuthenticated}
      onClick={handleLoginWithGoogle}
    >
      Login With Google
    </Button>
  </>
);
