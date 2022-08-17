import { Routes, Route } from "react-router-dom";
import {
  LeaderboardScreen,
  LoginScreen,
  BankScreen,
  ProfileScreen,
  HomeScreen,
} from "../screens/exports";
import { useExerciseContext } from "../store/context";

export default function Router() {
  const { state } = useExerciseContext();
  const { isAuthenticated } = state;

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
      <Route path="/login" element={<LoginScreen />} />
      <Route path="*" element={<HomeScreen />} />
    </Routes>
  );
}
