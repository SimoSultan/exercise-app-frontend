import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home({ authenticated }) {
  const navigate = useNavigate();

  const logProtectedData = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/protected`, { withCredentials: true })
    console.log(res)
  }

  return (
    <div>
      <Typography>Home</Typography>
      {!authenticated && (
        <Link to="/login">
          <Button onClick={() => navigate("/login")}>Go to Login Page</Button>
        </Link>
      )}
      <button onClick={logProtectedData}>Protected Route Test</button>
    </div>
  );
}
