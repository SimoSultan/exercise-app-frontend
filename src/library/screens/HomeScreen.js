import { Container, Typography, useMediaQuery, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useExerciseContext } from "../store/context";
import {
  Footer,
  UserLeaderboardStreak,
  ScreenTitle,
} from "../components/exports";
import { FOOTER_HEIGHT } from "../styles/styles";

export default function HomeScreen() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const { state } = useExerciseContext();
  const { isAuthenticated } = state;

  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <ScreenTitle>Home</ScreenTitle>
      {isDesktop ? (
        <Typography>
          Developer note: This app is currently only built for mobile web sized
          screens and will look funny on desktop computers for the time being.
        </Typography>
      ) : null}
      {!isAuthenticated ? (
        <>
          <Typography>You are not logged in</Typography>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button variant="contained">Login</Button>
          </Link>
        </>
      ) : (
        <UserLeaderboardStreak />
      )}
      <Footer />
    </Container>
  );
}
