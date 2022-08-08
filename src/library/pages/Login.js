import { useContext } from "react";
import { Button, Typography } from "@mui/material";
import { ExerciseContext } from "../store/context";
import { loginUser } from "../api/api";
import { ACTIONS } from "../store/initialState";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { state, dispatch } = useContext(ExerciseContext);
  const { isAuthenticated } = state;
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const user = await loginUser();
      console.log(user);
      dispatch({ type: ACTIONS.UPDATE_USER, payload: user });
      dispatch({ type: ACTIONS.LOGIN_SUCCESS });
      navigate("/profile");
    } catch (error) {
      dispatch({ type: ACTIONS.ERROR });
    }
  }

  function handleLoginWithGoogle() {
    window.open(`${process.env.REACT_APP_API_ENDPOINT}/auth/google`, '_self')
  }

  function handleHomeNavigation() {
    dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: "home" });
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
        <>
          <Button variant="contained" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="contained" onClick={handleLoginWithGoogle}>
            Login With Google
          </Button>
        </>
      )}
    </>
  );
}
