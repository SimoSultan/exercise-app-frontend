import { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import { getLeaderboard } from "../../api/api";
import { useExerciseContext } from "../../store/context";
import { Loading } from "../exports";
import { ACTIONS } from "../../store/initialState";

export default function Leaderboard() {
  const { state, dispatch } = useExerciseContext();
  const { leaderboard } = state;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (leaderboard.length > 0) return;
    (async () => {
      try {
        setLoading(true);
        const resp = await getLeaderboard();
        if (resp.status === 200) {
          dispatch({
            type: ACTIONS.SET_LEADERBOARD,
            payload: Object.values(resp.data),
          });
        }
      } catch (error) {
        console.log("error getting leaderboard", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [leaderboard, dispatch]);

  if (!loading && leaderboard.length < 1) return;
  <Typography>No users to display</Typography>;

  return (
    <Grid
      container
      flexDirection="column"
      sx={{
        my: 2,
        p: 3,
        width: "95%",
        minHeight: "35vh",
        height: "fit-content",
        bgcolor: "lightgrey",
      }}
    >
      {loading ? (
        <Loading />
      ) : (
        leaderboard.map((entry) => (
          <LeaderboardItem
            key={entry.userId}
            firstName={entry.firstName}
            lastName={entry.lastName}
            percentage={entry.percentage}
          />
        ))
      )}
    </Grid>
  );
}

const LeaderboardItem = ({ firstName, lastName, percentage }) => {
  return (
    <Grid item container justifyContent="space-between" sx={{ py: 1 }}>
      <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
      <Typography variant="body1">
        {Number(percentage.toFixed(3)) * 100}%
      </Typography>
    </Grid>
  );
};
