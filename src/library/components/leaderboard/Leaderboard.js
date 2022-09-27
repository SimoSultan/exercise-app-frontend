import { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { getLeaderboard } from "../../api/api";
import { useExerciseContext } from "../../store/context";

export default function Leaderboard() {
  const { state } = useExerciseContext();
  const { user } = state;

  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const resp = await getLeaderboard(user.id);
        if (resp.status === 200) {
          setLeaderboard(() => Object.values(resp.data));
        }
      } catch (error) {
        console.log("error getting leaderboard", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [user.id]);

  if (leaderboard.length < 1) return;
  <Typography>No users to display</Typography>;

  return (
    <>
      <Typography variant="h4" sx={{ my: 3 }}>
        Leaderboard
      </Typography>
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
        {isLoading ? (
          <Grid item>
            <CircularProgress color="inherit" size={60} />
          </Grid>
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
    </>
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
