import { useState, useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useExerciseContext } from "../store/context";
import { Loading } from "../components/exports";
import { Link, useLocation } from "react-router-dom";
import { ACTIONS } from "../store/initialState";

export default function Login() {
  const { state, dispatch } = useExerciseContext();
  const { isAuthenticated, attemptingLogIn } = state;
  const [loading, setLoading] = useState(false);
  const [failedLogin, setFailedLogin] = useState(false);
  const location = useLocation();

  function handleLoginWithGoogle() {
    setLoading(true);
    window.open(`${process.env.REACT_APP_API_ENDPOINT}/auth/google`, "_self");
    setTimeout(() => {
      setLoading(false);
      dispatch({
        type: ACTIONS.SHOW_ALERT,
        payload: {
          type: "success",
          message: "Successfully logged in.",
        },
      });
    }, 2500);
    setFailedLogin(false);
  }

  useEffect(() => {
    if (location.pathname === "/login/failure") {
      setFailedLogin(true);
      dispatch({
        type: ACTIONS.SHOW_ALERT,
        payload: {
          type: "error",
          message: "Something went wrong when attempting Google login.",
        },
      });
    }
  }, [location.pathname, dispatch]);

  return (
    <Grid
      container
      maxWidth="sm"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "50vh", margin: "0 auto", px: 3, paddingBottom: 10 }}
    >
      {loading || attemptingLogIn ? (
        <Loading />
      ) : (
        <LoginWithGoogle
          isAuthenticated={isAuthenticated}
          handleLoginWithGoogle={handleLoginWithGoogle}
          failedLogin={failedLogin}
        />
      )}
    </Grid>
  );
}

const LoginWithGoogle = ({
  isAuthenticated,
  handleLoginWithGoogle,
  failedLogin,
}) =>
  isAuthenticated ? (
    <>
      <Typography sx={{ py: 3 }}>You are already logged in</Typography>
      <Button variant="contained" sx={{ py: 3 }}>
        <Link to="/" sx={{ textDecoration: "none" }}>
          Home
        </Link>
      </Button>
    </>
  ) : (
    <>
      {failedLogin ? <FailedGoogleLogin /> : null}
      <Button
        variant="contained"
        disabled={isAuthenticated}
        onClick={handleLoginWithGoogle}
      >
        Login With Google
      </Button>
    </>
  );

const FailedGoogleLogin = () => (
  <Typography sx={{ py: 3 }}>You are </Typography>
);
