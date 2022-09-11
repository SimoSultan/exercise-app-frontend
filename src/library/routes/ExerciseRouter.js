import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  LeaderboardScreen,
  LoginScreen,
  BankScreen,
  ProfileScreen,
  HomeScreen,
} from "../screens/exports";
import { useExerciseContext } from "../store/context";
import { ACTIONS } from "../store/initialState";

export default function Router() {
  const { state, dispatch } = useExerciseContext();
  const { isAuthenticated } = state;
  const location = useLocation();

  useEffect(() => {
    switch (location.pathname) {
      case "/profile":
        dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: "profile" });
        break;
      case "/bank":
        dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: "bank" });
        break;
      case "/leaderboard":
        dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: "leaderboard" });
        break;
      default:
        dispatch({ type: ACTIONS.SET_ACTIVE_TAB, payload: "home" });
        break;
    }
  }, [location, dispatch]);

  return (
    <Routes>
      <Route
        path="/profile"
        element={isAuthenticated ? <ProfileScreen /> : <LoginScreen />}
      />
      <Route
        path="/bank"
        element={isAuthenticated ? <BankScreen /> : <LoginScreen />}
      />
      <Route
        path="/leaderboard"
        element={isAuthenticated ? <LeaderboardScreen /> : <LoginScreen />}
      />
      <Route
        path="/login"
        element={isAuthenticated ? <HomeScreen /> : <LoginScreen />}
      />
      <Route path="*" element={<HomeScreen />} />
    </Routes>
  );
}
