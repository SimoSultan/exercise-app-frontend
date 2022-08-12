import { Typography, Container } from "@mui/material";

import axios from "axios";
import { Footer } from "../components/exports";
import { FOOTER_HEIGHT } from "../styles/styles";

export default function Home() {
  const logProtectedData = async () => {
    const resp = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/protected`,
      { withCredentials: true }
    );
    console.log(resp);
  };

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
      <button onClick={logProtectedData}>Protected Route Test</button>
      <Footer />
    </Container>
  );
}
