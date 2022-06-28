import { Routes, Route } from "react-router-dom";
import Leaderboard from "../pages/Leaderboard";
import Login from "../pages/Login";
import Bank from "../pages/Bank";
import Profile from "../pages/Profile";
import Home from "../pages/Home";

export default function Router({ handleLogin, authenticated }) {
  return (
    <Routes>
      <Route
        path="/profile"
        element={<Profile authenticated={authenticated} />}
      />
      <Route path="/bank" element={<Bank authenticated={authenticated} />} />
      <Route
        path="/leaderboard"
        element={<Leaderboard authenticated={authenticated} />}
      />
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <Route path="*" element={<Home authenticated={authenticated} />} />
    </Routes>
  );
}
