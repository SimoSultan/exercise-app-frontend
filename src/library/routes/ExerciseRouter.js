import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Leaderboard from "../pages/Leaderboard";
import Login from "../pages/Login";
import Bank from "../pages/Bank";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import { ExerciseContext } from "../store/context";

export default function Router() {
  const { state } = useContext(ExerciseContext);
  const { isAuthenticated } = state;

  return (
    <Routes>
      <Route
        path="/profile"
        element={
          isAuthenticated ? <Profile /> : <Navigate replace to={"/login"} />
        }
      />
      <Route
        path="/bank"
        element={
          isAuthenticated ? <Bank /> : <Navigate replace to={"/login"} />
        }
      />
      <Route
        path="/leaderboard"
        element={
          isAuthenticated ? <Leaderboard /> : <Navigate replace to={"/login"} />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
