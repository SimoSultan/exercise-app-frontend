import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export default function Home({ authenticated }) {
  const navigate = useNavigate();

  return (
    <div>
      <Typography>Home</Typography>
      {!authenticated && (
        <Link to="/login">
          <Button onClick={() => navigate("/login")}>Go to Login Page</Button>
        </Link>
      )}
    </div>
  );
}
