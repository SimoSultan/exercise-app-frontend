import Box from "@mui/material/Box";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AddTaskIcon from "@mui/icons-material/AddTask";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { Grid, Typography, IconButton } from "@mui/material";
import { BOTTOM_NAVIGATION_HEIGHT } from "../../styles/styles";

export default function FixedBottomNavigation({ activeTab, handleChangeTab }) {
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
                onClick={() => handleChangeTab(0)}
              >
                <HomeIcon color={activeTab === 0 ? "primary" : ""} />
                <Typography
                  variant="button"
                  color={activeTab === 0 ? "primary" : ""}
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
                onClick={() => handleChangeTab(1)}
              >
                <PersonIcon color={activeTab === 1 ? "primary" : ""} />
                <Typography
                  variant="button"
                  color={activeTab === 1 ? "primary" : ""}
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
                onClick={() => handleChangeTab(2)}
              >
                <AddTaskIcon color={activeTab === 2 ? "primary" : ""} />
                <Typography
                  variant="button"
                  color={activeTab === 2 ? "primary" : ""}
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
                onClick={() => handleChangeTab(3)}
              >
                <LeaderboardIcon color={activeTab === 3 ? "primary" : ""} />
                <Typography
                  variant="button"
                  color={activeTab === 3 ? "primary" : ""}
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
