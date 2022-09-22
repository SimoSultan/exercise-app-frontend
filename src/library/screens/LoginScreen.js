import { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { useExerciseContext } from "../store/context";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/exports";
import { AUTH_ENABLED } from "../constants";
import { getAllUsers } from "../api/api";
import { ACTIONS } from "../store/initialState";

export default function Login() {
  const { state, dispatch } = useExerciseContext();
  const { isAuthenticated } = state;
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});

  const navigate = useNavigate();

  function handleLoginWithGoogle() {
    setLoading(true);
    window.open(`${process.env.REACT_APP_API_ENDPOINT}/auth/google`, "_self");
    setTimeout(() => {
      setLoading(false);
      navigate("/");
    }, 2500);
  }

  useEffect(() => {
    if (AUTH_ENABLED) return;
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
        routineID: selectedUser.routine_id,
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
      sx={{ height: "50vh", margin: "0 auto", px: 3 }}
    >
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          {AUTH_ENABLED ? (
            <LoginWithGoogle
              isAuthenticated={isAuthenticated}
              handleLoginWithGoogle={handleLoginWithGoogle}
            />
          ) : (
            <AuthDropdown
              handleSelectUser={handleSelectUser}
              userList={userList}
              loginSelectedUser={loginSelectedUser}
              selectedUser={selectedUser}
            />
          )}
        </>
      )}
    </Grid>
  );
}

const LoginWithGoogle = ({ isAuthenticated, handleLoginWithGoogle }) => (
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
