import { useNavigate } from "react-router-dom";
import { Typography, Button, Container } from "@mui/material";

import { Link } from "react-router-dom";
import axios from "axios";
import { Footer } from "../components/exports";
import { FOOTER_HEIGHT } from "../styles/styles";

export default function Home({ authenticated }) {
  const navigate = useNavigate();

  const logProtectedData = async () => {
    const res = await axios.get(
      `${process.env.REACT_APP_API_ENDPOINT}/protected`,
      { withCredentials: true }
    );
    console.log(res);
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
      {!authenticated && (
        <Link to="/login">
          <Button onClick={() => navigate("/login")}>Go to Login Page</Button>
        </Link>
      )}
      <button onClick={logProtectedData}>Protected Route Test</button>
      <Footer />
    </Container>
  );
}
