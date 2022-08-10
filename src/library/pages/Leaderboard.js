import { Container } from "@mui/material";

export default function Leaderboard({ authenticated }) {
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
      Leaderboard
    </Container>
  );
}
