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

  // TODO: testing if it's better to just just show the Login component instead of redirecting
  return (
    <Routes>
      <Route
        path="/profile"
        element={
          // isAuthenticated ? <Profile /> : <Navigate replace to={"/login"} />
          isAuthenticated ? <Profile /> : <Login />
        }
      />
      <Route
        path="/bank"
        element={
          // isAuthenticated ? <Bank /> : <Navigate replace to={"/login"} />
          isAuthenticated ? <Bank /> : <Login />
        }
      />
      <Route
        path="/leaderboard"
        element={
          // isAuthenticated ? <Leaderboard /> : <Navigate replace to={"/login"} />
          isAuthenticated ? <Leaderboard /> : <Login />
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
