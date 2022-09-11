import { useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useExerciseContext } from "../store/context";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/exports";

export default function Login() {
  const { state } = useExerciseContext();
  const { isAuthenticated } = state;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleLoginWithGoogle() {
    setLoading(true);
    window.open(`${process.env.REACT_APP_API_ENDPOINT}/auth/google`, "_self");
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2500);
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      sx={{ height: "50vh" }}
    >
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <Typography sx={{ py: 3 }}>
            {isAuthenticated
              ? "You are already logged in"
              : "You must login to see this page"}
          </Typography>
          <Button variant="contained" onClick={handleLoginWithGoogle}>
            Login With Google
          </Button>
        </>
      )}
    </Grid>
  );
}
