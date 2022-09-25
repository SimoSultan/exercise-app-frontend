import { Container, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { Footer, ScreenTitle } from "../components/exports";
import { FOOTER_HEIGHT } from "../styles/styles";

export default function HomeScreen() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

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

      <Footer />
    </Container>
  );
}
