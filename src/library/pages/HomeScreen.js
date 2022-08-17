import { Typography, Container } from "@mui/material";

import axios from "axios";
import { Link } from "react-router-dom";
import { Footer } from "../components";
import { useExerciseContext } from "../store/context";
import { FOOTER_HEIGHT } from "../styles/styles";

export default function Home() {
  const { state } = useExerciseContext();

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
      {state.isAuthenticated ? (
        <button onClick={logProtectedData}>Protected Route Test</button>
      ) : (
        <>
          <Typography>You are not logged in.</Typography>
          <button onClick={logProtectedData}>Protected Route Test</button>
          <Link to="/login">Go to login page</Link>
        </>
      )}

      <Footer />
    </Container>
  );
}
