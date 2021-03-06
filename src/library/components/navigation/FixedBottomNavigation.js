import { useContext } from "react";
import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddTaskIcon from "@mui/icons-material/AddTask";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Grid, Typography, IconButton } from "@mui/material";
import { BOTTOM_NAVIGATION_HEIGHT } from "../../styles/styles";
import { ExerciseContext } from "../../store/context";
import { ACTIONS } from "../../store/initialState";

export default function FixedBottomNavigation() {
  const { state, dispatch } = useContext(ExerciseContext);
  const { activeTab } = state;
  function handleChangeTab(tab) {
    dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: tab });
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: BOTTOM_NAVIGATION_HEIGHT,
        }}
      >
        <Grid container justifyContent="space-evenly" alignItems="center">
          <Grid item>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "inherit",
                userSelect: "none",
              }}
            >
              <IconButton
                color="inherit"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => handleChangeTab("home")}
              >
                <HomeIcon color={activeTab === "home" ? "primary" : ""} />
                <Typography
                  variant="button"
                  color={activeTab === "home" ? "primary" : ""}
                >
                  Home
                </Typography>
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link
              to="profile"
              style={{
                textDecoration: "none",
                color: "inherit",
                userSelect: "none",
              }}
            >
              <IconButton
                color="inherit"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => handleChangeTab("profile")}
              >
                <PersonIcon color={activeTab === "profile" ? "primary" : ""} />
                <Typography
                  variant="button"
                  color={activeTab === "profile" ? "primary" : ""}
                >
                  Profile
                </Typography>
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link
              to="bank"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton
                color="inherit"
                sx={{ display: "flex", flexDirection: "column" }}
                onClick={() => handleChangeTab("bank")}
              >
                <AddTaskIcon color={activeTab === "bank" ? "primary" : ""} />
                <Typography
                  variant="button"
                  color={activeTab === "bank" ? "primary" : ""}
                >
                  Bank
                </Typography>
              </IconButton>
            </Link>
          </Grid>
          <Grid item>
            <Link
              to="leaderboard"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <IconButton
                color="inherit"
                sx={{ display: "flex", flexDirection: "column" }}
                onClick={() => handleChangeTab("leaderboard")}
              >
                <LeaderboardIcon
                  color={activeTab === "leaderboard" ? "primary" : ""}
                />
                <Typography
                  variant="button"
                  color={activeTab === "leaderboard" ? "primary" : ""}
                >
                  Leaderboard
                </Typography>
              </IconButton>
            </Link>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}
