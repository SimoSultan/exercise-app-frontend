import { useEffect, useState } from "react";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { getLeaderboard } from "../../api/api";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const resp = await getLeaderboard();
        if (resp.status === 200) {
          setLeaderboard(() => Object.values(resp.data));
        }
      } catch (error) {
        // console.log("error getting leaderboard", error.response.data);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (leaderboard.length < 1) return;
  <Typography>No users to display</Typography>;

  return (
    <>
      <Typography variant="h4" sx={{ my: 3 }}>
        Leaderboard
      </Typography>
      <Grid
        container
        justifyContent={isLoading ? "center" : "space-between"}
        alignItems={isLoading ? "center" : "flex-start"}
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
    <>
      <Typography variant="body1">{`${firstName} ${lastName}`}</Typography>
      <Typography variant="body1">{percentage.toFixed(4) * 100}%</Typography>
    </>
  );
};
