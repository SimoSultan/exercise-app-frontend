import { Container } from "@mui/material";
import { Leaderboard } from "../components/exports";

export default function LeaderboardScreen() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Leaderboard />
    </Container>
  );
}
