import { Typography, Container } from "@mui/material";

import { Footer } from "../components/exports";
import { FOOTER_HEIGHT } from "../styles/styles";

export default function HomeScreen() {
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
      <Typography>Home</Typography>
      <Footer />
    </Container>
  );
}
