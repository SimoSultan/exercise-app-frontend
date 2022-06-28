import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Leaderboard({ authenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) return navigate("/login");
  }, [authenticated]);

  return <div>Leaderboard</div>;
}
