import { Button } from "@mui/material";

export default function Login({ handleLogin }) {
  return (
    <Button variant="contained" onClick={handleLogin}>
      Login
    </Button>
  );
}
