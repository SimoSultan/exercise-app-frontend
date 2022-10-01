import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Box,
} from "@mui/material";
import { useExerciseContext } from "../store/context";
import { Loading } from "../components/exports";
import { GOOGLE_AUTH_ENABLED } from "../constants";
import { getAllUsers } from "../api/api";
import { ACTIONS } from "../store/initialState";

export default function Login() {
  const { state, dispatch } = useExerciseContext();
  const { isAuthenticated } = state;
  const [loading, setLoading] = useState(false);
  const [userUnderstands, setUserUnderstands] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  function handleLoginWithGoogle() {
    setLoading(true);
    window.open(`${process.env.REACT_APP_API_ENDPOINT}/auth/google`, "_self");
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }

  useEffect(() => {
    if (GOOGLE_AUTH_ENABLED) return;
    (async () => {
      try {
        const resp = await getAllUsers();
        if (resp.status === 200) {
          setUserList(() => resp.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function handleSelectUser(e) {
    e.preventDefault();
    console.log();
    setSelectedUser(() => e.target.value);
  }

  function loginSelectedUser() {
    dispatch({
      type: ACTIONS.LOGIN,
      payload: {
        id: selectedUser.id,
        firstName: selectedUser.first_name,
        lastName: selectedUser.last_name,
        routineId: selectedUser.routine_id,
        username: selectedUser.username,
      },
    });
  }

  return (
    <Grid
      container
      maxWidth="sm"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "50vh", margin: "0 auto", px: 3, paddingBottom: 10 }}
    >
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <AuthDropdown
            handleSelectUser={handleSelectUser}
            userList={userList}
            loginSelectedUser={loginSelectedUser}
            selectedUser={selectedUser}
          />
          <Box>
            <Typography color="error" sx={{ fontWeight: "bold" }}>
              TEMPORARY AUTH HACK.
            </Typography>
            <Typography color="error">
              If you do not appear in the dropdown list. Please first
              authenticate with Google below.This will error after logging in.
              However, you should then be able to see your name in the dropdown
              list above to "login" and see your profile. Please click "I
              Understand" to login through Google.
            </Typography>
            <Button
              variant="outlined"
              disabled={userUnderstands}
              onClick={() => setUserUnderstands(true)}
              sx={{ my: 2 }}
            >
              I Understand
            </Button>
          </Box>
          <LoginWithGoogle
            isAuthenticated={isAuthenticated}
            disabled={!userUnderstands}
            handleLoginWithGoogle={handleLoginWithGoogle}
          />
        </>
      )}
    </Grid>
  );
}

const LoginWithGoogle = ({
  isAuthenticated,
  disabled = true,
  handleLoginWithGoogle,
}) => (
  <>
    {/* <Typography sx={{ py: 3 }}>
      {isAuthenticated
        ? "You are already logged in"
        : "You must login to see this page"}
    </Typography> */}
    <Button
      variant="contained"
      disabled={disabled}
      onClick={handleLoginWithGoogle}
    >
      Login With Google
    </Button>
  </>
);

const AuthDropdown = ({
  handleSelectUser,
  userList,
  loginSelectedUser,
  selectedUser,
}) => {
  return userList.length > 0 ? (
    <>
      <Typography variant="h5">Login Screen</Typography>

      <FormControl fullWidth>
        <InputLabel id="user-select-label">User</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          label="User"
          onChange={handleSelectUser}
          defaultValue=""
        >
          {userList.map((user) => (
            <MenuItem key={user.id} value={user}>
              {`${user.first_name} ${user.last_name}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        sx={{ my: 3 }}
        onClick={loginSelectedUser}
        disabled={Object.values(selectedUser).length < 1}
      >
        Login
      </Button>
    </>
  ) : (
    <>
      <Typography variant="h5">Login Screen</Typography>
      <Typography>There are no users on this app yet.</Typography>
    </>
  );
};
