import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { getPing, postEcho } from "../api/api";

export default function Bank({ authenticated }) {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authenticated) return navigate("/login");
  }, [authenticated]);

  async function handleClickPing() {
    const resp = await getPing();
    setResponse(JSON.stringify(resp));
  }

  async function handleClickEcho() {
    const resp = await postEcho({
      firstName: "Fred",
      lastName: "Flintstone",
    });
    setResponse(JSON.stringify(resp));
  }

  return (
    <div>
      <Typography>Bank</Typography>
      <Button variant="contained" onClick={handleClickPing}>
        Ping
      </Button>
      <Button variant="contained" onClick={handleClickEcho}>
        Echo
      </Button>
      <div>{response}</div>
    </div>
  );
}
