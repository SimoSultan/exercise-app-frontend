import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserLeaderboard } from "../../api/api";
import { LEADERBOARD_STREAK_ENABLED } from "../../constants";
import { useExerciseContext } from "../../store/context";
import { SectionTitle } from "../exports";

export default function UserLeaderboardStreak() {
  const { state } = useExerciseContext();
  const { user, isAuthenticated } = state;
  const [daysRequested, setDaysRequested] = useState(7);

  useEffect(() => {
    if (!LEADERBOARD_STREAK_ENABLED) return;

    (async () => {
      try {
        if (!isAuthenticated || !user.id) return;
        const resp = await getUserLeaderboard(user.id, daysRequested);
        console.log(resp);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [isAuthenticated, user.id, daysRequested]);

  if (!LEADERBOARD_STREAK_ENABLED) return null;

  return (
    <>
      <SectionTitle>LeaderboardStreak</SectionTitle>
      <Typography>Requesting for {daysRequested} days</Typography>
    </>
  );
}
