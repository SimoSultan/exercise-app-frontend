import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile({ authenticated }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!authenticated) return navigate("/login");
  }, [authenticated]);

  return <div>Profile</div>;
}
