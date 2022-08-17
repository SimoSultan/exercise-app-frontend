import { Button, Typography } from "@mui/material";
import { useExerciseContext } from "../store/context";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { state } = useExerciseContext();
  const { isAuthenticated } = state;
  const navigate = useNavigate();

  function handleLoginWithGoogle() {
    window.open(`${process.env.REACT_APP_API_ENDPOINT}/auth/google`, "_self");
    navigate("/");
  }

  function handleHomeNavigation() {
    navigate("/");
  }

  return (
    <>
      <Typography sx={{ my: 2 }}>
        {isAuthenticated
          ? "You are already logged in"
          : "You must login to see this page"}
      </Typography>
      {isAuthenticated ? (
        <Button variant="contained" onClick={handleHomeNavigation}>
          Back to Home
        </Button>
      ) : (
        <Button variant="contained" onClick={handleLoginWithGoogle}>
          Login With Google
        </Button>
      )}
    </>
  );
}
